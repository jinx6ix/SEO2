"use client"

import { useEffect, useState } from "react"
import { List } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  className?: string
  title?: string
}

export function TableOfContents({ className = "", title = "Table of Contents" }: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // Generate TOC from headings in the document
    const headings = document.querySelectorAll("h2, h3, h4, h5, h6")
    const tocItems: TOCItem[] = []

    headings.forEach((heading) => {
      if (heading.id) {
        tocItems.push({
          id: heading.id,
          text: heading.textContent || "",
          level: Number.parseInt(heading.tagName.charAt(1)),
        })
      }
    })

    setToc(tocItems)

    // Set up intersection observer for active section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0,
      },
    )

    headings.forEach((heading) => {
      if (heading.id) {
        observer.observe(heading)
      }
    })

    return () => observer.disconnect()
  }, [])

  if (toc.length === 0) return null

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <Card className={cn("sticky top-6", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <List className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="space-y-1">
          {toc.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={cn("block w-full text-left text-sm py-1 px-2 rounded transition-colors hover:bg-muted", {
                "bg-muted text-foreground font-medium": activeId === item.id,
                "text-muted-foreground": activeId !== item.id,
                "pl-4": item.level === 3,
                "pl-6": item.level === 4,
                "pl-8": item.level === 5,
                "pl-10": item.level === 6,
              })}
            >
              {item.text}
            </button>
          ))}
        </nav>
      </CardContent>
    </Card>
  )
}
