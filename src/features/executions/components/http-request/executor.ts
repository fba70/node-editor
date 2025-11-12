import type { NodeExecutor } from "@/features/executions/types"
import { NonRetriableError } from "inngest"
import ky, { type Options as KyOptions } from "ky"
import Handlebars from "handlebars"
import { httpRequestChannel } from "@/inngest/channels/http-request"

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2)
  const safeString = new Handlebars.SafeString(jsonString)
  return safeString
})

type HttpRequestData = {
  variableName?: string
  endpoint?: string
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  body?: string
}

export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async ({
  nodeId,
  data,
  context,
  step,
  publish,
}) => {
  await publish(
    httpRequestChannel().status({
      nodeId,
      status: "loading",
    })
  )

  if (!data.variableName) {
    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "error",
      })
    )
    throw new NonRetriableError("No variable name provided for HTTP request")
  }

  if (!data.endpoint) {
    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "error",
      })
    )
    throw new NonRetriableError("No endpoint provided for HTTP request")
  }

  if (!data.method) {
    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "error",
      })
    )
    throw new NonRetriableError("No method provided for HTTP request")
  }

  try {
    const result = await step.run("http-request", async () => {
      const method = data.method || "GET"
      const endpoint = Handlebars.compile(data.endpoint!)(context) // Add context from previous nodes to the template
      // console.log("HTTP Request to:", endpoint)
      const options: KyOptions = {
        method,
      }

      if (["POST", "PUT", "PATCH"].includes(method) && data.body) {
        const resolved = Handlebars.compile(data.body || "{}")(context)
        JSON.parse(resolved)
        options.body = resolved
        options.headers = {
          "Content-Type": "application/json",
        }
      }

      const response = await ky(endpoint, options)
      const contentType = response.headers.get("content-type") || ""
      const isJson = contentType.includes("application/json")
      const responseData = isJson
        ? await response.json()
        : await response.text()

      const responsePayload = {
        httpResponse: {
          status: response.status,
          statusText: response.statusText,
          data: responseData,
        },
      }

      return {
        ...context,
        [data.variableName!]: responsePayload,
      }
    })

    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "success",
      })
    )

    return result
  } catch (error) {
    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "error",
      })
    )
    throw error
  }
}
