"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { createGameSettingsStore } from "..";
import { gameSettingsStoreContext } from ".";

type Props = Readonly<{
	gameId: string;
	children: ReactNode;
}>;

export function GameSettingsStoreProvider(props: Props) {
	const gameSettingsStore = useRef<ReturnType<typeof createGameSettingsStore>>(null);

	if (gameSettingsStore.current === null) {
		gameSettingsStore.current = createGameSettingsStore(props.gameId);
	}

	return (
		<gameSettingsStoreContext.Provider value={gameSettingsStore.current}>
			{props.children}
		</gameSettingsStoreContext.Provider>
	);
}
