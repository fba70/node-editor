"use client"

import { NodeToolbar, Position } from "@xyflow/react"
import { SettingsIcon, TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

interface WorkflowNodeProps {
  children: ReactNode
  onDelete?: () => void
  onSettings?: () => void
  showToolbar?: boolean
  name?: string
  description?: string
}

export function WorkflowNode({
  children,
  onDelete,
  onSettings,
  showToolbar = true,
  name,
  description,
}: WorkflowNodeProps) {
  return (
    <>
      {showToolbar && (
        <NodeToolbar position={Position.Top}>
          <Button onClick={onSettings} size="sm" variant="ghost">
            <SettingsIcon className="size-4" />
          </Button>
          <Button onClick={onDelete} size="sm" variant="ghost">
            <TrashIcon />
          </Button>
        </NodeToolbar>
      )}
      {children}
      {name && (
        <NodeToolbar
          position={Position.Bottom}
          isVisible
          className="max-w-[200px] text-center"
        >
          <p className="font-medium">{name}</p>
          {description && (
            <p className="text-muted-foreground truncate text-sm">
              {description}
            </p>
          )}
        </NodeToolbar>
      )}
    </>
  )
}
