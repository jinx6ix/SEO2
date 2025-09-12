import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, BarChart3, Target, Zap, CheckCircle } from "lucide-react"
import { StructuredData } from "@/components/structured-data"
import { SEOTracking } from "@/components/seo-tracking"

export function LandingPage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SEOControl",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://seocontrol.app",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://seocontrol.app"}/logo.png`,
    description: "Professional SEO management and optimization platform for businesses",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-SEO-CTRL",
      contactType: "customer service",
      availableLanguage: "English",
    },
    sameAs: ["https://twitter.com/seocontrol", "https://linkedin.com/company/seocontrol"],
  }

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SEOControl",
    description:
      "Comprehensive SEO management and optimization platform for businesses. Track rankings, analyze keywords, monitor competitors, and boost your search engine visibility.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://seocontrol.app",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    softwareVersion: "2.0",
    releaseNotes: "Enhanced keyword tracking and automated reporting features",
    screenshot: `${process.env.NEXT_PUBLIC_SITE_URL || "https://seocontrol.app"}/screenshot.jpg`,
    offers: [
      {
        "@type": "Offer",
        name: "Free Plan",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        description: "Perfect for getting started with basic SEO tools",
      },
      {
        "@type": "Offer",
        name: "Pro Plan",
        price: "49",
        priceCurrency: "USD",
        priceValidUntil: "2025-12-31",
        availability: "https://schema.org/InStock",
        description: "For growing businesses with advanced SEO needs",
      },
      {
        "@type": "Offer",
        name: "Enterprise Plan",
        price: "199",
        priceCurrency: "USD",
        priceValidUntil: "2025-12-31",
        availability: "https://schema.org/InStock",
        description: "For agencies and large teams with unlimited access",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "247",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "SEO Audits",
      "Keyword Tracking",
      "Competitor Analysis",
      "Automated Reports",
      "Performance Monitoring",
      "Technical SEO Analysis",
    ],
  }

  const websiteSchema = {
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: process.env.NEXT_PUBLIC_SITE_URL || "https://seocontrol.app",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOTracking
        pageType="landing"
        keywords={["SEO management", "keyword tracking", "SEO tools", "search engine optimization"]}
      />

      <StructuredData data={organizationSchema} />
      <StructuredData data={softwareApplicationSchema} />
      <StructuredData data={websiteSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* Header */}
      <header className="border-b border-border" itemScope itemType="https://schema.org/WPHeader">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2" itemScope itemType="https://schema.org/Brand">
            <Search className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary" itemProp="name">
              SEOControl
            </span>
          </div>
          <nav className="flex items-center space-x-4" itemScope itemType="https://schema.org/SiteNavigationElement">
            <Link href="/auth/signin" itemProp="url">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup" itemProp="url">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4" itemScope itemType="https://schema.org/WebPageElement">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Professional SEO Management Platform
          </Badge>
          <h1 className="text-5xl font-bold text-balance mb-6 text-foreground" itemProp="headline">
            Take Control of Your SEO Strategy
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty" itemProp="description">
            Comprehensive SEO management and optimization platform designed for professionals. Track rankings, audit
            websites, and generate detailed reports.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30" itemScope itemType="https://schema.org/ItemList">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" itemProp="name">
              Everything You Need for SEO Success
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto" itemProp="description">
              Powerful tools and insights to optimize your website's search engine performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card itemScope itemType="https://schema.org/Service" itemProp="itemListElement">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                <CardTitle itemProp="name">SEO Audits</CardTitle>
                <CardDescription itemProp="description">
                  Comprehensive website analysis with actionable recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Technical SEO analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Performance optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Content recommendations
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card itemScope itemType="https://schema.org/Service" itemProp="itemListElement">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mb-4" />
                <CardTitle itemProp="name">Keyword Tracking</CardTitle>
                <CardDescription itemProp="description">
                  Monitor your keyword rankings and track progress over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Real-time rank tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Competitor analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Search volume data
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card itemScope itemType="https://schema.org/Service" itemProp="itemListElement">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle itemProp="name">Automated Reports</CardTitle>
                <CardDescription itemProp="description">
                  Generate professional SEO reports for clients and stakeholders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Customizable templates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Scheduled delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    White-label options
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4" itemScope itemType="https://schema.org/PriceSpecification">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-muted-foreground">Start free, upgrade as you grow</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card itemScope itemType="https://schema.org/Offer">
              <CardHeader>
                <CardTitle itemProp="name">Free</CardTitle>
                <CardDescription itemProp="description">Perfect for getting started</CardDescription>
                <div className="text-3xl font-bold">
                  <span itemProp="price">$0</span>
                  <span className="text-sm font-normal">/month</span>
                </div>
                <meta itemProp="priceCurrency" content="USD" />
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />1 website
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Basic SEO audit
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    10 keywords
                  </li>
                </ul>
                <Button className="w-full bg-transparent" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary" itemScope itemType="https://schema.org/Offer">
              <CardHeader>
                <Badge className="w-fit mb-2">Most Popular</Badge>
                <CardTitle itemProp="name">Pro</CardTitle>
                <CardDescription itemProp="description">For growing businesses</CardDescription>
                <div className="text-3xl font-bold">
                  <span itemProp="price">$49</span>
                  <span className="text-sm font-normal">/month</span>
                </div>
                <meta itemProp="priceCurrency" content="USD" />
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    10 websites
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Advanced audits
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    500 keywords
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Automated reports
                  </li>
                </ul>
                <Button className="w-full">Start Free Trial</Button>
              </CardContent>
            </Card>

            <Card itemScope itemType="https://schema.org/Offer">
              <CardHeader>
                <CardTitle itemProp="name">Enterprise</CardTitle>
                <CardDescription itemProp="description">For agencies and large teams</CardDescription>
                <div className="text-3xl font-bold">
                  <span itemProp="price">$199</span>
                  <span className="text-sm font-normal">/month</span>
                </div>
                <meta itemProp="priceCurrency" content="USD" />
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Unlimited websites
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    White-label reports
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Unlimited keywords
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Priority support
                  </li>
                </ul>
                <Button className="w-full bg-transparent" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4" itemScope itemType="https://schema.org/WPFooter">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2" itemScope itemType="https://schema.org/Organization">
              <Search className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary" itemProp="name">
                SEOControl
              </span>
            </div>
            <p className="text-muted-foreground text-sm" itemProp="copyrightNotice">
              © 2024 SEOControl. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
