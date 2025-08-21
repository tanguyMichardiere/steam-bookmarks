import Link from "next/link";

export default function FaqPage() {
	return (
		<main className="hero h-full">
			<div className="hero-content text-center">
				<div className="max-w-md flex flex-col gap-6">
					<div>
						<h2 className="text-xl text-secondary">Why does my Steam profile need to be public?</h2>
						<p>
							Steam Bookmarks uses the official Steam Web API to determine the game you are
							currently playing. If your profile is private, the{" "}
							<a
								className="link"
								href="https://developer.valvesoftware.com/wiki/Steam_Web_API#GetPlayerSummaries_(v0002)"
							>
								GetPlayerSummaries
							</a>{" "}
							endpoint doesn't return your current game.
						</p>
					</div>
					<div>
						<h2 className="text-xl text-secondary">Where is my data stored?</h2>
						<p>
							All your settings and bookmarks are stored locally, in your browser. That's why
							loading your Steam Bookmarks URL in another browser doesn't display your bookmarks.
						</p>
					</div>
					<div>
						<Link className="link" href="/">
							Home Page
						</Link>
					</div>
					<div>
						<Link className="link" href="/getting-started">
							Getting Started
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}
