import type { Config } from "drizzle-kit";
import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

export const env = createEnv({
  server: {
    POSTGRES_URL: z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

export default {
  schema: "./src/schema",
  schemaFilter: ["public"],
  out: "./migrations",
  driver: "pg",
  dbCredentials: { connectionString: env.POSTGRES_URL },
  tablesFilter: ["t3turbo_*"],
} satisfies Config;
