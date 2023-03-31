import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import {prisma} from "../../db";

export const scoreRouter = createTRPCRouter({
    getTop5Local: publicProcedure.input(z.string())
        .query(({ctx, input}) => {
            return prisma.score.findMany({
                where: {
                    user: {
                        id: input
                    }
                },
                orderBy: {
                    score: "desc",
                },
                take: 5
            });
        }),
    getHighScore: publicProcedure.input(z.string())
        .query(({ctx, input}) => {
            return prisma.score.findMany({
                where: {
                    user: {
                        id: input
                    }
                },
                orderBy: {
                    score: "desc",
                },
                take: 1
            });
        }),
    getTop5Global: publicProcedure
        .query(({}) => {
            return prisma.score.findMany({
                    orderBy: {
                        score: "desc",
                    },
                    take: 5
            });
        }),
    create: publicProcedure.input(z.object({
        score: z.number(),
        user: z.string(),
        name: z.string().optional(),
    }))
        .mutation(async ({input}) => {
            return prisma.score.create({
                data: {
                    score: input.score,
                    name: input.name,
                    user: {
                        connect: {
                            id: input.user,
                        }
                    }
                }
            })
        }),
    update: publicProcedure.input(z.object({
        id: z.string(),
        name: z.string().optional()
    }))
        .mutation(async ({input}) => {
            return prisma.score.update({
                where: {
                    id: input.id,
                },
                data: {
                    name: input.name,
                }
            })
        })
});