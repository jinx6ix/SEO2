import type { ReactNode } from "react"
import { Calendar, User, Clock, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { StructuredData } from "./structured-data"
import { SEOHeading } from "./seo-optimized-heading"
import { generateArticleSchema } from "@/lib/schema-generators"

interface ArticleContentProps {
  title: string
  description: string
  content: ReactNode
  author: string
  publishedDate: string
  modifiedDate?: string
  readingTime?: number
  tags?: string[]
  image?: string
  url: string
  className?: string
}

export function ArticleContent({
  title,
  description,
  content,
  author,
  publishedDate,
  modifiedDate,
  readingTime,
  tags = [],
  image = "/og-image.jpg",
  url,
  className = "",
}: ArticleContentProps) {
  const articleSchema = generateArticleSchema({
    headline: title,
    description,
    image,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author,
    url,
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <article className={`max-w-4xl mx-auto space-y-8 ${className}`} itemScope itemType="https://schema.org/Article">
      <StructuredData data={articleSchema} />

      {/* Article Header */}
      <header className="space-y-6">
        <SEOHeading level={1} itemProp="headline">
          {title}
        </SEOHeading>

        <p className="text-xl text-muted-foreground text-pretty" itemProp="description">
          {description}
        </p>

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2" itemScope itemType="https://schema.org/Person">
            <User className="h-4 w-4" />
            <span>
              By <span itemProp="name">{author}</span>
            </span>
          </div>

          <Separator orientation="vertical" className="h-4" />

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={publishedDate} itemProp="datePublished">
              {formatDate(publishedDate)}
            </time>
          </div>

          {modifiedDate && (
            <>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2">
                <span>Updated:</span>
                <time dateTime={modifiedDate} itemProp="dateModified">
                  {formatDate(modifiedDate)}
                </time>
              </div>
            </>
          )}

          {readingTime && (
            <>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
            </>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" itemProp="keywords">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <Separator />

      {/* Article Content */}
      <div
        className="prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-mt-20"
        itemProp="articleBody"
      >
        {content}
      </div>

      {/* Hidden schema properties */}
      <div className="hidden">
        <span itemProp="publisher" itemScope itemType="https://schema.org/Organization">
          <span itemProp="name">SEOControl</span>
          <span itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
            <span itemProp="url">{process.env.NEXT_PUBLIC_SITE_URL}/logo.png</span>
          </span>
        </span>
        <span itemProp="mainEntityOfPage" itemScope itemType="https://schema.org/WebPage">
          <span itemProp="@id">{url}</span>
        </span>
      </div>
    </article>
  )
}
