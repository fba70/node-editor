// import { z } from "zod"
import { baseProcedure, createTRPCRouter } from "@/trpc/init"
import prisma from "@/lib/db"

export const appRouter = createTRPCRouter({
  getUsers: baseProcedure.query(() => {
    return prisma.user.findMany()
  }),
})

export type AppRouter = typeof appRouter
