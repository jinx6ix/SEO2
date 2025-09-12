"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackSEOEvent, useScrollTracking, useTimeOnPage } from "./tracking-events"

interface SEOTrackingProps {
  pageType?: "landing" | "article" | "product" | "category" | "other"
  contentId?: string
  keywords?: string[]
}

export function SEOTracking({ pageType = "other", contentId, keywords = [] }: SEOTrackingProps) {
  const pathname = usePathname()

  // Enable scroll and time tracking
  useScrollTracking()
  useTimeOnPage()

  useEffect(() => {
    // Track page view with SEO context
    trackSEOEvent("page_view", {
      page_type: pageType,
      content_id: contentId,
      page_path: pathname,
      keywords: keywords.join(","),
      event_category: "Page View",
    })

    // Track page load performance
    if (typeof window !== "undefined" && "performance" in window) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming

          if (navigation) {
            const loadTime = navigation.loadEventEnd - navigation.loadEventStart
            const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
            const firstPaint = performance.getEntriesByName("first-paint")[0]?.startTime || 0
            const firstContentfulPaint = performance.getEntriesByName("first-contentful-paint")[0]?.startTime || 0

            trackSEOEvent("page_performance", {
              load_time: Math.round(loadTime),
              dom_content_loaded: Math.round(domContentLoaded),
              first_paint: Math.round(firstPaint),
              first_contentful_paint: Math.round(firstContentfulPaint),
              event_category: "Performance",
            })
          }
        }, 0)
      })
    }

    // Track Core Web Vitals
    if (typeof window !== "undefined") {
      import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS((metric) => {
          trackSEOEvent("core_web_vital", {
            metric_name: "CLS",
            metric_value: Math.round(metric.value * 1000),
            metric_rating: metric.rating,
            event_category: "Core Web Vitals",
          })
        })

        getFID((metric) => {
          trackSEOEvent("core_web_vital", {
            metric_name: "FID",
            metric_value: Math.round(metric.value),
            metric_rating: metric.rating,
            event_category: "Core Web Vitals",
          })
        })

        getFCP((metric) => {
          trackSEOEvent("core_web_vital", {
            metric_name: "FCP",
            metric_value: Math.round(metric.value),
            metric_rating: metric.rating,
            event_category: "Core Web Vitals",
          })
        })

        getLCP((metric) => {
          trackSEOEvent("core_web_vital", {
            metric_name: "LCP",
            metric_value: Math.round(metric.value),
            metric_rating: metric.rating,
            event_category: "Core Web Vitals",
          })
        })

        getTTFB((metric) => {
          trackSEOEvent("core_web_vital", {
            metric_name: "TTFB",
            metric_value: Math.round(metric.value),
            metric_rating: metric.rating,
            event_category: "Core Web Vitals",
          })
        })
      })
    }
  }, [pathname, pageType, contentId, keywords])

  return null
}
