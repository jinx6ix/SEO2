import Head from "next/head"

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article" | "product"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  noindex?: boolean
}

export function SEOHead({
  title,
  description,
  keywords = [],
  image = "/og-image.jpg",
  url = "/",
  type = "website",
  publishedTime,
  modifiedTime,
  authors = [],
  noindex = false,
}: SEOHeadProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seocontrol.app"
  const fullUrl = `${baseUrl}${url}`
  const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`

  const defaultTitle = "SEOControl - Professional SEO Management Platform"
  const defaultDescription =
    "Comprehensive SEO management and optimization platform for businesses. Track rankings, analyze keywords, monitor competitors, and boost your search engine visibility."

  const seoTitle = title ? `${title} | SEOControl` : defaultTitle
  const seoDescription = description || defaultDescription
  const seoKeywords = [...keywords, "SEO", "search engine optimization", "keyword tracking", "SERP analysis"].join(", ")

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content="SEOControl Team" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#164e63" />

      {/* Robots Meta */}
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      <meta name="googlebot" content={noindex ? "noindex,nofollow" : "index,follow"} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || "SEOControl"} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="SEOControl" />
      <meta property="og:locale" content="en_US" />

      {/* Article-specific Open Graph */}
      {type === "article" && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {type === "article" && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {type === "article" &&
        authors.length > 0 &&
        authors.map((author, index) => <meta key={index} property="article:author" content={author} />)}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@seocontrol" />
      <meta name="twitter:creator" content="@seocontrol" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title || "SEOControl"} />

      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="format-detection" content="address=no" />
      <meta name="format-detection" content="email=no" />

      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />

      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  )
}
