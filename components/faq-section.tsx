"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StructuredData } from "./structured-data"
import { SEOHeading } from "./seo-optimized-heading"

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  faqs: FAQ[]
  className?: string
}

export function FAQSection({ title = "Frequently Asked Questions", faqs, className = "" }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  const faqSchema = {
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

  return (
    <section className={`space-y-6 ${className}`} itemScope itemType="https://schema.org/FAQPage">
      <StructuredData data={faqSchema} />

      <SEOHeading level={2}>{title}</SEOHeading>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} itemScope itemType="https://schema.org/Question" itemProp="mainEntity">
            <CardHeader className="pb-3">
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto text-left"
                onClick={() => toggleItem(index)}
              >
                <CardTitle className="text-lg font-semibold" itemProp="name">
                  {faq.question}
                </CardTitle>
                {openItems.has(index) ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>
            </CardHeader>

            {openItems.has(index) && (
              <CardContent className="pt-0" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                <div className="text-muted-foreground" itemProp="text">
                  {faq.answer}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}
