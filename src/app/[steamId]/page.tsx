import { redirect } from "next/navigation";
import { getPlayerSummary } from "../../api/player-summary";
import type { SteamIdParams } from "./params";

type Props = Readonly<{
	params: Promise<SteamIdParams>;
}>;

export default async function PlayerPage(props: Props) {
	const params = await props.params;

	const playerSummary = await getPlayerSummary(params.steamId);

	if (playerSummary.gameid !== undefined) {
		redirect(`/${playerSummary.steamid}/${playerSummary.gameid}`);
	}

	return <div>Not in game</div>;
}
