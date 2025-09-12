export function generateMetaDescription(content: string, maxLength = 160): string {
  // Remove HTML tags and extra whitespace
  const cleanContent = content
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()

  if (cleanContent.length <= maxLength) {
    return cleanContent
  }

  // Find the last complete sentence within the limit
  const truncated = cleanContent.substring(0, maxLength)
  const lastSentence = truncated.lastIndexOf(".")
  const lastSpace = truncated.lastIndexOf(" ")

  if (lastSentence > maxLength * 0.7) {
    return cleanContent.substring(0, lastSentence + 1)
  } else if (lastSpace > maxLength * 0.8) {
    return cleanContent.substring(0, lastSpace) + "..."
  } else {
    return truncated + "..."
  }
}

export function extractKeywords(content: string, maxKeywords = 10): string[] {
  // Simple keyword extraction (in production, use more sophisticated NLP)
  const words = content
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3)

  const wordCount = words.reduce(
    (acc, word) => {
      acc[word] = (acc[word] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxKeywords)
    .map(([word]) => word)
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export function validateSEOContent(content: {
  title?: string
  description?: string
  content?: string
  keywords?: string[]
}): {
  isValid: boolean
  issues: string[]
  suggestions: string[]
} {
  const issues: string[] = []
  const suggestions: string[] = []

  // Title validation
  if (!content.title) {
    issues.push("Missing title")
  } else {
    if (content.title.length < 30) {
      suggestions.push("Title could be longer (30-60 characters recommended)")
    }
    if (content.title.length > 60) {
      issues.push("Title too long (over 60 characters)")
    }
  }

  // Description validation
  if (!content.description) {
    issues.push("Missing meta description")
  } else {
    if (content.description.length < 120) {
      suggestions.push("Meta description could be longer (120-160 characters recommended)")
    }
    if (content.description.length > 160) {
      issues.push("Meta description too long (over 160 characters)")
    }
  }

  // Content validation
  if (content.content) {
    const wordCount = content.content.trim().split(/\s+/).length
    if (wordCount < 300) {
      suggestions.push("Content could be longer (300+ words recommended for SEO)")
    }

    // Check for headings
    const hasH1 = /<h1[^>]*>/i.test(content.content)
    const hasH2 = /<h2[^>]*>/i.test(content.content)

    if (!hasH1) {
      issues.push("Missing H1 heading")
    }
    if (!hasH2) {
      suggestions.push("Consider adding H2 headings for better structure")
    }
  }

  // Keywords validation
  if (!content.keywords || content.keywords.length === 0) {
    suggestions.push("Consider adding target keywords")
  } else if (content.keywords.length > 10) {
    suggestions.push("Too many keywords - focus on 5-10 primary keywords")
  }

  return {
    isValid: issues.length === 0,
    issues,
    suggestions,
  }
}
