import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import type { AstroUserConfig } from "astro";

// https://astro.build/config
export default {
  integrations: [preact(), tailwind()],
  adapter: vercel({
    webAnalytics: { enabled: true },
    speedInsights: { enabled: true },
  }),
  output: "server",
} satisfies AstroUserConfig;
