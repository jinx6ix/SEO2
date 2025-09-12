import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import type { JSX } from "react/jsx-runtime" // Import JSX to declare the variable

interface SEOHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: ReactNode
  className?: string
  id?: string
  keywords?: string[]
}

export function SEOHeading({ level, children, className = "", id, keywords = [] }: SEOHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  // Generate ID from text content if not provided
  const headingId =
    id ||
    (typeof children === "string"
      ? children
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
      : undefined)

  const baseStyles = {
    1: "text-4xl md:text-5xl font-bold tracking-tight text-balance",
    2: "text-3xl md:text-4xl font-bold tracking-tight text-balance",
    3: "text-2xl md:text-3xl font-semibold tracking-tight",
    4: "text-xl md:text-2xl font-semibold",
    5: "text-lg md:text-xl font-medium",
    6: "text-base md:text-lg font-medium",
  }

  return (
    <Tag id={headingId} className={cn(baseStyles[level], className)} itemProp={level === 1 ? "headline" : undefined}>
      {children}
    </Tag>
  )
}
