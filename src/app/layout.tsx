import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
	description: "A home page for the Steam overlay browser",
	title: "Steam Overlay",
};

type Props = Readonly<{
	children: ReactNode;
}>;

export default function RootLayout(props: Props) {
	return (
		<html className="h-full" lang="en">
			<Analytics />
			<SpeedInsights />
			<body className="font-sans antialiased h-full p-4">{props.children}</body>
		</html>
	);
}
