import type { z } from "zod";
import { relations, sql } from "drizzle-orm";
import { serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

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

// Schema for reports - used to validate API requests
const baseSchema = createSelectSchema(report).omit(timestamps);

export const insertReportSchema = createInsertSchema(report).omit(timestamps);
export const insertReportParams = baseSchema.extend({}).omit({
  id: true,
  profileId: true,
});

export const updateReportSchema = baseSchema;
export const updateReportParams = baseSchema
  .extend({})
  .omit({
    profileId: true,
  })
  .partial()
  .extend({
    id: baseSchema.shape.id,
  });
export const reportIdSchema = baseSchema.pick({ id: true });

// Types for reports - used to type API request params and within Components
export type Report = typeof report.$inferSelect;
export type NewReport = z.infer<typeof insertReportSchema>;
export type NewReportParams = z.infer<typeof insertReportParams>;
export type UpdateReportParams = z.infer<typeof updateReportParams>;
export type ReportId = z.infer<typeof reportIdSchema>["id"];
