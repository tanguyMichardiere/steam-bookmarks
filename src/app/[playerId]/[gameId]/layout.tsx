import { redirect } from "next/navigation";
import { getPlayerSummary } from "../../../api/player-summary";
import { logger } from "../../../logger";
import { GameSettingsStoreProvider } from "../../../stores/game-settings/context/provider";

export default async function GameLayout(props: LayoutProps<"/[playerId]/[gameId]">) {
	const params = await props.params;

	const playerSummary = await getPlayerSummary(params.playerId);

	if (playerSummary.currentGame === null) {
		logger.info("redirecting to player page");
		redirect(`/${params.playerId}`);
	}
	if (playerSummary.currentGame.id !== params.gameId) {
		logger.info("redirecting to game page");
		redirect(`/${params.playerId}/${playerSummary.currentGame.id}`);
	}

	return (
		<GameSettingsStoreProvider gameId={params.gameId}>{props.children}</GameSettingsStoreProvider>
	);
}
