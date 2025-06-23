import Image from "next/image";
import Link from "next/link";
import type { GameSettingsLink } from "../stores/game-settings";
import { useGameSettingsStore } from "../stores/game-settings/context/hook";
import { ArrowLeft } from "./icons/ArrowLeft";
import { ArrowRight } from "./icons/ArrowRight";
import { Trash } from "./icons/Trash";

type Props = Readonly<{
	link: GameSettingsLink;
	editing: boolean;
}>;

export function LinkCard(props: Props) {
	const moveLink = useGameSettingsStore((state) => state.moveLink);
	const removeLink = useGameSettingsStore((state) => state.removeLink);

	function moveLeft() {
		moveLink(props.link.id, "left");
	}

	function moveRight() {
		moveLink(props.link.id, "right");
	}

	function remove() {
		removeLink(props.link.id);
	}

	const faviconSrc = `https://s2.googleusercontent.com/s2/favicons?domain_url=${props.link.href}&sz=128`;

	if (props.editing) {
		return (
			<div className="join">
				<button
					className="btn join-item btn-xs h-32"
					onClick={moveLeft}
					title="move left"
					type="button"
				>
					<ArrowLeft className="h-6 w-6" />
				</button>
				<div className="btn join-item pointer-events-none h-32 grow flex-col gap-4">
					<Image alt={props.link.name} height={24} src={faviconSrc} width={24} />
					<button
						className="btn btn-error pointer-events-auto"
						onClick={remove}
						title="remove"
						type="button"
					>
						<Trash className="h-6 w-6" />
					</button>
				</div>
				<button
					className="btn join-item btn-xs h-32"
					onClick={moveRight}
					title="move right"
					type="button"
				>
					<ArrowRight className="h-6 w-6" />
				</button>
			</div>
		);
	}

	return (
		<Link className="btn h-24 flex-col gap-4" href={props.link.href}>
			<Image alt={props.link.name} height={24} src={faviconSrc} width={24} />
			{props.link.name}
		</Link>
	);
}
