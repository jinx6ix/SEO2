"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, Plus, Eye, ExternalLink, Settings, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Site {
  id: string
  name: string
  url: string
  seoScore: number
  lastAudit: string
  issues: number
  keywords: number
  traffic: number
  status: "active" | "warning" | "error"
}

const initialSites: Site[] = [
  {
    id: "1",
    name: "My Business Website",
    url: "mybusiness.com",
    seoScore: 85,
    lastAudit: "2024-01-15",
    issues: 2,
    keywords: 45,
    traffic: 12500,
    status: "active"
  },
  {
    id: "2",
    name: "E-commerce Store",
    url: "mystore.com",
    seoScore: 78,
    lastAudit: "2024-01-14",
    issues: 5,
    keywords: 89,
    traffic: 28700,
    status: "warning"
  },
  {
    id: "3",
    name: "Blog Site",
    url: "myblog.com",
    seoScore: 92,
    lastAudit: "2024-01-16",
    issues: 1,
    keywords: 23,
    traffic: 8400,
    status: "active"
  }
]

export function DashboardOverview() {
  const [sites, setSites] = useState<Site[]>(initialSites)
  const [isAddSiteDialogOpen, setIsAddSiteDialogOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [newSite, setNewSite] = useState({
    name: "",
    url: "",
    category: "business"
  })

  // Mock data for dashboard stats
  const totalSites = sites.length
  const avgSeoScore = Math.round(sites.reduce((acc, site) => acc + site.seoScore, 0) / sites.length)
  const totalKeywords = sites.reduce((acc, site) => acc + site.keywords, 0)
  const totalIssues = sites.reduce((acc, site) => acc + site.issues, 0)
  const totalTraffic = sites.reduce((acc, site) => acc + site.traffic, 0)

  // Calculate trends (mock data)
  const sitesTrend = "+1 from last month"
  const scoreTrend = "+12% from last month"
  const keywordsTrend = "+23 new keywords"
  const issuesTrend = "-5 from last week"

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default"
    if (score >= 70) return "secondary"
    return "destructive"
  }

  const getIssuesBadgeVariant = (issues: number) => {
    if (issues === 0) return "default"
    if (issues <= 3) return "secondary"
    return "destructive"
  }

  const getStatusBadge = (status: Site['status']) => {
    switch (status) {
      case "active":
        return { variant: "default" as const, label: "Active", color: "text-green-600" }
      case "warning":
        return { variant: "secondary" as const, label: "Needs Attention", color: "text-yellow-600" }
      case "error":
        return { variant: "destructive" as const, label: "Critical", color: "text-red-600" }
    }
  }

  const handleAddSite = () => {
    if (!newSite.name.trim() || !newSite.url.trim()) {
      toast.error("Please fill in all required fields")
      return
    }

    const site: Site = {
      id: Date.now().toString(),
      name: newSite.name.trim(),
      url: newSite.url.trim().replace(/^https?:\/\//, ''),
      seoScore: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
      lastAudit: new Date().toISOString().split('T')[0],
      issues: Math.floor(Math.random() * 10),
      keywords: Math.floor(Math.random() * 50) + 10,
      traffic: Math.floor(Math.random() * 20000) + 5000,
      status: Math.random() > 0.7 ? "warning" : "active"
    }

    setSites(prev => [site, ...prev])
    setNewSite({ name: "", url: "", category: "business" })
    setIsAddSiteDialogOpen(false)
    toast.success(`Added site "${site.name}"`)
  }

  const handleRefreshData = async () => {
    setIsRefreshing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Update sites with random changes to simulate fresh data
    setSites(prev => prev.map(site => ({
      ...site,
      seoScore: Math.max(50, Math.min(100, site.seoScore + Math.floor(Math.random() * 10) - 5)),
      issues: Math.max(0, site.issues + Math.floor(Math.random() * 3) - 1),
      traffic: Math.max(0, site.traffic + Math.floor(Math.random() * 1000) - 500)
    })))

    setIsRefreshing(false)
    toast.success("Dashboard data refreshed")
  }

  const handleRunSEOAudit = (siteId: string) => {
    const site = sites.find(s => s.id === siteId)
    toast.info(`Starting SEO audit for ${site?.name}...`)
    
    // Simulate audit process
    setTimeout(() => {
      setSites(prev => prev.map(s => 
        s.id === siteId ? { 
          ...s, 
          seoScore: Math.min(100, s.seoScore + Math.floor(Math.random() * 10)),
          issues: Math.max(0, s.issues - Math.floor(Math.random() * 3)),
          lastAudit: new Date().toISOString().split('T')[0]
        } : s
      ))
      toast.success(`SEO audit completed for ${site?.name}`)
    }, 3000)
  }

  const handleGenerateReport = (siteId: string) => {
    const site = sites.find(s => s.id === siteId)
    toast.info(`Generating report for ${site?.name}...`)
    
    // Simulate report generation
    setTimeout(() => {
      const reportContent = `# SEO Report for ${site?.name}
      
## Executive Summary
- **SEO Score**: ${site?.seoScore}/100
- **Critical Issues**: ${site?.issues}
- **Tracked Keywords**: ${site?.keywords}
- **Monthly Traffic**: ${site?.traffic?.toLocaleString()}

## Recommendations
1. Fix critical SEO issues
2. Optimize page load speed
3. Improve meta descriptions`

      // Download simulation
      const blob = new Blob([reportContent], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `seo-report-${site?.name.toLowerCase().replace(/\s+/g, '-')}.md`
      a.click()
      URL.revokeObjectURL(url)
      
      toast.success(`Report downloaded for ${site?.name}`)
    }, 1500)
  }

  const handleViewSite = (siteUrl: string) => {
    window.open(`https://${siteUrl}`, '_blank')
  }

  const handleRemoveSite = (siteId: string) => {
    const site = sites.find(s => s.id === siteId)
    setSites(prev => prev.filter(s => s.id !== siteId))
    toast.success(`Removed site "${site?.name}"`)
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your SEO performance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefreshData} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <Dialog open={isAddSiteDialogOpen} onOpenChange={setIsAddSiteDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Site
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Site</DialogTitle>
                <DialogDescription>Add a new website to track SEO performance.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name *</Label>
                  <Input 
                    id="site-name" 
                    placeholder="My Business Website" 
                    value={newSite.name}
                    onChange={(e) => setNewSite(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-url">Website URL *</Label>
                  <Input 
                    id="site-url" 
                    placeholder="example.com" 
                    value={newSite.url}
                    onChange={(e) => setNewSite(prev => ({ ...prev, url: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-category">Category</Label>
                  <Select value={newSite.category} onValueChange={(value) => setNewSite(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="blog">Blog</SelectItem>
                      <SelectItem value="portfolio">Portfolio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddSiteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddSite}>Add Site</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sites</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSites}</div>
            <p className="text-xs text-muted-foreground">{sitesTrend}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg SEO Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSeoScore}</div>
            <p className="text-xs text-muted-foreground">{scoreTrend}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Keywords Tracked</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalKeywords.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{keywordsTrend}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues Found</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIssues}</div>
            <p className="text-xs text-muted-foreground">{issuesTrend}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Sites</CardTitle>
            <CardDescription>Your websites and their current SEO status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sites.length === 0 ? (
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold">No sites added yet</h3>
                <p className="text-muted-foreground mb-4">Add your first website to start tracking SEO performance</p>
                <Button onClick={() => setIsAddSiteDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Site
                </Button>
              </div>
            ) : (
              sites.map((site) => {
                const statusBadge = getStatusBadge(site.status)
                return (
                  <div key={site.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{site.name}</h3>
                        <Badge variant={statusBadge.variant} className={statusBadge.color}>
                          {statusBadge.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{site.url}</p>
                      <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Traffic: {site.traffic.toLocaleString()}/mo</span>
                        <span>Keywords: {site.keywords}</span>
                        <span>Last audit: {new Date(site.lastAudit).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getScoreBadgeVariant(site.seoScore)}>Score: {site.seoScore}</Badge>
                      <Badge variant={getIssuesBadgeVariant(site.issues)}>
                        {site.issues} issue{site.issues !== 1 ? 's' : ''}
                      </Badge>
                      <div className="flex gap-1 ml-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewSite(site.url)}>
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleRunSEOAudit(site.id)}>
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleGenerateReport(site.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start bg-transparent"
              onClick={() => setIsAddSiteDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Site
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start bg-transparent"
              onClick={() => {
                if (sites.length > 0) {
                  handleRunSEOAudit(sites[0].id)
                } else {
                  toast.error("Add a site first to run an audit")
                }
              }}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Run SEO Audit
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start bg-transparent"
              onClick={() => {
                if (sites.length > 0) {
                  handleGenerateReport(sites[0].id)
                } else {
                  toast.error("Add a site first to generate a report")
                }
              }}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start bg-transparent"
              onClick={handleRefreshData}
              disabled={isRefreshing}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? "Refreshing Data..." : "Refresh Dashboard"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Traffic</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTraffic.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performing</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sites.length > 0 ? sites.reduce((best, site) => site.seoScore > best.seoScore ? site : best).name : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Highest SEO score</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sites.filter(site => site.status === "warning" || site.status === "error").length}
            </div>
            <p className="text-xs text-muted-foreground">Sites requiring action</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}