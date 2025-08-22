import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

export function useBooleanState(
	initialState: boolean | (() => boolean) = false,
): [boolean, () => void, () => void, () => void, Dispatch<SetStateAction<boolean>>] {
	const [state, setState] = useState(initialState);

	function setFalse() {
		setState(false);
	}

	function setTrue() {
		setState(true);
	}

	function toggle() {
		setState((state) => !state);
	}

	return [state, setFalse, setTrue, toggle, setState];
}
