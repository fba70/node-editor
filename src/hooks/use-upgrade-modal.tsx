import { TRPCClientError } from "@trpc/client"
import { useState } from "react"
import { UpgradeModal } from "@/components/upgrade-modal"

export const useUpgradeModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const onError = (error: unknown) => {
    if (error instanceof TRPCClientError) {
      if (error.data?.code === "FORBIDDEN") {
        setIsOpen(true)
        return true
      }
    }
    throw false
  }

  const modal = <UpgradeModal open={isOpen} onOpenChange={setIsOpen} />

  return {
    modal,
    onError,
  }
}
