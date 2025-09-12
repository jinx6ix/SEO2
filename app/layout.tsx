import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/components/auth-provider"
import { GoogleAnalytics } from "@/components/google-analytics"
import { ConversionTracking } from "@/components/conversion-tracking"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "SEOControl - Professional SEO Management Platform",
    template: "%s | SEOControl",
  },
  description:
    "Comprehensive SEO management and optimization platform for businesses. Track rankings, analyze keywords, monitor competitors, and boost your search engine visibility with advanced SEO tools.",
  keywords: [
    "SEO",
    "search engine optimization",
    "keyword tracking",
    "SERP analysis",
    "SEO tools",
    "website optimization",
    "digital marketing",
    "search rankings",
  ],
  authors: [{ name: "SEOControl Team" }],
  creator: "SEOControl",
  publisher: "SEOControl",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://seocontrol.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "SEOControl - Professional SEO Management Platform",
    description:
      "Comprehensive SEO management and optimization platform for businesses. Track rankings, analyze keywords, and boost your search engine visibility.",
    siteName: "SEOControl",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SEOControl - Professional SEO Management Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEOControl - Professional SEO Management Platform",
    description: "Comprehensive SEO management and optimization platform for businesses.",
    images: ["/og-image.jpg"],
    creator: "@seocontrol",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        <meta name="theme-color" content="#164e63" />
        <meta name="msapplication-TileColor" content="#164e63" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SEOControl",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://seocontrol.app",
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://seocontrol.app"}/logo.png`,
              description: "Professional SEO management and optimization platform",
              sameAs: ["https://twitter.com/seocontrol", "https://linkedin.com/company/seocontrol"],
            }),
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>{children}</AuthProvider>
        </Suspense>

        <Analytics />
        <PerformanceMonitor />
        <ConversionTracking />

        {/* Google Analytics - only in production */}
        {process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  )
}
