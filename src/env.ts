import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod/v4";

export const env = createEnv({
	emptyStringAsUndefined: true,
	experimental__runtimeEnv: {},
	server: {
		NODE_ENV: z.enum(["development", "production", "test"]),
	},
});
