import { action } from "nanostores";
import { $gameSettings, getGameSettings } from "..";

export const setSearchPrefix = action(
  $gameSettings,
  "setSearchPrefix",
  function ($gameSettings, gameId: string, searchPrefix: string) {
    const gameSettings = getGameSettings(gameId);
    $gameSettings.setKey(gameId, { ...gameSettings, searchPrefix: searchPrefix.trim() });
  },
);
