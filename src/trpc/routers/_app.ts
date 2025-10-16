// import { z } from "zod"
import { createTRPCRouter } from "@/trpc/init"
import { workflowsRouter } from "@/features/workflows/server/route"

export const appRouter = createTRPCRouter({
  workflows: workflowsRouter,
})

export type AppRouter = typeof appRouter
