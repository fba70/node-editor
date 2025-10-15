import { inngest } from "./client"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { createOpenAI } from "@ai-sdk/openai"
// import { createAnthropic } from "@ai-sdk/anthropic"
import { generateText } from "ai"

const google = createGoogleGenerativeAI()
const openai = createOpenAI()
// const anthropic = createAnthropic()

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    console.log(event)

    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        system:
          "You are a helpful assistant that helps people find information.",
        prompt: "Write best business idea for the startup in 15 words.",
        model: google("gemini-2.5-flash"),
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    )

    const { steps: openaiSteps } = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        system:
          "You are a helpful assistant that helps people find information.",
        prompt: "Write best business idea for the startup in 15 words.",
        model: openai("gpt-4"),
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    )

    /*
    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        system:
          "You are a helpful assistant that helps people find information.",
        prompt: "Write best business idea for the startup in 15 words.",
        model: anthropic("claude-3-5-sonnet-20240620"),
      }
    )
    */

    return { geminiSteps, openaiSteps }
  }
)
