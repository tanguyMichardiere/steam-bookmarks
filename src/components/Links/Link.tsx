import type { JSX } from "preact/jsx-runtime";
import type { GameSettingsLink } from "../../stores/gameSettings";
import { moveLink } from "../../stores/gameSettings/actions/moveLink";
import { removeLink } from "../../stores/gameSettings/actions/removeLink";
import ArrowLeft from "../icons/ArrowLeft";
import ArrowRight from "../icons/ArrowRight";
import Trash from "../icons/Trash";

type Props = {
  gameId: string;
  link: GameSettingsLink;
  editing: boolean;
};

export default function Link(props: Props): JSX.Element {
  function remove() {
    removeLink(props.gameId, props.link.id);
  }

  function moveLeft() {
    moveLink(props.gameId, props.link.id, "left");
  }

  function moveRight() {
    moveLink(props.gameId, props.link.id, "right");
  }

  if (props.editing) {
    return (
      <div class="join">
        <button
          class="btn join-item btn-xs h-32"
          onClick={moveLeft}
          title="move left"
          type="button"
        >
          <ArrowLeft class="h-6 w-6" />
        </button>
        <div class="btn join-item pointer-events-none h-32 grow flex-col gap-4">
          <img
            alt={props.link.name}
            class="h-6 w-6"
            src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${props.link.href}&sz=128`}
          />
          <button
            class="btn btn-error pointer-events-auto"
            onClick={remove}
            title="remove"
            type="button"
          >
            <Trash class="h-6 w-6" />
          </button>
        </div>
        <button
          class="btn join-item btn-xs h-32"
          onClick={moveRight}
          title="move right"
          type="button"
        >
          <ArrowRight class="h-6 w-6" />
        </button>
      </div>
    );
  }

  return (
    <a class="btn h-24 flex-col gap-4" href={props.link.href} rel="noreferrer" target="_blank">
      <img
        alt={props.link.name}
        class="h-6 w-6"
        src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${props.link.href}&sz=128`}
      />
      {props.link.name}
    </a>
  );
}
