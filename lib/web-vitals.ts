import { getCLS, getFID, getFCP, getLCP, getTTFB, type Metric } from "web-vitals"

// Web Vitals tracking for Core Web Vitals optimization
export function trackWebVitals() {
  function sendToAnalytics(metric: Metric) {
    // Send to your analytics service
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", metric.name, {
        event_category: "Web Vitals",
        event_label: metric.id,
        value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
        non_interaction: true,
      })
    }

    // Also send to console in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric)
    }
  }

  // Track all Core Web Vitals
  getCLS(sendToAnalytics)
  getFID(sendToAnalytics)
  getFCP(sendToAnalytics)
  getLCP(sendToAnalytics)
  getTTFB(sendToAnalytics)
}

// Performance monitoring utilities
export function measurePerformance(name: string, fn: () => void | Promise<void>) {
  return async () => {
    const start = performance.now()

    try {
      await fn()
    } finally {
      const end = performance.now()
      const duration = end - start

      if (process.env.NODE_ENV === "development") {
        console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`)
      }

      // Send to analytics
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "timing_complete", {
          name: name,
          value: Math.round(duration),
        })
      }
    }
  }
}

// Resource loading optimization
export function preloadResource(href: string, as: string, type?: string) {
  if (typeof document !== "undefined") {
    const link = document.createElement("link")
    link.rel = "preload"
    link.href = href
    link.as = as
    if (type) link.type = type
    document.head.appendChild(link)
  }
}

export function prefetchResource(href: string) {
  if (typeof document !== "undefined") {
    const link = document.createElement("link")
    link.rel = "prefetch"
    link.href = href
    document.head.appendChild(link)
  }
}

// Critical resource hints
export function addResourceHints() {
  if (typeof document !== "undefined") {
    // Preconnect to external domains
    const preconnectDomains = [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
      "https://www.google-analytics.com",
    ]

    preconnectDomains.forEach((domain) => {
      const link = document.createElement("link")
      link.rel = "preconnect"
      link.href = domain
      if (domain.includes("gstatic")) {
        link.crossOrigin = "anonymous"
      }
      document.head.appendChild(link)
    })
  }
}
