import { NodeProps } from "@xyflow/react"
import { memo, useState } from "react"
import { BaseTriggerNode } from "../base-trigger-node"
import { MousePointerIcon } from "lucide-react"
import { ManualTriggerDialog } from "./dialog"
import { MANUAL_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/manual-trigger"
import { fetchManualTriggerRealtimeToken } from "./actions"
import { useNodeStatus } from "@/features/executions/hooks/use-node-status"

export const ManualTriggerNode = memo((props: NodeProps) => {
  const [open, setOpen] = useState(false)

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: MANUAL_TRIGGER_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchManualTriggerRealtimeToken,
  })

  const handleOpenSettings = () => setOpen(true)

  return (
    <>
      <ManualTriggerDialog open={open} onOpenChange={setOpen} />
      <BaseTriggerNode
        {...props}
        // id={props.id}
        icon={MousePointerIcon}
        name="Manual trigger"
        description="Starts the workflow manually"
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  )
})

ManualTriggerNode.displayName = "ManualTriggerNode"
