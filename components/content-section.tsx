import type { ReactNode } from "react"
import { SEOHeading } from "./seo-optimized-heading"
import { cn } from "@/lib/utils"

interface ContentSectionProps {
  title?: string
  children: ReactNode
  className?: string
  headingLevel?: 2 | 3 | 4 | 5 | 6
  id?: string
  schema?: "Article" | "Section" | "WebPageElement"
}

export function ContentSection({
  title,
  children,
  className = "",
  headingLevel = 2,
  id,
  schema = "Section",
}: ContentSectionProps) {
  const sectionId =
    id ||
    (title
      ? title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
      : undefined)

  return (
    <section id={sectionId} className={cn("space-y-6", className)} itemScope itemType={`https://schema.org/${schema}`}>
      {title && (
        <SEOHeading level={headingLevel} itemProp="name">
          {title}
        </SEOHeading>
      )}
      <div itemProp="text" className="prose prose-slate max-w-none dark:prose-invert">
        {children}
      </div>
    </section>
  )
}
