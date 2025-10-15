// import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import prisma from "@/lib/db"
import { inngest } from "@/inngest/client"

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(() => {
    // console.log({ userId: ctx.auth.user.id })

    return prisma.workflow.findMany()
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "a@b.com",
      },
    })

    return { success: true, message: "Workflow creation started" }
  }),
})

export type AppRouter = typeof appRouter
