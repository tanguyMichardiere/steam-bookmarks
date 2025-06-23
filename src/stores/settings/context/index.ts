import "client-only";
import { createContext } from "react";
import type { createSettingsStore } from "..";

export const settingsStoreContext = createContext<ReturnType<typeof createSettingsStore>>(
	// biome-ignore lint/style/noNonNullAssertion: we assume that the context hook will only be called inside the provider
	null!,
);
