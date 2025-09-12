import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "@/components/image-optimizer"
import { SEOHeading } from "./seo-optimized-heading"

interface RelatedItem {
  title: string
  description: string
  href: string
  image?: string
  category?: string
  readingTime?: number
}

interface RelatedContentProps {
  items: RelatedItem[]
  title?: string
  className?: string
}

export function RelatedContent({ items, title = "Related Articles", className = "" }: RelatedContentProps) {
  if (items.length === 0) return null

  return (
    <section className={`space-y-6 ${className}`} itemScope itemType="https://schema.org/ItemList">
      <SEOHeading level={2} itemProp="name">
        {title}
      </SEOHeading>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Card
            key={item.href}
            className="group hover:shadow-lg transition-shadow"
            itemScope
            itemType="https://schema.org/Article"
            itemProp="itemListElement"
          >
            <Link href={item.href} className="block">
              {item.image && (
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <OptimizedImage
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={225}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <CardHeader className="pb-2">
                {item.category && (
                  <Badge variant="secondary" className="w-fit mb-2">
                    {item.category}
                  </Badge>
                )}
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors" itemProp="headline">
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription className="line-clamp-3" itemProp="description">
                  {item.description}
                </CardDescription>

                {item.readingTime && (
                  <div className="mt-3 text-xs text-muted-foreground">{item.readingTime} min read</div>
                )}
              </CardContent>
            </Link>

            {/* Hidden schema properties */}
            <div className="hidden">
              <span itemProp="url">{item.href}</span>
              <span itemProp="position">{index + 1}</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
