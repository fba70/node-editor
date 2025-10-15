import { requireAuth } from "@/lib/auth-utils"

const ExecutionsPage = async () => {
  await requireAuth()

  return <p>Executions page</p>
}

export default ExecutionsPage
