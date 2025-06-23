"use client";

import { useState } from "react";
import { useGameSettingsStore } from "../stores/game-settings/context/hook";
import { Check } from "./icons/Check";
import { PencilSquare } from "./icons/PencilSquare";
import { Plus } from "./icons/Plus";
import { LinkCard } from "./link-card";

type Props = Readonly<{
	steamId: string;
	gameId: string;
}>;

export function LinksGrid(props: Props) {
	const baseLinks = [
		{ href: `https://steamcommunity.com/app/${props.gameId}`, id: 0, name: "Steam Community" },
		{ href: `https://steamdb.info/app/${props.gameId}/charts/`, id: 1, name: "SteamDB" },
		{ href: `https://steambase.io/games/${props.gameId}`, id: 2, name: "Steambase" },
		{
			href: `https://www.pcgamingwiki.com/api/appid.php?appid=${props.gameId}`,
			id: 3,
			name: "PCGamingWiki",
		},
	];

	const links = useGameSettingsStore((state) => state.links);

	const [editing, setEditing] = useState(false);

	function startEditing() {
		setEditing(true);
	}

	function stopEditing() {
		setEditing(false);
	}

	return (
		<>
			{baseLinks.map((link) => (
				<LinkCard editing={false} key={link.id} link={link} />
			))}
			{links.map((link) => (
				<LinkCard editing={editing} key={link.id} link={link} />
			))}
			{editing ? (
				<button
					className="btn btn-ghost h-32"
					onClick={stopEditing}
					title="stop editing"
					type="button"
				>
					<Check className="h-6 w-6" />
				</button>
			) : (
				<div className="join">
					<a
						className="btn btn-ghost join-item h-24 grow"
						href={`/${props.steamId}/${props.gameId}/new-link`}
						title="add link"
					>
						<Plus className="w=6 h-6" />
					</a>
					<button
						className="btn btn-ghost join-item h-24 grow"
						onClick={startEditing}
						title="edit links"
						type="button"
					>
						<PencilSquare className="h-6 w-6" />
					</button>
				</div>
			)}
		</>
	);
}
