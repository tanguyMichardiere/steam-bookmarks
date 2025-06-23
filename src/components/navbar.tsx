import Image from "next/image";
import Link from "next/link";
import "server-only";
import type { PlayerSummary } from "../api/player-summary";

type Props = Readonly<{
	playerSummary: PlayerSummary;
}>;

export function Navbar(props: Props) {
	return (
		<nav className="navbar">
			<h1 className="navbar-start">{props.playerSummary.gameextrainfo}</h1>
			<Link className="link navbar-end flex gap-2" href={`/${props.playerSummary.steamid}`}>
				<p>{props.playerSummary.personaname}</p>
				<Image
					alt="avatar"
					blurDataURL={props.playerSummary.avatar}
					className="avatar rounded"
					height={48}
					placeholder="blur"
					src={props.playerSummary.avatarfull}
					width={48}
				/>
			</Link>
		</nav>
	);
}
