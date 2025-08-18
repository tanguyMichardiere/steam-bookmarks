import "server-only";
import { env } from "../env";
import { logger } from "../logger";

type PlayerSummaryResponse = { response: { players: Array<PlayerSummary> } };

export type PlayerSummary = {
	steamid: string;
	personaname: string;
	avatar: string;
	avatarfull: string;
} & ({ gameid: string; gameextrainfo: string } | { gameid?: never; gameextrainfo?: never });

class GetPlayerSummaryError extends Error {}
class GetPlayerSummaryResponseError extends GetPlayerSummaryError {}
class GetPlayerSummaryNotFoundError extends GetPlayerSummaryError {}

export async function getPlayerSummary(steamId: string): Promise<PlayerSummary> {
	logger.debug("fetching player summary", { steamId });
	const url = new URL("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002");
	url.searchParams.set("key", env.API_KEY);
	url.searchParams.set("steamids", steamId);
	const response = await fetch(url, { cache: "force-cache", next: { revalidate: 5 } });
	if (!response.ok) {
		const errorText = await response.text();
		logger.warning("error fetching player summary", { errorText, steamId });
		throw new GetPlayerSummaryResponseError(errorText);
	}
	const {
		response: {
			players: [playerSummary],
		},
	} = (await response.json()) as PlayerSummaryResponse;
	if (playerSummary === undefined) {
		logger.info("player not found", { steamId });
		throw new GetPlayerSummaryNotFoundError("Not Found");
	}
	return playerSummary;
}
