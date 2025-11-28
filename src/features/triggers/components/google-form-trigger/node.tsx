import { NodeProps } from "@xyflow/react"
import { memo, useState } from "react"
import { BaseTriggerNode } from "../base-trigger-node"
import { GoogleFormTriggerDialog } from "./dialog"
import { fetchGoogleFormTriggerRealtimeToken } from "./actions"
import { useNodeStatus } from "@/features/executions/hooks/use-node-status"
import { GOOGLE_FORM_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/google-form-trigger"

export const GoogleFormTriggerNode = memo((props: NodeProps) => {
  const [open, setOpen] = useState(false)

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: GOOGLE_FORM_TRIGGER_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchGoogleFormTriggerRealtimeToken,
  })

  const handleOpenSettings = () => setOpen(true)

  return (
    <>
      <GoogleFormTriggerDialog open={open} onOpenChange={setOpen} />
      <BaseTriggerNode
        {...props}
        // id={props.id}
        icon="/googleform.svg"
        name="Google Form trigger"
        description="Starts the workflow with a Google Form submission"
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  )
})

GoogleFormTriggerNode.displayName = "GoogleFormTriggerNode"
