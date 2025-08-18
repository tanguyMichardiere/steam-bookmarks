"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useRef } from "react";
import { useGameSettingsStore } from "../stores/game-settings/context/hook";
import { useSettingsStore } from "../stores/settings/context/hook";
import { MagnifyingGlass } from "./icons/MagnifyingGlass";

export function Searchbar() {
	const router = useRouter();

	const searchUrl = useSettingsStore((state) => state.searchUrl);
	const searchPrefix = useGameSettingsStore((state) => state.searchPrefix);

	const searchInput = useRef<HTMLInputElement>(null);

	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (searchInput.current !== null) {
			const search = searchInput.current.value.trim();
			if (search.length > 0) {
				router.replace(searchUrl.replace("%s", search));
			}
		}
	}

	return (
		<form className="join" onSubmit={submit}>
			<input
				// biome-ignore lint/a11y/noAutofocus: it's the main action
				autoFocus
				className="input join-item input-bordered focus:outline-none"
				defaultValue={`${searchPrefix} `.trimStart()}
				ref={searchInput}
				title="search"
				type="text"
			/>
			<button className="btn join-item" title="search" type="submit">
				<MagnifyingGlass className="h-6 w-6" />
			</button>
		</form>
	);
}
