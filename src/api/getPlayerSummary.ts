export type PlayerSummary = {
  steamid: string;
  personaname: string;
  avatarfull: string;
} & ({ gameid: string; gameextrainfo: string } | { gameid?: never; gameextrainfo?: never });

type PlayerSummaryResponse = { response: { players: Array<PlayerSummary> } };

export async function getPlayerSummary(steamId: string): Promise<PlayerSummary> {
  const response = await fetch(
    `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${
      import.meta.env.STEAM_API_KEY
    }&steamids=${steamId}`,
  );
  if (!response.ok) {
    throw new Error(await response.text());
  }
  const {
    response: {
      players: [player],
    },
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  } = (await response.json()) as PlayerSummaryResponse;
  if (player === undefined) {
    throw new Error("Not Found");
  }
  return player;
}
