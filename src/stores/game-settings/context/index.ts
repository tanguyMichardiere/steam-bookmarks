import "client-only";
import { createContext } from "react";
import type { createGameSettingsStore } from "..";

export const gameSettingsStoreContext = createContext<ReturnType<typeof createGameSettingsStore>>(
	// biome-ignore lint/style/noNonNullAssertion: we assume that the context hook will only be called inside the provider
	null!,
);
