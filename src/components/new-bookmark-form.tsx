"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useRef } from "react";
import { useGameSettingsStore } from "../stores/game-settings/context/hook";

type Props = Readonly<{
	playerId: string;
	gameId: string;
}>;

export function NewBookmarkForm(props: Props) {
	const router = useRouter();

	const addBookmark = useGameSettingsStore((state) => state.addBookmark);

	const nameInput = useRef<HTMLInputElement>(null);
	const hrefInput = useRef<HTMLInputElement>(null);

	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (nameInput.current !== null && hrefInput.current !== null) {
			const name = nameInput.current.value.trim();
			const href = hrefInput.current.value.trim();
			if (name.length > 0 && href.length > 0) {
				addBookmark({ href, name });
				router.replace(`/${props.playerId}/${props.gameId}`);
			}
		}
	}

	return (
		<form className="flex flex-col gap-2" onSubmit={submit}>
			<input
				// biome-ignore lint/a11y/noAutofocus: it's the main action
				autoFocus
				className="input input-bordered focus:outline-none"
				minLength={1}
				placeholder="Name"
				ref={nameInput}
				title="name"
				type="text"
			/>
			<input
				className="input input-bordered focus:outline-none"
				minLength={1}
				placeholder="URL"
				ref={hrefInput}
				title="href"
				type="url"
			/>
			<button className="btn" type="submit">
				Submit
			</button>
		</form>
	);
}
