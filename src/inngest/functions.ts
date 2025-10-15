import { inngest } from "./client"
import prisma from "@/lib/db"

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("step-1", "5s")

    await step.sleep("step-2", "5s")

    await step.sleep("step-3", "5s")

    await step.run("create-workflow", () => {
      return prisma.workflow.create({
        data: {
          name: "Workflow from Inngest",
        },
      })
    })

    return { message: `Hello ${event.data.email}!` }
  }
)
