import "server-only";
import { env } from "../env";
import { logger } from "../logger";

export type PlayerSummary = {
	steamid: string;
	personaname: string;
	avatar: string;
	avatarfull: string;
} & ({ gameid: string; gameextrainfo: string } | { gameid?: never; gameextrainfo?: never });

type PlayerSummaryResponse = { response: { players: Array<PlayerSummary> } };

export async function getPlayerSummary(steamId: string): Promise<PlayerSummary> {
	logger.debug("fetching player summary", { steamId });
	const response = await fetch(
		`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${
			env.API_KEY
		}&steamids=${steamId}`,
		{ cache: "force-cache" },
	);
	if (!response.ok) {
		const errorText = await response.text();
		logger.warning("error fetching player summary", { errorText, steamId });
		throw new Error(errorText);
	}
	const {
		response: {
			players: [playerSummary],
		},
	} = (await response.json()) as PlayerSummaryResponse;
	if (playerSummary === undefined) {
		logger.info("player not found", { steamId });
		throw new Error("Not Found");
	}
	return playerSummary;
}
