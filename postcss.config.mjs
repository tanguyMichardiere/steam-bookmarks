/** @type {import("postcss-load-config").Config} */
export default {
	plugins: {
		"@tailwindcss/postcss": {},
		autoprefixer: {},
		"postcss-flexbugs-fixes": {},
		"postcss-preset-env": {
			autoprefixer: { flexbox: "no-2009" },
			features: { "custom-properties": false },
			stage: 3,
		},
	},
};
