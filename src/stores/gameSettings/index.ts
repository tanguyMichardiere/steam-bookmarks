import { persistentMap } from "@nanostores/persistent";
import { useStore } from "@nanostores/preact";
import { jsonEncode } from "../utils";

export type GameSettingsLink = {
  id: number;
  name: string;
  href: string;
};

export type GameSettings = {
  searchPrefix: string;
  links: Array<GameSettingsLink>;
};

export const $gameSettings = persistentMap<Record<string, GameSettings>>(
  "gameSettings:",
  {},
  jsonEncode,
);

const defaultGameSettings = (gameId: string): GameSettings => ({
  searchPrefix: "",
  links: [
    { id: 0, name: "Steam Community", href: `https://steamcommunity.com/app/${gameId}` },
    { id: 1, name: "SteamDB", href: `https://steamdb.info/app/${gameId}/charts` },
    { id: 2, name: "Steambase", href: `https://steambase.io/games/${gameId}` },
    {
      id: 3,
      name: "PCGamingWiki",
      href: `https://www.pcgamingwiki.com/api/appid.php?appid=${gameId}`,
    },
  ],
});

export function getGameSettings(gameId: string): GameSettings {
  return $gameSettings.get()[gameId] ?? defaultGameSettings(gameId);
}

export function useGameSettings(gameId: string): GameSettings {
  return useStore($gameSettings, { keys: [gameId] })[gameId] ?? defaultGameSettings(gameId);
}
