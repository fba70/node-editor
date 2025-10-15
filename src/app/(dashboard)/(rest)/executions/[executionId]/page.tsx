import { requireAuth } from "@/lib/auth-utils"

interface PageProps {
  params: Promise<{ executionId: string }>
}

const ExecutionPage = async ({ params }: PageProps) => {
  await requireAuth()

  const { executionId } = await params

  return <p>Execution ID - {executionId}</p>
}

export default ExecutionPage
