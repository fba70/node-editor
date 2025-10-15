"use client"

// import { requireAuth } from "@/lib/auth-utils"
// import { caller } from "@/trpc/server"
import { SignOutButton } from "@/features/auth/components/sign-out-button"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function Home() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const { data } = useQuery(trpc.getWorkflows.queryOptions())
  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())
        toast.success("Workflow creation started")
      },
    })
  )

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">Welcome to the App</h1>
      <Button
        onClick={() => create.mutate()}
        variant="outline"
        disabled={create.isPending}
      >
        Create Workflow
      </Button>
      <div className="w-[70%] text-center">{JSON.stringify(data, null, 2)}</div>
      <SignOutButton />
    </div>
  )
}
