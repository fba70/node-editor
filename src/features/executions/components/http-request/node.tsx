"use client"

import { type NodeProps, type Node, useReactFlow } from "@xyflow/react"
import { GlobeIcon } from "lucide-react"
import { memo, useState } from "react"
import { BaseExecutionNode } from "@/features/executions/components/base-execution-node"
import { HttpRequestDialog } from "./dialog"

type HttpRequestNodeData = {
  endpoint?: string
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  body?: string
  [key: string]: unknown
}

type HttpRequestNodeType = Node<HttpRequestNodeData>

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const [open, setOpen] = useState(false)
  const { setNodes } = useReactFlow()

  const nodeStatus = "initial" // TODO: derive from workflow run state

  const handleOpenSettings = () => setOpen(true)

  const handleSubmit = (values: {
    endpoint: string
    method: string
    body?: string
  }) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              endpoint: values.endpoint,
              method: values.method,
              body: values.body,
            },
          }
        }
        return node
      })
    )
  }

  const nodeData = props.data
  const description = nodeData?.endpoint
    ? `${nodeData.method || "GET"}: ${nodeData.endpoint}`
    : "Not configured"

  return (
    <>
      <HttpRequestDialog
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
        defaultEndpoint={nodeData.endpoint}
        defaultMethod={nodeData.method}
        defaultBody={nodeData.body}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={GlobeIcon}
        name="HTTP Request"
        description={description}
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  )
})

HttpRequestNode.displayName = "HttpRequestNode"
