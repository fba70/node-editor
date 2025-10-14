import { getQueryClient, trpc } from "@/trpc/server"
import { Client } from "@/app/client"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"

export default async function Home() {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions())

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
          <Client />
        </Suspense>
      </HydrationBoundary>
    </div>
  )
}
