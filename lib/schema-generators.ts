export function generateArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  publisher = "SEOControl",
  url,
}: {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  author: string
  publisher?: string
  url: string
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seocontrol.app"

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: headline,
    description: description,
    image: image.startsWith("http") ? image : `${baseUrl}${image}`,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: publisher,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url.startsWith("http") ? url : `${baseUrl}${url}`,
    },
  }
}

export function generateProductSchema({
  name,
  description,
  image,
  price,
  currency = "USD",
  availability = "InStock",
  brand = "SEOControl",
  sku,
  reviews = [],
}: {
  name: string
  description: string
  image: string
  price: string
  currency?: string
  availability?: string
  brand?: string
  sku?: string
  reviews?: Array<{
    author: string
    rating: number
    reviewBody: string
    datePublished: string
  }>
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seocontrol.app"

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: name,
    description: description,
    image: image.startsWith("http") ? image : `${baseUrl}${image}`,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      seller: {
        "@type": "Organization",
        name: brand,
      },
    },
  }

  if (sku) {
    schema.sku = sku
  }

  if (reviews.length > 0) {
    schema.review = reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished,
    }))

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = totalRating / reviews.length

    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: averageRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    }
  }

  return schema
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seocontrol.app"

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url.startsWith("http") ? breadcrumb.url : `${baseUrl}${breadcrumb.url}`,
    })),
  }
}

export function generateLocalBusinessSchema({
  name,
  description,
  address,
  telephone,
  email,
  openingHours,
  priceRange,
}: {
  name: string
  description: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  telephone: string
  email: string
  openingHours: string[]
  priceRange: string
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seocontrol.app"

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: name,
    description: description,
    url: baseUrl,
    telephone: telephone,
    email: email,
    priceRange: priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
    openingHoursSpecification: openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.split(" ")[0],
      opens: hours.split(" ")[1],
      closes: hours.split(" ")[2],
    })),
  }
}
