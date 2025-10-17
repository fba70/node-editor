import {
  WorkflowsList,
  WorkflowsContainer,
} from "@/features/workflows/components/workflows"
import { requireAuth } from "@/lib/auth-utils"
import { prefetchWorkflows } from "@/features/workflows/server/prefetch"
import { HydrateClient } from "@/trpc/server"
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react"
import type { SearchParams } from "nuqs/server"
import { workflowsParamsLoader } from "@/features/workflows/server/params-loader"

type Props = {
  searchParams: Promise<SearchParams>
}

const WorkflowPage = async ({ searchParams }: Props) => {
  await requireAuth()

  const params = await workflowsParamsLoader(searchParams)
  prefetchWorkflows(params)

  return (
    <>
      <WorkflowsContainer>
        <HydrateClient>
          <ErrorBoundary fallback={<p>Error. Something went wrong!</p>}>
            <Suspense fallback={<p>Loading...</p>}>
              <WorkflowsList />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>
      </WorkflowsContainer>
    </>
  )
}

export default WorkflowPage
