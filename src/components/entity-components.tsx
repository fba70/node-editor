import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  PlusIcon,
  SearchIcon,
  Loader2Icon,
  AlertTriangleIcon,
  PackageOpenIcon,
  MoreVerticalIcon,
  TrashIcon,
} from "lucide-react"
import Link from "next/link"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import React from "react"

type EntityHeaderProps = {
  title: string
  description?: string
  newButtonLabel: string
  disabled?: boolean
  isCreating?: boolean
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew?: never }
  | { onNew?: never; newButtonHref?: never }
)

export const EntityHeader = ({
  title,
  description,
  newButtonLabel,
  disabled,
  isCreating,
  onNew,
  newButtonHref,
}: EntityHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
        {description && (
          <p className="text-xs md:text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {onNew && !newButtonHref && (
        <Button disabled={disabled || isCreating} onClick={onNew} size="sm">
          <PlusIcon size={4} />
          {newButtonLabel}
        </Button>
      )}
      {!onNew && newButtonHref && (
        <Button size="sm" asChild>
          <Link href={newButtonHref} prefetch>
            <PlusIcon size={4} />
            {newButtonLabel}
          </Link>
        </Button>
      )}
    </div>
  )
}

type EntityContainerProps = {
  children: React.ReactNode
  header?: React.ReactNode
  search?: React.ReactNode
  pagination?: React.ReactNode
}

export const EntityContainer = ({
  header,
  search,
  pagination,
  children,
}: EntityContainerProps) => {
  return (
    <div className="p-4 md:px-10 md:py-6 h-full">
      <div className="mx-auto max-w-screen-xl w-full flex flex-col gap-y-8 h-full">
        {header}
        <div className="flex flex-col items-start justify-start gap-y-4 h-full">
          {search}
          {children}
        </div>
        {pagination}
      </div>
    </div>
  )
}

interface EntitySearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const EntitySearch = ({
  value,
  onChange,
  placeholder = "Search",
}: EntitySearchProps) => {
  return (
    <div className="relative ml-auto">
      <SearchIcon
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        className="max-w-[240px] bg-background shadow-none border-border pl-8"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

interface EntityPaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  disabled?: boolean
}

export const EntityPagination = ({
  page,
  totalPages,
  onPageChange,
  disabled,
}: EntityPaginationProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-2 w-full">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          disabled={disabled || page === 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
          variant="outline"
          size="sm"
        >
          Previous
        </Button>
        <Button
          disabled={disabled || page === totalPages || totalPages === 0}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          variant="outline"
          size="sm"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

interface StateViewProps {
  message?: string
}

export const LoadingView = ({ message }: StateViewProps) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center h-full gap-y-4">
      <Loader2Icon className="size-6 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{message || "Loading..."}</p>
    </div>
  )
}

export const ErrorView = ({ message }: StateViewProps) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center h-full gap-y-4">
      <AlertTriangleIcon className="size-6 text-red-500" />
      <p className="text-sm text-muted-foreground">
        {message || "Something went wrong..."}
      </p>
    </div>
  )
}

interface EmptyViewProps extends StateViewProps {
  onNew?: () => void
}

export const EmptyView = ({ message, onNew }: EmptyViewProps) => {
  return (
    <Empty className="border border-dashed bg-white">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackageOpenIcon />
        </EmptyMedia>
        <EmptyTitle>No items found</EmptyTitle>
        {!!message && <EmptyDescription>{message}</EmptyDescription>}
      </EmptyHeader>
      {!!onNew && (
        <EmptyContent>
          <Button onClick={onNew}>
            <PlusIcon size={4} />
            Add New Item
          </Button>
        </EmptyContent>
      )}
    </Empty>
  )
}

interface EntityListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  getKey?: (item: T, index: number) => string | number
  emptyView?: React.ReactNode
  className?: string
}

export function EntityList<T>({
  items,
  renderItem,
  getKey,
  emptyView,
  className,
}: EntityListProps<T>) {
  if (items.length === 0 && emptyView) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-sm mx-auto">{emptyView}</div>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  )
}

interface EntityItemProps {
  href: string
  title: string
  subtitle?: React.ReactNode
  image?: React.ReactNode
  actions?: React.ReactNode
  onRemove?: () => void | Promise<void>
  isRemoving?: boolean
  className?: string
}

export const EntityItem = ({
  href,
  title,
  subtitle,
  image,
  actions,
  onRemove,
  isRemoving,
  className,
}: EntityItemProps) => {
  const handleRemoveItem = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isRemoving) return
    if (onRemove) {
      await onRemove()
    }
  }

  return (
    <Link href={href} prefetch>
      <Card
        className={cn(
          "p-4 shadow-none hover:shadow cursor-pointer",
          isRemoving && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <CardContent className="flex flex-row items-center justify-between p-0">
          <div className="flex items-center justify-center gap-3">
            {image}
            <div className="flex flex-col gap-2">
              <CardTitle className="font-base font-medium">{title}</CardTitle>
              {!!subtitle && (
                <CardDescription className="text-xs">
                  {subtitle}
                </CardDescription>
              )}
            </div>
          </div>

          {(actions || onRemove) && (
            <div className="flex items-center gap-x-4">
              {actions}
              {onRemove && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVerticalIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenuItem onClick={handleRemoveItem}>
                      <TrashIcon className="size-4" />
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem>Cancel</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
