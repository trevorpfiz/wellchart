import { relations } from "drizzle-orm";
import { varchar } from "drizzle-orm/pg-core";

import { createTable } from "./_table";
import { post } from "./post";

export const profile = createTable("profile", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  image: varchar("image", { length: 256 }),
  email: varchar("email", { length: 256 }),
});

export const profileRelations = relations(profile, ({ many }) => ({
  posts: many(post),
}));
