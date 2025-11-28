import { NodeProps } from "@xyflow/react"
import { memo, useState } from "react"
import { BaseTriggerNode } from "../base-trigger-node"
import { StripeTriggerDialog } from "./dialog"
import { fetchStripeTriggerRealtimeToken } from "./actions"
import { useNodeStatus } from "@/features/executions/hooks/use-node-status"
import { STRIPE_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/stripe-trigger"

export const StripeTriggerNode = memo((props: NodeProps) => {
  const [open, setOpen] = useState(false)

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: STRIPE_TRIGGER_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchStripeTriggerRealtimeToken,
  })

  const handleOpenSettings = () => setOpen(true)

  return (
    <>
      <StripeTriggerDialog open={open} onOpenChange={setOpen} />
      <BaseTriggerNode
        {...props}
        // id={props.id}
        icon="/stripe.svg"
        name="Stripe trigger"
        description="Starts the workflow with a Stripe event"
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  )
})

StripeTriggerNode.displayName = "StripeTriggerNode"
