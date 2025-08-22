"use client";

import { ArrowPathIcon, CheckIcon, PencilSquareIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useGameSettingsStore } from "../stores/game-settings/context/hook";
import { BookmarkCard } from "./bookmark-card";

type Props = Readonly<{
	playerId: string;
	gameId: string;
}>;

export function BookmarksGrid(props: Props) {
	const bookmarks = useGameSettingsStore((state) => state.bookmarks);
	const resetBookmarks = useGameSettingsStore((state) => state.resetBookmarks);

	const [editing, setEditing] = useState(false);

	function startEditing() {
		setEditing(true);
	}

	function stopEditing() {
		setEditing(false);
	}

	function reset() {
		resetBookmarks();
		stopEditing();
	}

	return (
		<>
			{bookmarks.map((bookmark) => (
				<BookmarkCard bookmark={bookmark} editing={editing} key={bookmark.id} />
			))}
			{editing ? (
				<div className="join">
					<button
						className="btn btn-ghost join-item h-32 grow tooltip tooltip-bottom"
						data-tip="Validate"
						onClick={stopEditing}
						title="stop editing"
						type="button"
					>
						<CheckIcon className="h-6 w-6" />
					</button>
					<button
						className="btn btn-ghost join-item h-32 grow tooltip tooltip-bottom"
						data-tip="Reset bookmarks"
						onClick={reset}
						title="reset bookmarks"
						type="button"
					>
						<ArrowPathIcon className="h-6 w-6" />
					</button>
				</div>
			) : (
				<div className="join">
					<a
						className="btn btn-ghost join-item h-24 grow tooltip tooltip-bottom"
						data-tip="Add a bookmark"
						href={`/${props.playerId}/${props.gameId}/new-bookmark`}
						title="add bookmark"
					>
						<PlusIcon className="w=6 h-6" />
					</a>
					<button
						className="btn btn-ghost join-item h-24 grow tooltip tooltip-bottom"
						data-tip="Edit bookmarks"
						onClick={startEditing}
						title="edit bookmarks"
						type="button"
					>
						<PencilSquareIcon className="h-6 w-6" />
					</button>
				</div>
			)}
		</>
	);
}
