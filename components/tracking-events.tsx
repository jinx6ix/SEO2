"use client"

import { useEffect } from "react"

// SEO-focused event tracking
export function trackSEOEvent(eventName: string, parameters: Record<string, any> = {}) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      event_category: "SEO",
      event_label: parameters.label || "",
      value: parameters.value || 0,
      custom_parameter_seo_action: eventName,
      ...parameters,
    })
  }
}

// Track user engagement for SEO signals
export function trackEngagement(action: string, element?: string, value?: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "engagement", {
      event_category: "User Engagement",
      event_label: element || "",
      action: action,
      value: value || 1,
      non_interaction: false,
    })
  }
}

// Track scroll depth for content engagement
export function useScrollTracking() {
  useEffect(() => {
    let maxScroll = 0
    const scrollMilestones = [25, 50, 75, 90, 100]
    const trackedMilestones = new Set<number>()

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent

        scrollMilestones.forEach((milestone) => {
          if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
            trackedMilestones.add(milestone)
            trackEngagement("scroll_depth", `${milestone}%`, milestone)
          }
        })
      }
    }

    const throttledScroll = throttle(handleScroll, 500)
    window.addEventListener("scroll", throttledScroll)

    return () => window.removeEventListener("scroll", throttledScroll)
  }, [])
}

// Track time on page for dwell time signals
export function useTimeOnPage() {
  useEffect(() => {
    const startTime = Date.now()
    const timeIntervals = [30, 60, 120, 300, 600] // seconds
    const trackedIntervals = new Set<number>()

    const trackTimeInterval = () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)

      timeIntervals.forEach((interval) => {
        if (timeSpent >= interval && !trackedIntervals.has(interval)) {
          trackedIntervals.add(interval)
          trackEngagement("time_on_page", `${interval}s`, interval)
        }
      })
    }

    const intervalId = setInterval(trackTimeInterval, 10000) // Check every 10 seconds

    // Track on page unload
    const handleBeforeUnload = () => {
      const totalTime = Math.floor((Date.now() - startTime) / 1000)
      trackEngagement("session_duration", "page_exit", totalTime)
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])
}

// Utility function for throttling
function throttle(func: Function, limit: number) {
  let inThrottle: boolean
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Track CTA clicks for conversion optimization
export function trackCTAClick(ctaName: string, location: string) {
  trackSEOEvent("cta_click", {
    label: ctaName,
    location: location,
    event_category: "Conversion",
  })
}

// Track search functionality
export function trackSearch(query: string, results: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "search", {
      search_term: query,
      event_category: "Site Search",
      custom_parameter_results_count: results,
    })
  }
}

// Track form interactions
export function trackFormEvent(formName: string, action: "start" | "complete" | "abandon", field?: string) {
  trackSEOEvent(`form_${action}`, {
    label: formName,
    field: field,
    event_category: "Form Interaction",
  })
}
