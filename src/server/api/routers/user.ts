import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import {prisma} from "../../db";

export const userRouter = createTRPCRouter({
    getAll: publicProcedure
        .query(({}) => {
            return prisma.user.findMany();
        }),
    getById: publicProcedure.input(z.string()).query(({ctx, input}) => {
        return ctx.prisma.user.findUnique({
            where: {
                id: input,
            },
        });
    }),
    create: publicProcedure.input(z.object({
        name: z.string().optional(),
        firstSeen: z.date().optional(),
    }))
        .mutation(async ({input}) => {
            return prisma.user.create({
                data: {
                    name: input.name,
                    firstSeen: input.firstSeen,
                }
            })
        }),
    update: publicProcedure.input(z.object({
        id: z.string(),
        name: z.string().optional()
    }))
        .mutation(async ({input}) => {
            return prisma.user.update({
                where: {
                    id: input.id,
                },
                data: {
                    name: input.name,
                }
            })
        })
});