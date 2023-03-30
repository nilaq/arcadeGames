import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import {prisma} from "../../db";

export const userRouter = createTRPCRouter({
    getAll: publicProcedure
        .query(({}) => {
            return prisma.user.findMany();
        }),
    create: publicProcedure.input(z.object({
        ipAddress: z.string().optional(),
        name: z.string().optional(),
        firstSeen: z.date().optional(),
        lastSeen: z.date().optional(),
    }))
        .mutation(async ({input}) => {
            return prisma.user.create({
                data: {
                    ipAddress: input.ipAddress,
                    name: input.name,
                    firstSeen: input.firstSeen,
                    lastSeen: input.lastSeen,
                }
            })
        })
});