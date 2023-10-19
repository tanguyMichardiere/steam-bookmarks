import { action } from "nanostores";
import { $gameSettings, getGameSettings } from "..";

export const removeLink = action(
  $gameSettings,
  "removeLink",
  function ($gameSettings, gameId: string, linkId: number) {
    const gameSettings = getGameSettings(gameId);
    $gameSettings.setKey(gameId, {
      ...gameSettings,
      links: gameSettings.links.filter(({ id }) => id !== linkId),
    });
  },
);
