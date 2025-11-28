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

    const stripeData = {
      eventId: requestBody.id,
      eventType: requestBody.type,
      timeStamp: requestBody.created,
      livemode: requestBody.livemode,
      raw: requestBody.data?.object,
    }

    // Trigger Inggest job
    await sendWorkflowExecution({
      workflowId,
      initialData: {
        stripe: stripeData,
      },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error in Stripe workflow trigger:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error in Stripe workflow trigger.",
      },
      { status: 500 }
    )
  }
  return NextResponse.json({ status: "Stripe workflow trigger received." })
}
