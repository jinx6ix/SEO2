interface StructuredDataProps {
  data: Record<string, any>
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}

// Common structured data schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SEOControl",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://seocontrol.app",
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://seocontrol.app"}/logo.png`,
  description: "Professional SEO management and optimization platform",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-555-SEO-CTRL",
    contactType: "customer service",
    availableLanguage: "English",
  },
  sameAs: ["https://twitter.com/seocontrol", "https://linkedin.com/company/seocontrol"],
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SEOControl",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://seocontrol.app",
  description: "Professional SEO management and optimization platform",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "https://seocontrol.app"}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SEOControl",
  description: "Professional SEO management and optimization platform for businesses",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://seocontrol.app",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "29.99",
    priceCurrency: "USD",
    priceValidUntil: "2025-12-31",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "150",
    bestRating: "5",
    worstRating: "1",
  },
}
