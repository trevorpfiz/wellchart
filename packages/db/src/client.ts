import { createEnv } from "@t3-oss/env-core";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { z } from "zod";

// FIXME: might be causing issues with the typescript compiler
import * as schema from "./schema";

export const env = createEnv({
  server: {
    POSTGRES_URL: z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

// FIXME: might be causing issues with the typescript compiler
export const createDBClient = () => {
  return drizzle(sql, { schema });
};
