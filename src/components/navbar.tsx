import Image from "next/image";
import type { PlayerSummary } from "../api/player-summary";

type Props = Readonly<{
	playerSummary: PlayerSummary;
}>;

export function Navbar(props: Props) {
	return (
		<nav className="navbar gap-4">
			<Image
				alt="avatar"
				blurDataURL={props.playerSummary.avatar}
				className="avatar rounded"
				height={48}
				placeholder="blur"
				src={props.playerSummary.avatarfull}
				width={48}
			/>
			<div className="breadcrumbs gap-4">
				<ul>
					<li>
						<p>{props.playerSummary.personaname}</p>
					</li>
					{props.playerSummary.gameextrainfo !== undefined && (
						<li>{props.playerSummary.gameextrainfo}</li>
					)}
				</ul>
			</div>
		</nav>
	);
}
