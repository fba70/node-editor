import type { NodeExecutor } from "@/features/executions/types"

type ManualTriggerData = Record<string, unknown>

export const manualTriggerExecutor: NodeExecutor<ManualTriggerData> = async ({
  // data,
  nodeId,
  context,
  step,
}) => {
  // TODO: publish loading state

  const result = await step.run("manual-trigger", async () => context)

  // TODO: publish completed state

  return result
}
