import { createTRPCRouter } from "./trpc";
import {userRouter} from "./routers/user";
import {scoreRouter} from "./routers/score";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  score: scoreRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
