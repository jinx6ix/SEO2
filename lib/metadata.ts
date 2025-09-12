import type { Metadata } from "next"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article" | "product"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
  tags?: string[]
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  image = "/og-image.jpg",
  url = "/",
  type = "website",
  publishedTime,
  modifiedTime,
  authors = [],
  section,
  tags = [],
}: SEOProps = {}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seocontrol.app"
  const fullUrl = `${baseUrl}${url}`
  const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`

  const defaultTitle = "SEOControl - Professional SEO Management Platform"
  const defaultDescription =
    "Comprehensive SEO management and optimization platform for businesses. Track rankings, analyze keywords, monitor competitors, and boost your search engine visibility."

  const seoTitle = title ? `${title} | SEOControl` : defaultTitle
  const seoDescription = description || defaultDescription

  const metadata: Metadata = {
    title: seoTitle,
    description: seoDescription,
    keywords: [...keywords, "SEO", "search engine optimization", "keyword tracking", "SERP analysis"],
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type,
      locale: "en_US",
      url: fullUrl,
      title: seoTitle,
      description: seoDescription,
      siteName: "SEOControl",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title || "SEOControl",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [fullImageUrl],
      creator: "@seocontrol",
    },
  }

  // Add article-specific metadata
  if (type === "article") {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: "article",
      publishedTime,
      modifiedTime,
      authors: authors.length > 0 ? authors : undefined,
      section,
      tags,
    }
  }

  return metadata
}
