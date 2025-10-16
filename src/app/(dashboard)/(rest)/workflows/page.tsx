import {
  WorkflowsList,
  WorkflowsContainer,
} from "@/features/workflows/components/workflows"
import { requireAuth } from "@/lib/auth-utils"
import { prefetchWorkflows } from "@/features/workflows/server/prefetch"
import { HydrateClient } from "@/trpc/server"
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react"

const WorkflowPage = async () => {
  await requireAuth()

  prefetchWorkflows()

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
