import { relations } from "drizzle-orm";
import { uuid, varchar } from "drizzle-orm/pg-core";

import { createTable } from "./_table";
import { users } from "./auth";
import { report } from "./report";

export const profile = createTable("profile", {
  // Matches id from auth.users table in Supabase
  id: uuid("id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 256 }).notNull(),
  image: varchar("image", { length: 256 }),
  email: varchar("email", { length: 256 }),
});

export const profileRelations = relations(profile, ({ many }) => ({
  reports: many(report),
}));
