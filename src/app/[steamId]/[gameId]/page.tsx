import { LinksGrid } from "../../../components/links-grid";
import { Searchbar } from "../../../components/searchbar";
import type { SteamIdParams } from "../params";
import type { GameIdParams } from "./params";

type Props = Readonly<{
	params: Promise<SteamIdParams & GameIdParams>;
}>;

export default async function GamePage(props: Props) {
	const params = await props.params;

	return (
		<>
			<Searchbar />
			<div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
				<LinksGrid gameId={params.gameId} steamId={params.steamId} />
			</div>
		</>
	);
}
