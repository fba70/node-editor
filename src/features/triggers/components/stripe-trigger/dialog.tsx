"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { toast } from "sonner"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StripeTriggerDialog({ open, onOpenChange }: DialogProps) {
  const params = useParams()
  const workflowId = params.workflowId as string

  // Webhook URL
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const webhookUrl = `${baseUrl}/api/webhooks/stripe?workflowId=${workflowId}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(webhookUrl)
      toast.success("Webhook URL copied to clipboard")
    } catch (err) {
      toast.error("Failed to copy Webhook URL to clipboard")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger>Edit</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Stripe Trigger</DialogTitle>
          <DialogDescription>
            Use this webhook URL in your Stripe Dashboard to trigger this
            workflow when a Stripe payment event occurs.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <div className="flex gap-2">
              <Input
                id="webhook-url"
                value={webhookUrl}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                onClick={copyToClipboard}
                type="button"
                size="icon"
                variant="outline"
              >
                <CopyIcon size={4} />
              </Button>
            </div>
          </div>
          <div className="rounded-lg bg-muted p-4 space-y-2">
            <h4 className="fornt-medium text-sm">Setup instructions:</h4>
            <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
              <li>Open your Stripe Dashboard</li>
              <li>Go to Developers - Webhooks</li>
              <li>Click Add endpoint</li>
              <li>Paste your webhook URL from above</li>
              <li>
                Specify which events to listen to e.g. payment_intent.succeeded
              </li>
              <li>Save and copy signing secret.</li>
            </ol>
          </div>

          <div className="rounded-lg bg-muted p-4 space-y-2">
            <h4 className="fornt-medium text-sm">
              Available variables examples:
            </h4>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>
                <code className="bg-background px-1 py-0.5 rounded">
                  {"{{stripe.amount}}"}
                </code>{" "}
                - payment amount
              </li>
              <li>
                <code className="bg-background px-1 py-0.5 rounded">
                  {"{{stripe.currency}}"}
                </code>{" "}
                - payment currency
              </li>
              <li>
                <code className="bg-background px-1 py-0.5 rounded">
                  {"{{stripe.customerId}}"}
                </code>{" "}
                - customer ID
              </li>
              <li>
                <code className="bg-background px-1 py-0.5 rounded">
                  {"{{json stripe}}"}
                </code>{" "}
                - full event as JSON
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
