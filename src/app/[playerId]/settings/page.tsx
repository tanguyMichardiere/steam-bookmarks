import { SettingsForm } from "../../../components/settings-form";

export default async function SettingsPage(props: PageProps<"/[playerId]/settings">) {
	const params = await props.params;

	return (
		<main className="hero h-full">
			<div className="hero-content text-center">
				<SettingsForm playerId={params.playerId} />
			</div>
		</main>
	);
}
