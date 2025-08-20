import { NewBookmarkForm } from "../../../../components/new-bookmark-form";

export default async function GamePage(props: PageProps<"/[playerId]/[gameId]/new-bookmark">) {
	const params = await props.params;

	return <NewBookmarkForm gameId={params.gameId} playerId={params.playerId} />;
}
