"use client"

import {
  EntityHeader,
  EntityContainer,
  EntitySearch,
  EntityPagination,
  LoadingView,
  ErrorView,
  EmptyView,
  EntityList,
  EntityItem,
} from "@/components/entity-components"
import {
  useCreateWorkflow,
  useSuspenseWorkflows,
  useRemoveWorkflow,
} from "@/features/workflows/hooks/use-workflows"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal"
import { useRouter } from "next/navigation"
import { useWorkflowsParams } from "../hooks/use-workflows-params"
import { useEntitySearch } from "@/hooks/use-entity-search"
import type { Workflow as WorkflowType } from "@/generated/prisma"
import { WorkflowIcon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export const WorkflowsSearch = () => {
  const [params, setParams] = useWorkflowsParams()
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  })

  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search workflows"
    />
  )
}

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows()

  if (workflows.data.items.length === 0) {
    return <WorkflowsEmpty />
  }

  return (
    <EntityList
      items={workflows.data.items}
      getKey={(workflow) => workflow.id}
      renderItem={(item) => <WorkflowItem data={item} />}
      emptyView={<WorkflowsEmpty />}
      className={"w-full"}
    />
  )
}

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const createWorkflow = useCreateWorkflow()
  const { modal, onError } = useUpgradeModal()
  const router = useRouter()

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`)
      },
      onError: (error) => {
        onError(error)
      },
    })
  }

  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Manage your workflows"
        onNew={handleCreate}
        disabled={disabled}
        isCreating={createWorkflow.isPending}
        newButtonLabel="New Workflow"
      />
    </>
  )
}

export const WorkflowsPagination = () => {
  const workflows = useSuspenseWorkflows()
  const [params, setParams] = useWorkflowsParams()

  return (
    <EntityPagination
      page={workflows.data.page}
      totalPages={workflows.data.totalPages}
      onPageChange={(page) => setParams({ ...params, page })}
      disabled={workflows.isFetching}
    />
  )
}

export const WorkflowsContainer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowsSearch />}
      pagination={<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  )
}

export const WorkflowsLoading = () => {
  return <LoadingView message="Loading workflows..." />
}

export const WorkflowsError = () => {
  return <ErrorView message="Error loading workflows..." />
}

export const WorkflowsEmpty = () => {
  const createWorkflow = useCreateWorkflow()
  const { modal, onError } = useUpgradeModal()
  const router = useRouter()

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onError: (error) => {
        onError(error)
      },
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`)
      },
    })
  }

  return (
    <>
      {modal}
      <EmptyView
        message="No workflows found! Create new workflow!"
        onNew={handleCreate}
      />
    </>
  )
}

export const WorkflowItem = ({ data }: { data: WorkflowType }) => {
  const removeWorkflow = useRemoveWorkflow()

  const handleRemove = () => {
    removeWorkflow.mutate({ id: data.id })
  }

  return (
    <EntityItem
      href={`/workflows/${data.id}`}
      title={data.name}
      subtitle={
        <div>
          Updated {formatDistanceToNow(data.updatedAt, { addSuffix: true })}{" "}
          {""} &bull; Created{" "}
          {formatDistanceToNow(data.createdAt, { addSuffix: true })}
        </div>
      }
      image={
        <div className="size-8 flex items-center justify-center">
          <WorkflowIcon className="size-6 text-muted-foreground" />
        </div>
      }
      onRemove={handleRemove}
      isRemoving={removeWorkflow.isPending}
      className="w-full"
    />
  )
}
