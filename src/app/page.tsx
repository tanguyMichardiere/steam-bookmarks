import Link from "next/link";

export default function LandingPage() {
	return (
		<main className="hero h-full">
			<div className="hero-content text-center">
				<div className="max-w-md flex flex-col gap-6">
					<h1 className="text-5xl font-bold">Steam Bookmarks</h1>
					<h2 className="text-xl">Home page for the Steam overlay browser</h2>
					<div>
						<Link className="link" href="/getting-started">
							Getting Started
						</Link>
					</div>
					<div>
						<Link className="link" href="/faq">
							FAQ
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}
