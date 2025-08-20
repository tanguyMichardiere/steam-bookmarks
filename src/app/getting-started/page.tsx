export default function GettingStartedPage() {
	return (
		<main className="hero h-full">
			<div className="hero-content text-center">
				<div className="max-w-md flex flex-col gap-6">
					<p>
						To get started, set your Steam overlay browser's home page to{" "}
						<span className="text-secondary">https://steambookmarks.com/&lt;your_steam_id&gt;</span>
					</p>
					<p>
						To find your Steam ID, log into Steam via your web browser or the Steam application.
						From there, click your username in the top-right corner of the window and select{" "}
						<span className="text-accent">Account details</span> from the dropdown menu. Your 17
						digit Steam ID will appear near the top of this screen, right below your Steam username.
					</p>
					<p>
						For example, Robin Walker's Steam Bookmarks URL is{" "}
						<span className="text-secondary">https://steambookmarks.com/76561197960435530</span>
					</p>
				</div>
			</div>
		</main>
	);
}
