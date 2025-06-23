import { createEnv } from "@t3-oss/env-nextjs";
import "server-only";
import { z } from "zod/v4";

export const env = createEnv({
	emptyStringAsUndefined: true,
	experimental__runtimeEnv: {},
	server: {
		API_KEY: z.string(),
		LOG_LEVEL: z.enum(["debug", "info", "warning", "error", "silent"]).default("warning"),
		NODE_ENV: z.enum(["development", "production", "test"]),
	},
});
