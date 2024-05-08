import { relations, sql } from "drizzle-orm";
import { serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { timestamps } from "../lib/utils";
import { createTable } from "./_table";
import { profile } from "./profile";

export const report = createTable("report", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  content: text("content").notNull(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profile.id),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const reportRelations = relations(report, ({ one }) => ({
  profile: one(profile, {
    fields: [report.profileId],
    references: [profile.id],
  }),
}));

export const createReportSchema = createInsertSchema(report).omit({
  id: true,
  ...timestamps,
});
export type CreateReportInput = z.infer<typeof createReportSchema>;
