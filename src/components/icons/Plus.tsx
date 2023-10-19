import type { JSX } from "preact/jsx-runtime";

type Props = {
  class: string;
};

export default function MagnifyingGlass(props: Props): JSX.Element {
  return (
    <svg
      className={props.class}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
