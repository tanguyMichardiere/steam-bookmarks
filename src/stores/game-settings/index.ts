import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type GameSettingsLink = Readonly<{
	id: number;
	name: string;
	href: string;
}>;

type GameSettingsStoreState = Readonly<{
	links: Array<GameSettingsLink>;
	searchPrefix: string;
}>;

type GameSettingsStoreActions = Readonly<{
	addLink(link: Omit<GameSettingsStoreState["links"][number], "id">): void;
	moveLink(linkId: number, direction: "left" | "right"): void;
	removeLink(linkId: number): void;
	setSearchPrefix(searchPrefix: string): void;
}>;

export type GameSettingsStore = GameSettingsStoreState & GameSettingsStoreActions;

export function createGameSettingsStore(gameId: string) {
	return createStore<GameSettingsStore>()(
		persist(
			(set) => ({
				addLink(link) {
					set(({ links }) => ({ links: [...links, { id: Date.now(), ...link }] }));
				},
				links: [],
				moveLink(linkId: number, direction: "left" | "right") {
					set(({ links }) => {
						// TODO: refactor
						const linkIndex = links.findIndex(({ id }) => id === linkId);
						const link = links[linkIndex];
						if (link !== undefined) {
							const adjacentIndex = direction === "left" ? linkIndex - 1 : linkIndex + 1;
							const adjacentLink = links[adjacentIndex];
							if (adjacentLink !== undefined) {
								links.splice(
									direction === "left" ? adjacentIndex : linkIndex,
									2,
									direction === "left" ? link : adjacentLink,
									direction === "left" ? adjacentLink : link,
								);
								return { links: [...links] };
							}
						}
						return {};
					});
				},
				removeLink(linkId: number) {
					set(({ links }) => ({ links: links.filter(({ id }) => id !== linkId) }));
				},
				searchPrefix: "",
				setSearchPrefix(searchPrefix: string) {
					set({ searchPrefix });
				},
			}),
			{ name: `game-settings/${gameId}` },
		),
	);
}
