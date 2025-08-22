"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useRef } from "react";
import { useSettingsStore } from "../stores/settings/context/hook";

type Props = Readonly<{
	playerId: string;
}>;

export function SettingsForm(props: Props) {
	const router = useRouter();

	const searchUrl = useSettingsStore((state) => state.searchUrl);
	const setSearchUrl = useSettingsStore((state) => state.setSearchUrl);

	const searchUrlInput = useRef<HTMLInputElement>(null);

	function setSearchUrlInputTo(searchUrl: string) {
		return () => {
			if (searchUrlInput.current !== null) {
				searchUrlInput.current.value = searchUrl;
			}
		};
	}

	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (searchUrlInput.current !== null) {
			setSearchUrl(searchUrlInput.current.value.trim());
		}
		router.replace(`/${props.playerId}`);
	}

	return (
		<form className="flex flex-col gap-6" onSubmit={submit}>
			<fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
				<legend className="fieldset-legend">Search URL</legend>
				<input
					className="input w-md"
					defaultValue={searchUrl}
					pattern=".*%s.*"
					ref={searchUrlInput}
					required
					type="url"
				/>
				<p className="label">Enter a search URL with "%s" in place of the search term</p>
				<div className="join">
					<button
						className="btn join-item"
						onClick={setSearchUrlInputTo("https://www.google.com/search?q=%s&udm=14")}
						type="button"
					>
						Google (udm=14)
					</button>
					<button
						className="btn join-item"
						onClick={setSearchUrlInputTo("https://www.google.com/search?q=%s")}
						type="button"
					>
						Google
					</button>
					<button
						className="btn join-item"
						onClick={setSearchUrlInputTo("https://duckduckgo.com/?q=%s")}
						type="button"
					>
						DuckDuckGo
					</button>
				</div>
				<button className="btn btn-primary" type="submit">
					Submit
				</button>
			</fieldset>
		</form>
	);
}
