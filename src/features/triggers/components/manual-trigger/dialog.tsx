"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ManualTriggerDialog({ open, onOpenChange }: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger>Edit</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manual Trigger</DialogTitle>
          <DialogDescription>
            Configure settings for Manual Trigger node.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Manual Trigger does not have settings to configure.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
