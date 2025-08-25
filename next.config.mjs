import withNextBundleAnalyzer from "@next/bundle-analyzer";
import { headers } from "./headers.config.mjs";

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
	output: process.env.STANDALONE_OUTPUT === "true" ? "standalone" : undefined,
};

nextConfig = withNextBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
})(nextConfig);

export default nextConfig;
