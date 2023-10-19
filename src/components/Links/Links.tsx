import { useState } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";
import { useGameSettings } from "../../stores/gameSettings";
import Check from "../icons/Check";
import PencilSquare from "../icons/PencilSquare";
import Plus from "../icons/Plus";
import Link from "./Link";

type Props = {
  steamId: string;
  gameId: string;
};

export default function Links(props: Props): JSX.Element {
  const { links } = useGameSettings(props.gameId);

  const [editing, setEditing] = useState(false);

  function startEditing() {
    setEditing(true);
  }

  function stopEditing() {
    setEditing(false);
  }

  return (
    <>
      {links.map((link) => (
        <Link editing={editing} gameId={props.gameId} key={link.id} link={link} />
      ))}
      {editing ? (
        <button class="btn btn-ghost h-32" onClick={stopEditing} title="stop editing" type="button">
          <Check class="h-6 w-6" />
        </button>
      ) : (
        <div class="join">
          <a
            class="btn btn-ghost join-item h-24 grow"
            href={`/${props.steamId}/${props.gameId}/new-link`}
            title="add link"
          >
            <Plus class="w=6 h-6" />
          </a>
          <button
            class="btn btn-ghost join-item h-24 grow"
            onClick={startEditing}
            title="edit links"
            type="button"
          >
            <PencilSquare class="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}
