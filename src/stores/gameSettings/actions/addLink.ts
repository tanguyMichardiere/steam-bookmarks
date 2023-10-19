import { action } from "nanostores";
import type { GameSettingsLink } from "..";
import { $gameSettings, getGameSettings } from "..";

export const addLink = action(
  $gameSettings,
  "addLink",
  function ($gameSettings, gameId: string, link: Omit<GameSettingsLink, "id">) {
    const gameSettings = getGameSettings(gameId);
    $gameSettings.setKey(gameId, {
      ...gameSettings,
      links: [...gameSettings.links, { id: Date.now(), ...link }],
    });
  },
);
