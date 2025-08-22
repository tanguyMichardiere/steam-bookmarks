"use client";

import { CheckIcon, MagnifyingGlassIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import type { FormEvent } from "react";
import { useEffect, useRef } from "react";
import { useBooleanState } from "../hooks/use-boolean-state";
import { useGameSettingsStore } from "../stores/game-settings/context/hook";
import { useSettingsStore } from "../stores/settings/context/hook";

export function Searchbar() {
	const searchUrl = useSettingsStore((state) => state.searchUrl);
	const searchPrefix = useGameSettingsStore((state) => state.searchPrefix);
	const setSearchPrefix = useGameSettingsStore((state) => state.setSearchPrefix);

	const [editing, stopEditing, startEditing] = useBooleanState();

	const searchInput = useRef<HTMLInputElement>(null);

	function updateSearchPrefix(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (searchInput.current !== null) {
			setSearchPrefix(searchInput.current.value.trim());
			searchInput.current.value = `${searchInput.current.value} `.trimStart();
		}
		stopEditing();
	}

	function search(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (searchInput.current !== null) {
			const search = searchInput.current.value.trim();
			if (search.length > 0) {
				window.location.replace(searchUrl.replace("%s", search));
			}
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: we need to put the cursor at the end of the search prefix when it changes, and re-focus when editing or validating it
	useEffect(() => {
		// auto focus the search input at the end of the default value
		if (searchInput.current !== null) {
			searchInput.current.focus();
			const searchInputValueLength = searchInput.current.value.length;
			searchInput.current.setSelectionRange(searchInputValueLength, searchInputValueLength);
		}
	}, [searchPrefix, editing]);

	return (
		<form className="join" onSubmit={editing ? updateSearchPrefix : search}>
			<input
				className="input join-item input-bordered focus:outline-none"
				defaultValue={`${searchPrefix} `.trimStart()}
				ref={searchInput}
				title={editing ? "search prefix" : "search"}
				type="text"
			/>
			<button className="btn join-item" title={editing ? "validate" : "search"} type="submit">
				{editing ? <CheckIcon className="h-6 w-6" /> : <MagnifyingGlassIcon className="h-6 w-6" />}
			</button>
			{!editing && (
				<button
					className="btn join-item tooltip"
					data-tip="Edit the search prefix"
					onClick={startEditing}
					title="edit search prefix"
					type="button"
				>
					<PencilSquareIcon className="h-6 w-6" />
				</button>
			)}
		</form>
	);
}
