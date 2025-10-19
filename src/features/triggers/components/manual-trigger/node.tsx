import { NodeProps } from "@xyflow/react"
import { memo, useState } from "react"
import { BaseTriggerNode } from "../base-trigger-node"
import { MousePointerIcon } from "lucide-react"
import { ManualTriggerDialog } from "./dialog"

export const ManualTriggerNode = memo((props: NodeProps) => {
  const [open, setOpen] = useState(false)
  const nodeStatus = "initial" // TODO: derive from workflow run state

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
