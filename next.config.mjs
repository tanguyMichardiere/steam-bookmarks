import { fileURLToPath } from "node:url";
import withNextBundleAnalyzer from "@next/bundle-analyzer";
import { createJiti } from "jiti";
import { headers } from "./headers.config.mjs";

const jiti = createJiti(fileURLToPath(import.meta.url));
// ensure all environment variables are defined at build time
jiti("./src/env");

/** @type {import("next").NextConfig} */
let nextConfig = {
	// linting is done in CI
	eslint: { ignoreDuringBuilds: true },
	// type checking is done in CI
	typescript: { ignoreBuildErrors: true },
	typedRoutes: true,
	reactStrictMode: true,
	experimental: {
		reactCompiler: true,
	},
	headers() {
		return Promise.resolve([{ headers, source: "/:path*" }]);
	},
	poweredByHeader: false,
	images: {
		remotePatterns: [
			{ hostname: "avatars.steamstatic.com", pathname: "**", port: "", protocol: "https" },
			{
				hostname: "s2.googleusercontent.com",
				pathname: "/s2/favicons",
				port: "",
				protocol: "https",
			},
		],
	},
};

nextConfig = withNextBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
})(nextConfig);

export default nextConfig;
