import type React from "react"
import { lazy, Suspense, type ComponentType } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface LazyComponentProps {
  fallback?: React.ReactNode
  className?: string
}

export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode,
) {
  const LazyComponent = lazy(importFunc)

  return function LazyWrapper(props: React.ComponentProps<T> & LazyComponentProps) {
    const { fallback: customFallback, className, ...componentProps } = props

    const defaultFallback = (
      <div className={`space-y-4 ${className || ""}`}>
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    )

    return (
      <Suspense fallback={customFallback || defaultFallback}>
        <LazyComponent {...componentProps} />
      </Suspense>
    )
  }
}

// Pre-built lazy components for common use cases
export const LazyChart = createLazyComponent(
  () => import("@/components/charts/performance-chart"),
  <Skeleton className="h-64 w-full" />,
)

export const LazyDataTable = createLazyComponent(
  () => import("@/components/tables/data-table"),
  <div className="space-y-2">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
  </div>,
)
