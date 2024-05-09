import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { and, desc, eq } from "@wellchart/db";
import {
  insertReportParams,
  report,
  updateReportParams,
} from "@wellchart/db/schema";

import { HealthService, OpenAPI } from "../lib/api/client";
import { protectedProcedure, publicProcedure } from "../trpc";

export const reportRouter = {
  test: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;

      if (!token) {
        throw new Error("User token not available");
      }

      OpenAPI.TOKEN = token;

      const response = await HealthService.healthHealthCheck();

      return response;
    }),

  all: publicProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.query.report.findMany({
      with: { profile: true },
      orderBy: desc(report.id),
      limit: 10,
    });

    return { reports: rows };
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;

      const row = await ctx.db.query.report.findFirst({
        where: eq(report.id, id),
        with: { profile: true },
      });

      return { report: row };
    }),

  byUser: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;

    const rows = await ctx.db.query.report.findMany({
      where: eq(report.profileId, userId),
      orderBy: desc(report.id),
      with: { profile: true },
    });

    return { reports: rows };
  }),

  create: protectedProcedure
    .input(insertReportParams)
    .mutation(async ({ ctx, input }) => {
      const { title, content } = input;
      const userId = ctx.user.id;

      const [r] = await ctx.db
        .insert(report)
        .values({
          title,
          content,
          profileId: userId,
        })
        .returning();

      return { report: r };
    }),

  update: protectedProcedure
    .input(updateReportParams)
    .mutation(async ({ ctx, input }) => {
      const { id, content, title } = input;
      const userId = ctx.user.id;

      const [r] = await ctx.db
        .update(report)
        .set({
          title,
          content,
          updatedAt: new Date(),
        })
        .where(and(eq(report.id, id), eq(report.profileId, userId)))
        .returning();

      return { report: r };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const userId = ctx.user.id;

      const data = await ctx.db.query.report.findFirst({
        where: eq(report.id, id),
      });

      if (data?.profileId !== userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Only the owner is allowed to delete the report",
        });
      }

      const [r] = await ctx.db
        .delete(report)
        .where(eq(report.id, id))
        .returning();

      return { report: r };
    }),
} satisfies TRPCRouterRecord;
