import { env } from "../env";

export type PlayerSummary = {
	steamid: string;
	personaname: string;
	avatar: string;
	avatarfull: string;
} & ({ gameid: string; gameextrainfo: string } | { gameid?: never; gameextrainfo?: never });

type PlayerSummaryResponse = { response: { players: Array<PlayerSummary> } };

export async function getPlayerSummary(steamId: string): Promise<PlayerSummary> {
	const response = await fetch(
		`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${
			env.API_KEY
		}&steamids=${steamId}`,
		{ cache: "force-cache" },
	);
	if (!response.ok) {
		throw new Error(await response.text());
	}
	const {
		response: {
			players: [playerSummary],
		},
	} = (await response.json()) as PlayerSummaryResponse;
	if (playerSummary === undefined) {
		throw new Error("Not Found");
	}
	playerSummary.gameid = "gameid";
	playerSummary.gameextrainfo = "gameextrainfo";
	return playerSummary;
}
