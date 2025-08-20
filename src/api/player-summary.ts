import { notFound } from "next/navigation";
import { cache } from "react";
import { createClient } from "redis";
import "server-only";
import z from "zod";
import { env } from "../env";
import { logger } from "../logger";

export const getPlayerSummary = cache(async (playerId: string) => {
	const redisClient = await getRedisClient();
	try {
		// register this player ID as having been requested now
		await redisClient.zAdd(
			"player-summary:recent-requests",
			{ value: playerId, score: Date.now() },
			{ comparison: "GT" },
		);

		const cachedPlayerSummary = await redisClient.get(`player-summary:cache:${playerId}`);
		if (cachedPlayerSummary !== null) {
			// cache hit
			if (cachedPlayerSummary === "not-found") {
				notFound();
			}
			return JSON.parse(cachedPlayerSummary) as PlayerSummary;
		}

		// cache miss: fetch the player summary, and also some others to cache them
		const playerIdsToPrefetch = await getSteamIdsToPrefetch(redisClient, playerId);
		const playerSummaries = await getPlayerSummaries(playerIdsToPrefetch);
		const foundPlayerIds = playerSummaries.map(({ id }) => id);

		const redisClientMultiCommand = redisClient.multi();
		for (const playerSummary of playerSummaries) {
			redisClientMultiCommand.set(
				`player-summary:cache:${playerSummary.id}`,
				JSON.stringify(playerSummary),
				{ expiration: { type: "PX", value: jitter(CACHE_TTL_MS) } },
			);
		}
		for (const playerId of playerIdsToPrefetch) {
			if (!foundPlayerIds.includes(playerId)) {
				redisClientMultiCommand.set(`player-summary:cache:${playerId}`, "not-found", {
					expiration: { type: "PX", value: jitter(CACHE_TTL_MS) },
				});
			}
		}
		await redisClientMultiCommand.exec();

		// return only the requested player summary
		for (const playerSummary of playerSummaries) {
			if (playerSummary.id === playerId) {
				return playerSummary;
			}
		}
		notFound();
	} finally {
		redisClient.destroy();
	}
});

function getRedisClient() {
	return createClient({ url: env.REDIS_URL, RESP: 3 })
		.on("error", (error) => {
			logger.error("redis client error", error);
		})
		.connect();
}

const BATCH_SIZE = 100; // https://developer.valvesoftware.com/wiki/Steam_Web_API#Arguments_3

const CACHE_TTL_MS = 10_000; // the TTL of each player summary in Redis
const NOT_TOO_RECENT_MS = 5_000; // only consider prefetching player summaries that have been requested at least this time ago
const RECENT_WINDOW_MS = 600_000; // only consider prefetching player summaries that have been requested at most this time ago
const REFRESH_EAGER_MS = 5_000; // only prefetch player summaries with a TTL below this duration

async function getSteamIdsToPrefetch(
	redisClient: Awaited<ReturnType<typeof getRedisClient>>,
	forcedPlayerId: string,
) {
	const now = Date.now();
	const candidatePlayerIds = (
		await redisClient.zRange(
			"player-summary:recent-requests",
			now - NOT_TOO_RECENT_MS,
			now - RECENT_WINDOW_MS,
			{
				// sort by descending "score": newest first
				BY: "SCORE",
				REV: true,
				LIMIT: { offset: 0, count: 500 },
			},
		)
	).filter((playerId) => playerId !== forcedPlayerId);
	if (candidatePlayerIds.length === 0) return [forcedPlayerId];

	// get the remaining TTL of each player summary
	const redisClientMultiCommand = redisClient.multi();
	for (const playerId of candidatePlayerIds) {
		redisClientMultiCommand.pTTL(`player-summary:cache:${playerId}`);
	}
	const ttls = (await redisClientMultiCommand.exec()) as unknown as number[];

	const playerIds = [forcedPlayerId];
	for (let i = 0; i < candidatePlayerIds.length; i++) {
		// biome-ignore lint/style/noNonNullAssertion: redisClientMultiCommand.exec() should return the right number of results
		const ttl = ttls[i]!;
		if (
			ttl === -2 || // missing key
			(ttl >= 0 && ttl < REFRESH_EAGER_MS) // near expiry
		) {
			// biome-ignore lint/style/noNonNullAssertion: definition of i
			playerIds.push(candidatePlayerIds[i]!);
		}
		if (playerIds.length >= BATCH_SIZE) break;
	}
	return playerIds;
}

const jitter = (ms: number) => ms + Math.floor((Math.random() * 2 - 1) * Math.floor(ms * 0.1));

const PlayerSummary = z.preprocess(
	(val: {
		steamid: string;
		personaname: string;
		avatar: string;
		avatarfull: string;
		communityvisibilitystate: 1 | 3;
		gameid?: string;
		gameextrainfo?: string;
	}) => ({
		id: val.steamid,
		name: val.personaname,
		avatarSrc: val.avatarfull,
		blurAvatarSrc: val.avatar,
		public: val.communityvisibilitystate === 3,
		currentGame:
			val.gameid !== undefined && val.gameextrainfo !== undefined
				? { id: val.gameid, name: val.gameextrainfo }
				: null,
	}),
	z.object({
		id: z.string(),
		name: z.string(),
		avatarSrc: z.string(),
		blurAvatarSrc: z.string(),
		public: z.boolean(),
		currentGame: z.nullable(z.object({ id: z.string(), name: z.string() })),
	}),
);
export type PlayerSummary = z.infer<typeof PlayerSummary>;

const GetPlayerSummariesResponse = z.object({
	response: z.object({
		players: z.array(PlayerSummary),
	}),
});

async function getPlayerSummaries(playerIds: string[]): Promise<PlayerSummary[]> {
	logger.debug("fetching player summaries", { playerIds });
	const url = new URL("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002");
	url.searchParams.set("key", env.API_KEY);
	url.searchParams.set("steamids", playerIds.join(","));
	const response = await fetch(url);
	if (!response.ok) {
		const errorText = await response.text();
		logger.warning("error fetching player summaries", { playerIds, errorText });
		throw new Error(errorText);
	}
	return GetPlayerSummariesResponse.parse(await response.json()).response.players;
}
