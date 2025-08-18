import "client-only";
import { useContext } from "react";
import { useStore } from "zustand";
import type { SettingsStore } from "..";
import { settingsStoreContext } from ".";

export function useSettingsStore<T>(selector: (state: SettingsStore) => T) {
	return useStore(useContext(settingsStoreContext), selector);
}
