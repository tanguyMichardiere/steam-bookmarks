import Link from "next/link";

export default function LandingPage() {
	return (
		<main className="hero h-full">
			<div className="hero-content text-center">
				<div className="max-w-md flex flex-col gap-6">
					<h1 className="text-5xl font-bold">Steam Bookmarks</h1>
					<p>Home page for the Steam overlay browser</p>
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
