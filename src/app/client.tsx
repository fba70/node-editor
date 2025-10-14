"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"

export const Client = () => {
  const trpc = useTRPC()
  const { data: users } = useSuspenseQuery(trpc.getUsers.queryOptions())
  return (
    <div>
      <p>Client Component: {JSON.stringify(users)}</p>
    </div>
  )
}
