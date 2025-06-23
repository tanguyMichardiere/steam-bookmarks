import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

type SettingsStoreState = Readonly<{
	searchUrl: string;
}>;

type SettingsStoreActions = Readonly<{
	setSearchUrl(searchUrl: string): void;
}>;

export type SettingsStore = SettingsStoreState & SettingsStoreActions;

export function createSettingsStore() {
	return createStore<SettingsStore>()(
		persist(
			(set) => ({
				searchUrl: "https://www.google.com/search?q=%s",
				setSearchUrl(searchUrl: string) {
					set({ searchUrl });
				},
			}),
			{ name: "settings" },
		),
	);
}
