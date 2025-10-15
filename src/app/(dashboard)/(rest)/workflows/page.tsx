import { requireAuth } from "@/lib/auth-utils"

const WorkflowPage = async () => {
  await requireAuth()

  return <p>Workflow page</p>
}

export default WorkflowPage
