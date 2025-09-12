"use client"

import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void
  }
}

interface GoogleAnalyticsProps {
  measurementId: string
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

      window.gtag("config", measurementId, {
        page_path: url,
        custom_map: {
          custom_parameter_1: "seo_source",
          custom_parameter_2: "user_type",
        },
      })

      // Track Core Web Vitals
      window.gtag("config", measurementId, {
        custom_parameter_cwv: true,
        send_page_view: true,
      })
    }
  }, [pathname, searchParams, measurementId])

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              send_page_view: true,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
            
            // Enhanced ecommerce tracking
            gtag('config', '${measurementId}', {
              custom_parameter_ecommerce: true
            });
          `,
        }}
      />
    </>
  )
}
