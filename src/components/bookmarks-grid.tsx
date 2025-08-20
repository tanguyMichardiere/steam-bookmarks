"use client";

import { useState } from "react";
import { useGameSettingsStore } from "../stores/game-settings/context/hook";
import { BookmarkCard } from "./bookmark-card";
import { Check } from "./icons/Check";
import { PencilSquare } from "./icons/PencilSquare";
import { Plus } from "./icons/Plus";

type Props = Readonly<{
	steamId: string;
	gameId: string;
}>;

export function BookmarksGrid(props: Props) {
	const bookmarks = useGameSettingsStore((state) => state.bookmarks);

	const [editing, setEditing] = useState(false);

	function startEditing() {
		setEditing(true);
	}

	function stopEditing() {
		setEditing(false);
	}

	return (
		<>
			{bookmarks.map((bookmark) => (
				<BookmarkCard bookmark={bookmark} editing={editing} key={bookmark.id} />
			))}
			{editing ? (
				<button
					className="btn btn-ghost h-32"
					onClick={stopEditing}
					title="stop editing"
					type="button"
				>
					<Check className="h-6 w-6" />
				</button>
			) : (
				<div className="join">
					<a
						className="btn btn-ghost join-item h-24 grow"
						href={`/${props.steamId}/${props.gameId}/new-bookmark`}
						title="add bookmark"
					>
						<Plus className="w=6 h-6" />
					</a>
					<button
						className="btn btn-ghost join-item h-24 grow"
						onClick={startEditing}
						title="edit bookmarks"
						type="button"
					>
						<PencilSquare className="h-6 w-6" />
					</button>
				</div>
			)}
		</>
	);
}
