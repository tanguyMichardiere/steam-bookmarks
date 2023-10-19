import type { JSX } from "preact/jsx-runtime";

type Props = {
  class: string;
};

export default function Check(props: Props): JSX.Element {
  return (
    <svg
      class={props.class}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
