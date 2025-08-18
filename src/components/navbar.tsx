import Image from "next/image";
import Link from "next/link";
import type { PlayerSummary } from "../api/player-summary";

type Props = Readonly<{
	playerSummary: PlayerSummary;
}>;

export function Navbar(props: Props) {
	return (
		<nav className="navbar">
			<div className="navbar-start gap-4">
				<Link className="link flex items-center gap-2" href={`/${props.playerSummary.steamid}`}>
					<Image
						alt="avatar"
						blurDataURL={props.playerSummary.avatar}
						className="avatar rounded"
						height={48}
						placeholder="blur"
						src={props.playerSummary.avatarfull}
						width={48}
					/>
					<p>{props.playerSummary.personaname}</p>
				</Link>
				{props.playerSummary.gameextrainfo !== undefined && (
					<>
						&gt;
						<Link
							className="link"
							href={`/${props.playerSummary.steamid}/${props.playerSummary.gameid}`}
						>
							{props.playerSummary.gameextrainfo}
						</Link>
					</>
				)}
			</div>
		</nav>
	);
}
