"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { createSettingsStore } from "..";
import { settingsStoreContext } from ".";

type Props = Readonly<{
	children: ReactNode;
}>;

export function SettingsStoreProvider(props: Props) {
	const settingsStore = useRef<ReturnType<typeof createSettingsStore>>(null);

	if (settingsStore.current === null) {
		settingsStore.current = createSettingsStore();
	}

	return (
		<settingsStoreContext.Provider value={settingsStore.current}>
			{props.children}
		</settingsStoreContext.Provider>
	);
}
