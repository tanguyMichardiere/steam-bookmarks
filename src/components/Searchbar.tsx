import { useStore } from "@nanostores/preact";
import type { TargetedEvent } from "preact/compat";
import { useRef } from "preact/compat";
import type { JSX } from "preact/jsx-runtime";
import { useGameSettings } from "../stores/gameSettings";
import { $settings } from "../stores/settings";
import MagnifyingGlass from "./icons/MagnifyingGlass";

type Props = {
  gameId: string;
};

export default function Searchbar(props: Props): JSX.Element {
  const { searchUrl } = useStore($settings);
  const { searchPrefix } = useGameSettings(props.gameId);

  const searchInput = useRef<HTMLInputElement>(null);

  function submit(event: TargetedEvent<HTMLFormElement>) {
    event.preventDefault();
    if (searchInput.current !== null) {
      const search = searchInput.current.value.trim();
      if (search.length > 0) {
        window.open(searchUrl.replace("%s", searchInput.current.value.trim()));
        searchInput.current.value = searchInput.current.defaultValue;
      }
    }
  }

  return (
    <form class="join" onSubmit={submit}>
      <input
        class="input join-item input-bordered"
        defaultValue={`${searchPrefix} `.trimStart()}
        ref={searchInput}
        title="search"
        type="text"
      />
      <button class="btn join-item" title="search" type="submit">
        <MagnifyingGlass class="h-6 w-6" />
      </button>
    </form>
  );
}
