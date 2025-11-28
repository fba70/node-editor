import { type NextRequest, NextResponse } from "next/server"
import { sendWorkflowExecution } from "@/inngest/utils"

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const workflowId = url.searchParams.get("workflowId")

    if (!workflowId) {
      return NextResponse.json(
        { success: false, error: "Missing workflowId parameter." },
        { status: 400 }
      )
    }

    const requestBody = await request.json()

    const formData = {
      formId: requestBody.formId,
      formTitle: requestBody.formTitle,
      responseId: requestBody.responseId,
      timestamp: requestBody.timestamp,
      respondentEmail: requestBody.respondentEmail,
      responses: requestBody.responses,
      raw: requestBody,
    }

    // Trigger Inggest job
    await sendWorkflowExecution({
      workflowId,
      initialData: {
        googleForm: formData,
      },
    })
  } catch (error) {
    console.error("Error in Google Form workflow trigger:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error in Google Form workflow trigger.",
      },
      { status: 500 }
    )
  }
  return NextResponse.json({ status: "Google Form workflow trigger received." })
}
