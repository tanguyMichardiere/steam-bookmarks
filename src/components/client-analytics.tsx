"use client";

import { Analytics } from "@vercel/analytics/next";

export function ClientAnalytics() {
	return (
		<Analytics
			beforeSend={(event) => {
				const url = new URL(event.url);
				url.pathname = url.pathname.replace(/^\/\d+/, "/[steamId]");
				url.pathname = url.pathname.replace(/^\/\[steamId\]\/\d+/, "/[steamId]/[gameId]");
				return { ...event, url: url.toString() };
			}}
		/>
	);
}
