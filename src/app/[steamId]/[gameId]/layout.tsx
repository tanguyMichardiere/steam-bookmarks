import { redirect } from "next/navigation";
import { getPlayerSummary } from "../../../api/player-summary";
import { logger } from "../../../logger";
import { GameSettingsStoreProvider } from "../../../stores/game-settings/context/provider";

export default async function GameLayout(props: LayoutProps<"/[steamId]/[gameId]">) {
	const params = await props.params;

	const playerSummary = await getPlayerSummary(params.steamId);

	if (playerSummary.gameid !== params.gameId) {
		logger.info("redirecting to player page");
		redirect(`/${params.steamId}`);
	}

	return (
		<GameSettingsStoreProvider gameId={params.gameId}>{props.children}</GameSettingsStoreProvider>
	);
}
