import type { Metadata } from "next";
import type { ReactNode } from "react";
import "server-only";
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
			<body className="font-sans antialiased h-full p-4">{props.children}</body>
		</html>
	);
}
