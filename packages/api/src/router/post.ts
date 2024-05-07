import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { z } from "zod";

import { desc, eq } from "@wellchart/db";
import { createPostSchema, post, profile } from "@wellchart/db/schema";

import { protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = {
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.post.findMany({
      with: { author: true },
      orderBy: desc(post.id),
      limit: 10,
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.post.findFirst({
        with: { author: true },
        where: eq(post.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
      function getNameFromUser() {
        const meta = ctx.user.user_metadata;
        if (typeof meta.name === "string") return meta.name;
        if (typeof meta.full_name === "string") return meta.full_name;
        if (typeof meta.user_name === "string") return meta.user_name;
        return "[redacted]";
      }

      const authorId = await ctx.db.query.profile
        .findFirst({
          where: eq(profile.id, ctx.user.id),
        })
        .then(async (p) => {
          if (p) return p.id;
          const [newProfile] = await ctx.db
            .insert(profile)
            .values({
              id: ctx.user.id,
              name: getNameFromUser(),
              image: ctx.user.user_metadata.avatar_url as string | undefined,
              email: ctx.user.email,
            })
            .returning();

          return newProfile!.id;
        });

      return ctx.db.insert(post).values({
        id: nanoid(),
        authorId,
        title: input.title,
        content: input.content,
      });
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.db.query.post.findFirst({
        where: eq(post.id, input),
      });

      if (data?.authorId !== ctx.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Only the author is allowed to delete the post",
        });
      }

      return ctx.db.delete(post).where(eq(post.id, input));
    }),
} satisfies TRPCRouterRecord;
