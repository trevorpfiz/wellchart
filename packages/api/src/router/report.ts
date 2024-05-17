import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { and, desc, eq } from "@wellchart/db";
import {
  insertReportParams,
  Report,
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

      const response = await HealthService.healthCheck();

      return response;
    }),

  all: publicProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.query.Report.findMany({
      with: { profile: true },
      orderBy: desc(Report.id),
      limit: 10,
    });

    return { reports: rows };
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;

      const row = await ctx.db.query.Report.findFirst({
        where: eq(Report.id, id),
        with: { profile: true },
      });

      return { report: row };
    }),

  byUser: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;

    const rows = await ctx.db.query.Report.findMany({
      where: eq(Report.profileId, userId),
      orderBy: desc(Report.id),
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
        .insert(Report)
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
        .update(Report)
        .set({
          title,
          content,
        })
        .where(and(eq(Report.id, id), eq(Report.profileId, userId)))
        .returning();

      return { report: r };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const userId = ctx.user.id;

      const data = await ctx.db.query.Report.findFirst({
        where: eq(Report.id, id),
      });

      if (data?.profileId !== userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Only the owner is allowed to delete the report",
        });
      }

      const [r] = await ctx.db
        .delete(Report)
        .where(eq(Report.id, id))
        .returning();

      return { report: r };
    }),
} satisfies TRPCRouterRecord;
