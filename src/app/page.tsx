import { requireAuth } from "@/lib/auth-utils"
import { caller } from "@/trpc/server"

export default async function Home() {
  await requireAuth()

  const data = await caller.getUsers()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">Welcome to the App</h1>
      <div className="w-[70%] text-center">{JSON.stringify(data, null, 2)}</div>
    </div>
  )
}
