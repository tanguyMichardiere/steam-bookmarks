import "client-only";
import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type GameSettingsBookmark = Readonly<{
	id: number;
	name: string;
	href: string;
}>;

type GameSettingsStoreState = Readonly<{
	searchPrefix: string;
	bookmarks: Array<GameSettingsBookmark>;
}>;

type GameSettingsStoreActions = Readonly<{
	setSearchPrefix(searchPrefix: string): void;
	addBookmark(bookmark: Omit<GameSettingsStoreState["bookmarks"][number], "id">): void;
	moveBookmark(bookmarkId: number, direction: "left" | "right"): void;
	removeBookmark(bookmarkId: number): void;
}>;

export type GameSettingsStore = GameSettingsStoreState & GameSettingsStoreActions;

export function createGameSettingsStore(gameId: string) {
	return createStore<GameSettingsStore>()(
		persist(
			(set) => ({
				// state
				searchPrefix: "",
				bookmarks: [],
				// actions
				setSearchPrefix(searchPrefix: string) {
					set({ searchPrefix });
				},
				addBookmark(bookmark) {
					set(({ bookmarks }) => ({ bookmarks: [...bookmarks, { id: Date.now(), ...bookmark }] }));
				},
				moveBookmark(bookmarkId: number, direction: "left" | "right") {
					set(({ bookmarks }) => {
						// TODO: refactor
						const bookmarkIndex = bookmarks.findIndex(({ id }) => id === bookmarkId);
						const bookmark = bookmarks[bookmarkIndex];
						if (bookmark !== undefined) {
							const adjacentIndex = direction === "left" ? bookmarkIndex - 1 : bookmarkIndex + 1;
							const adjacentBookmark = bookmarks[adjacentIndex];
							if (adjacentBookmark !== undefined) {
								bookmarks.splice(
									direction === "left" ? adjacentIndex : bookmarkIndex,
									2,
									direction === "left" ? bookmark : adjacentBookmark,
									direction === "left" ? adjacentBookmark : bookmark,
								);
								return { bookmarks: [...bookmarks] };
							}
						}
						return {};
					});
				},
				removeBookmark(bookmarkId: number) {
					set(({ bookmarks }) => ({ bookmarks: bookmarks.filter(({ id }) => id !== bookmarkId) }));
				},
			}),
			{ name: `game-settings/${gameId}` },
		),
	);
}
