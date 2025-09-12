import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { StructuredData } from "./structured-data"

interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const allItems = [{ name: "Home", href: "/" }, ...items]

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://seocontrol.app"}${item.href}`,
    })),
  }

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center space-x-2 text-sm text-muted-foreground ${className}`}
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {allItems.map((item, index) => (
          <div key={item.href} className="flex items-center space-x-2">
            {index > 0 && <ChevronRight className="h-4 w-4" />}
            <div itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <meta itemProp="position" content={String(index + 1)} />
              {index === allItems.length - 1 ? (
                <span className="font-medium text-foreground" itemProp="name" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-foreground transition-colors" itemProp="item">
                  <span itemProp="name">
                    {index === 0 ? (
                      <span className="flex items-center gap-1">
                        <Home className="h-4 w-4" />
                        {item.name}
                      </span>
                    ) : (
                      item.name
                    )}
                  </span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </nav>
    </>
  )
}
