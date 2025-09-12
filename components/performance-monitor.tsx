"use client"

import { useEffect } from "react"
import { trackWebVitals, addResourceHints } from "@/lib/web-vitals"

export function PerformanceMonitor() {
  useEffect(() => {
    // Track Core Web Vitals
    trackWebVitals()

    // Add resource hints for better loading performance
    addResourceHints()

    // Preload critical resources
    const criticalResources = ["/fonts/geist-sans.woff2", "/images/hero-bg.webp"]

    criticalResources.forEach((resource) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.href = resource
      link.as = resource.includes(".woff") ? "font" : "image"
      if (resource.includes(".woff")) {
        link.type = "font/woff2"
        link.crossOrigin = "anonymous"
      }
      document.head.appendChild(link)
    })
  }, [])

  return null
}
