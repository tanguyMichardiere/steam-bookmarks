import "client-only";
import { useContext } from "react";
import { useStore } from "zustand";
import type { GameSettingsStore } from "..";
import { gameSettingsStoreContext } from ".";

export function useGameSettingsStore<T>(selector: (state: GameSettingsStore) => T) {
	return useStore(useContext(gameSettingsStoreContext), selector);
}
