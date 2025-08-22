"use client";

import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import type { GameSettingsBookmark } from "../stores/game-settings";
import { useGameSettingsStore } from "../stores/game-settings/context/hook";

type Props = Readonly<{
	bookmark: GameSettingsBookmark;
	editing: boolean;
}>;

export function BookmarkCard(props: Props) {
	const moveBookmark = useGameSettingsStore((state) => state.moveBookmark);
	const removeBookmark = useGameSettingsStore((state) => state.removeBookmark);

	function moveLeft() {
		moveBookmark(props.bookmark.id, "left");
	}

	function moveRight() {
		moveBookmark(props.bookmark.id, "right");
	}

	function remove() {
		removeBookmark(props.bookmark.id);
	}

	const faviconSrc = `https://s2.googleusercontent.com/s2/favicons?domain_url=${props.bookmark.href}&sz=128`;

	if (props.editing) {
		return (
			<div className="join">
				<button
					className="btn join-item btn-xs h-32"
					onClick={moveLeft}
					title="move left"
					type="button"
				>
					<ArrowLeftIcon className="h-6 w-6" />
				</button>
				<div className="btn join-item pointer-events-none h-32 grow flex-col gap-4">
					<Image alt={props.bookmark.name} height={24} src={faviconSrc} width={24} />
					<button
						className="btn btn-error pointer-events-auto"
						onClick={remove}
						title="remove"
						type="button"
					>
						<TrashIcon className="h-6 w-6" />
					</button>
				</div>
				<button
					className="btn join-item btn-xs h-32"
					onClick={moveRight}
					title="move right"
					type="button"
				>
					<ArrowRightIcon className="h-6 w-6" />
				</button>
			</div>
		);
	}

	return (
		<a className="btn h-24 flex-col gap-4" href={props.bookmark.href}>
			<Image alt={props.bookmark.name} height={24} src={faviconSrc} width={24} />
			{props.bookmark.name}
		</a>
	);
}
