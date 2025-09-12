"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, BarChart3, Settings, ExternalLink } from "lucide-react"

const mockSites = [
  {
    id: "1",
    name: "My Business Website",
    url: "https://mybusiness.com",
    description: "Main business website",
    lastAudit: "2024-01-15",
    score: 85,
    issues: 2,
    keywords: 45,
  },
  {
    id: "2",
    name: "E-commerce Store",
    url: "https://mystore.com",
    description: "Online store",
    lastAudit: "2024-01-10",
    score: 78,
    issues: 5,
    keywords: 32,
  },
]

export function SitesManagement() {
  const [sites] = useState(mockSites)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Sites</h1>
          <p className="text-muted-foreground">Manage your websites and track their SEO performance.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Site
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Site</DialogTitle>
              <DialogDescription>Add a new website to track its SEO performance.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" placeholder="My Website" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-url">URL</Label>
                <Input id="site-url" placeholder="https://example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Description</Label>
                <Textarea id="site-description" placeholder="Brief description of your website" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Add Site</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sites.map((site) => (
          <Card key={site.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{site.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    {site.url}
                  </CardDescription>
                </div>
                <Badge variant={site.score >= 80 ? "default" : site.score >= 60 ? "secondary" : "destructive"}>
                  {site.score}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{site.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Keywords</p>
                  <p className="text-muted-foreground">{site.keywords}</p>
                </div>
                <div>
                  <p className="font-medium">Issues</p>
                  <p className="text-muted-foreground">{site.issues}</p>
                </div>
              </div>

              <div className="text-sm">
                <p className="font-medium">Last Audit</p>
                <p className="text-muted-foreground">{site.lastAudit}</p>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Audit
                </Button>
                <Button size="sm" variant="outline">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
