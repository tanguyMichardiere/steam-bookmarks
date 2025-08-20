import { NewBookmarkForm } from "../../../../components/new-bookmark-form";

export default async function GamePage(props: PageProps<"/[steamId]/[gameId]/new-bookmark">) {
	const params = await props.params;

	return <NewBookmarkForm gameId={params.gameId} steamId={params.steamId} />;
}
