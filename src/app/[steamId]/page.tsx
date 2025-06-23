import { redirect } from "next/navigation";
import "server-only";
import { getPlayerSummary } from "../../api/player-summary";
import { logger } from "../../logger";
import type { SteamIdParams } from "./params";

type Props = Readonly<{
	params: Promise<SteamIdParams>;
}>;

export default async function PlayerPage(props: Props) {
	const params = await props.params;

	const playerSummary = await getPlayerSummary(params.steamId);

	if (playerSummary.gameid !== undefined) {
		logger.debug("redirecting to game page");
		redirect(`/${playerSummary.steamid}/${playerSummary.gameid}`);
	}

	return <div>Not in game</div>;
}
