import { Cog8ToothIcon } from "@heroicons/react/24/solid";
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
				<Image
					alt="avatar"
					blurDataURL={props.playerSummary.blurAvatarSrc}
					className="avatar rounded"
					height={48}
					placeholder="blur"
					src={props.playerSummary.avatarSrc}
					width={48}
				/>
				<div className="breadcrumbs gap-4">
					<ul>
						<li>
							<p>{props.playerSummary.name}</p>
						</li>
						{props.playerSummary.currentGame !== null && (
							<li>{props.playerSummary.currentGame.name}</li>
						)}
					</ul>
				</div>
			</div>
			<div className="navbar-end">
				<Link className="btn btn-ghost btn-circle" href={`/${props.playerSummary.id}/settings`}>
					<Cog8ToothIcon className="h-6 w-6" />
				</Link>
			</div>
		</nav>
	);
}
