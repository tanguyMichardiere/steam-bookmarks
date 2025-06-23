import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getPlayerSummary } from "../../../api/player-summary";
import { logger } from "../../../logger";
import type { SteamIdParams } from "../params";
import type { GameIdParams } from "./params";

type Props = Readonly<{
	params: Promise<SteamIdParams & GameIdParams>;
	children: ReactNode;
}>;

export default async function GameLayout(props: Props) {
	const params = await props.params;

	const playerSummary = await getPlayerSummary(params.steamId);

	if (playerSummary.gameid !== params.gameId) {
		logger.info("redirecting to player page");
		redirect(`/${params.steamId}`);
	}

	return <>{props.children}</>;
}
