import type { ReactNode } from "react";
import { getPlayerSummary } from "../../api/player-summary";
import { Navbar } from "../../components/navbar";
import type { SteamIdParams } from "./params";

type Props = Readonly<{
	params: Promise<SteamIdParams>;
	children: ReactNode;
}>;

export default async function PlayerLayout(props: Props) {
	const params = await props.params;

	const playerSummary = await getPlayerSummary(params.steamId);

	return (
		<>
			<Navbar playerSummary={playerSummary} />
			<main className="mx-auto flex max-w-screen-lg flex-col items-center gap-4">
				{props.children}
			</main>
		</>
	);
}
