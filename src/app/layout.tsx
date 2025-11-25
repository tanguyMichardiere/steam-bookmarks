import type { Metadata } from "next";
import { ClientAnalytics } from "../components/client-analytics";
import { Footer } from "../components/footer";
import { env } from "../env";
import "./globals.css";

export const metadata: Metadata = {
	title: "Steam Bookmarks",
	description: "Home page for the Steam overlay browser",
};

export default function RootLayout(props: LayoutProps<"/">) {
	return (
		<html className="h-full" lang="en">
			{env.ANALYTICS && <ClientAnalytics />}
			<body className="font-sans antialiased h-full flex flex-col">
				{props.children}
				<Footer />
			</body>
		</html>
	);
}
