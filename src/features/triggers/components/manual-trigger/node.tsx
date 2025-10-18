import { NodeProps } from "@xyflow/react"
import { memo } from "react"
import { BaseTriggerNode } from "../base-trigger-node"
import { MousePointerIcon } from "lucide-react"

export const ManualTriggerNode = memo((props: NodeProps) => {
  return (
    <>
      <BaseTriggerNode
        {...props}
        // id={props.id}
        icon={MousePointerIcon}
        name="Manual trigger"
        description="Starts the workflow manually"
        // status={nodeStatus}
        // onSettings={handleOpenSettings}
        // onDoubleClick={handleOpenSettings}
      />
    </>
  )
})

ManualTriggerNode.displayName = "ManualTriggerNode"
