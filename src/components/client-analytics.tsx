"use client";

import type { BeforeSendEvent } from "@vercel/analytics";
import { Analytics } from "@vercel/analytics/next";

function beforeSend(event: BeforeSendEvent) {
	const url = new URL(event.url);
	url.pathname = url.pathname.replace(/^\/\d+/, "/[steamId]");
	url.pathname = url.pathname.replace(/^\/\[steamId\]\/\d+/, "/[steamId]/[gameId]");
	return { ...event, url: url.toString() };
}

export function ClientAnalytics() {
	return <Analytics beforeSend={beforeSend} />;
}
