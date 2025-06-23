import "server-only";
import type { SteamIdParams } from "../params";
import type { GameIdParams } from "./params";

type Props = Readonly<{
	params: Promise<SteamIdParams & GameIdParams>;
}>;

export default async function GamePage(props: Props) {
	const params = await props.params;

	return <div>In game: {params.gameId}</div>;
}
