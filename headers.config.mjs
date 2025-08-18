const self = "'self'";
const data = "data:";
const blob = "blob:";
const none = "'none'";
const unsafeEval = "'unsafe-eval'";
const unsafeInline = "'unsafe-inline'";

/** @type {Record<string, string[]>} */
const contentSecurityPolicy = {
	"base-uri": [self],
	"default-src": [self],
	"font-src": [self],
	"form-action": [self],
	"frame-ancestors": [none],
	"img-src": [self, blob, data],
	"object-src": [none],
	"script-src": [self, unsafeEval, unsafeInline],
	"style-src": [self, unsafeInline],
	"upgrade-insecure-requests": [],
};

/**
 * @param {string} key
 * @param {string} value
 */
function addSrc(key, value) {
	if (key in contentSecurityPolicy) {
		// @ts-expect-error checked by the line above
		contentSecurityPolicy[key].push(value);
	} else {
		contentSecurityPolicy[key] = [self, value];
	}
}

if (process.env.NODE_ENV === "development") {
	// mock script used only in development
	addSrc("script-src", "va.vercel-scripts.com");
}

/** @type {import("next/dist/lib/load-custom-routes").Header["headers"]} */
export const headers = [
	{ key: "X-DNS-Prefetch-Control", value: "on" },
	{ key: "X-XSS-Protection", value: "1; mode=block" },
	{ key: "X-Frame-Options", value: "DENY" },
	// https://www.w3.org/TR/permissions-policy-1/
	{ key: "Permissions-Policy", value: "web-share=self" },
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "Referrer-Policy", value: "origin-when-cross-origin" },
	{
		key:
			process.env.NODE_ENV === "production"
				? "Content-Security-Policy"
				: "Content-Security-Policy-Report-Only",
		value: Object.entries(contentSecurityPolicy)
			.map(([key, value]) => `${key} ${value.join(" ")}`)
			.join("; "),
	},
];
