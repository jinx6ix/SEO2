"use client"

import { useEffect } from "react"
import { trackSEOEvent, trackCTAClick } from "./tracking-events"

// Enhanced conversion tracking for SEO
export function ConversionTracking() {
  useEffect(() => {
    // Track button clicks
    const handleButtonClick = (event: Event) => {
      const target = event.target as HTMLElement
      const button = target.closest('button, a[role="button"], .btn')

      if (button) {
        const buttonText = button.textContent?.trim() || ""
        const buttonType = button.getAttribute("data-track") || "unknown"
        const section = button.closest("section")?.id || "unknown"

        trackCTAClick(buttonText, section)

        // Special tracking for key conversion actions
        if (
          buttonText.toLowerCase().includes("sign up") ||
          buttonText.toLowerCase().includes("get started") ||
          buttonText.toLowerCase().includes("start trial")
        ) {
          trackSEOEvent("signup_intent", {
            button_text: buttonText,
            section: section,
            event_category: "Conversion Intent",
          })
        }

        if (buttonText.toLowerCase().includes("contact") || buttonText.toLowerCase().includes("demo")) {
          trackSEOEvent("contact_intent", {
            button_text: buttonText,
            section: section,
            event_category: "Lead Generation",
          })
        }
      }
    }

    // Track form submissions
    const handleFormSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement
      const formName = form.getAttribute("name") || form.id || "unknown"

      trackSEOEvent("form_submission", {
        form_name: formName,
        event_category: "Form Conversion",
      })
    }

    // Track external link clicks
    const handleLinkClick = (event: Event) => {
      const target = event.target as HTMLElement
      const link = target.closest("a") as HTMLAnchorElement

      if (link && link.href) {
        const isExternal = link.hostname !== window.location.hostname
        const isDownload =
          link.href.includes("/download") || link.download || /\.(pdf|doc|docx|xls|xlsx|zip|rar)$/i.test(link.href)

        if (isExternal) {
          trackSEOEvent("external_link_click", {
            url: link.href,
            text: link.textContent?.trim(),
            event_category: "External Navigation",
          })
        }

        if (isDownload) {
          trackSEOEvent("download", {
            file_url: link.href,
            file_name: link.href.split("/").pop(),
            event_category: "File Download",
          })
        }
      }
    }

    // Track video interactions
    const handleVideoPlay = (event: Event) => {
      const video = event.target as HTMLVideoElement
      const videoSrc = video.src || video.currentSrc

      trackSEOEvent("video_play", {
        video_url: videoSrc,
        video_title: video.title || "Unknown",
        event_category: "Video Engagement",
      })
    }

    // Add event listeners
    document.addEventListener("click", handleButtonClick)
    document.addEventListener("click", handleLinkClick)
    document.addEventListener("submit", handleFormSubmit)
    document.addEventListener("play", handleVideoPlay, true)

    return () => {
      document.removeEventListener("click", handleButtonClick)
      document.removeEventListener("click", handleLinkClick)
      document.removeEventListener("submit", handleFormSubmit)
      document.removeEventListener("play", handleVideoPlay, true)
    }
  }, [])

  return null
}
