import type { TargetedEvent } from "preact/compat";
import { useRef } from "preact/compat";
import type { JSX } from "preact/jsx-runtime";
import { addLink } from "../stores/gameSettings/actions/addLink";

type Props = {
  steamId: string;
  gameId: string;
};

export default function NewLinkForm(props: Props): JSX.Element {
  const nameInput = useRef<HTMLInputElement>(null);
  const hrefInput = useRef<HTMLInputElement>(null);

  function submit(event: TargetedEvent<HTMLFormElement>) {
    event.preventDefault();
    if (nameInput.current !== null && hrefInput.current !== null) {
      const name = nameInput.current.value.trim();
      const href = hrefInput.current.value.trim();
      if (name.length > 0 && href.length > 0) {
        addLink(props.gameId, { name, href });
        window.location.href = `/${props.steamId}/${props.gameId}`;
      }
    }
  }

  return (
    <form class="flex flex-col gap-2" onSubmit={submit}>
      <input
        class="input input-bordered"
        minLength={1}
        placeholder="Name"
        ref={nameInput}
        title="name"
        type="text"
      />
      <input
        class="input input-bordered"
        minLength={1}
        placeholder="URL"
        ref={hrefInput}
        title="href"
        type="url"
      />
      <button class="btn" type="submit">
        Submit
      </button>
    </form>
  );
}
