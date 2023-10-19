import { action } from "nanostores";
import { $gameSettings, getGameSettings } from "..";

export const moveLink = action(
  $gameSettings,
  "moveLink",
  function ($gameSettings, gameId: string, linkId: number, direction: "left" | "right") {
    const gameSettings = getGameSettings(gameId);
    const linkIndex = gameSettings.links.findIndex(({ id }) => id === linkId);
    const link = gameSettings.links[linkIndex];
    if (link !== undefined) {
      const adjacentIndex = direction === "left" ? linkIndex - 1 : linkIndex + 1;
      const adjacentLink = gameSettings.links[adjacentIndex];
      if (adjacentLink !== undefined)
        $gameSettings.setKey(gameId, {
          ...gameSettings,
          links: gameSettings.links.toSpliced(
            direction === "left" ? adjacentIndex : linkIndex,
            2,
            direction === "left" ? link : adjacentLink,
            direction === "left" ? adjacentLink : link,
          ),
        });
    }
  },
);
