import { getPlayerSummary } from "../../api/player-summary";
import { Navbar } from "../../components/navbar";
import { SettingsStoreProvider } from "../../stores/settings/context/provider";

export default async function PlayerLayout(props: LayoutProps<"/[playerId]">) {
	const params = await props.params;

	const playerSummary = await getPlayerSummary(params.playerId);

	return (
		<SettingsStoreProvider>
			<Navbar playerSummary={playerSummary} />
			<main className="mx-auto flex max-w-screen-lg flex-col items-center gap-4 grow">
				{props.children}
			</main>
		</SettingsStoreProvider>
	);
}
