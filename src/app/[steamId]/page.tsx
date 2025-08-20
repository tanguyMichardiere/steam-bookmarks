import { redirect } from "next/navigation";
import { getPlayerSummary } from "../../api/player-summary";
import { logger } from "../../logger";

export default async function PlayerPage(props: PageProps<"/[steamId]">) {
	const params = await props.params;

	const playerSummary = await getPlayerSummary(params.steamId);

	if (playerSummary.gameid !== undefined) {
		logger.debug("redirecting to game page");
		redirect(`/${playerSummary.steamid}/${playerSummary.gameid}`);
	}

	return <div>Try loading this page while you are in game!</div>;
}
