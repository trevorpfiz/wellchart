import { pgSchema, uuid } from "drizzle-orm/pg-core";

const authSchema = pgSchema("auth");

export const users = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

// Used to setup foreign key from profile.id to auth.users table in Supabase
