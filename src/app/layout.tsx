import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ClientAnalytics } from "../components/client-analytics";
import { Footer } from "../components/footer";
import "./styles.css";

export const metadata: Metadata = {
	title: "Steam Bookmarks",
	description: "Home page for the Steam overlay browser",
};

type Props = Readonly<{
	children: ReactNode;
}>;

export default function RootLayout(props: Props) {
	return (
		<html className="h-full" lang="en">
			<ClientAnalytics />
			<SpeedInsights />
			<body className="font-sans antialiased h-full p-4 flex flex-col">
				{props.children}
				<Footer />
			</body>
		</html>
	);
}
