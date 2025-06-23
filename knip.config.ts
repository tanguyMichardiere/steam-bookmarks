import type { KnipConfig } from "knip";

export default {
	ignore: [],
	ignoreDependencies: [
		"@tailwindcss/forms",
		"@tailwindcss/typography",
		"daisyui",
		"npm-check-updates",
		"tailwindcss",
	],
} satisfies KnipConfig;
