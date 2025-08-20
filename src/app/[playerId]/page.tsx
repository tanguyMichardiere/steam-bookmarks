import { redirect } from "next/navigation";
import { getPlayerSummary } from "../../api/player-summary";
import { logger } from "../../logger";

export default async function PlayerPage(props: PageProps<"/[playerId]">) {
	const params = await props.params;

	const playerSummary = await getPlayerSummary(params.playerId);

	if (playerSummary.currentGame !== null) {
		logger.debug("redirecting to game page");
		redirect(`/${playerSummary.id}/${playerSummary.currentGame.id}`);
	}

	return <div>Try loading this page while you are in game!</div>;
}
