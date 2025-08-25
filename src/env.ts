import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	emptyStringAsUndefined: true,
	experimental__runtimeEnv: {},
	server: {
		API_KEY: z.string(),
		REDIS_URL: z.optional(z.string()),
		LOG_LEVEL: z.enum(["debug", "info", "warning", "error", "silent"]).default("warning"),
		ANALYTICS: z.boolean().default(true),
		NODE_ENV: z.enum(["development", "production", "test"]),
	},
});
