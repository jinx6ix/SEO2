"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, FileText, Download, Eye, Calendar, Trash2 } from "lucide-react"
import { toast } from "sonner" // You can use any toast library

interface Report {
  id: string
  title: string
  type: string
  site: string
  createdAt: string
  status: "completed" | "processing" | "failed"
  content?: string
}

const initialReports: Report[] = [
  {
    id: "1",
    title: "Monthly SEO Report - January 2024",
    type: "SEO_AUDIT",
    site: "My Business Website",
    createdAt: "2024-01-15",
    status: "completed",
    content: "# SEO Audit Report\n\n## Executive Summary\nYour website shows strong technical SEO fundamentals with opportunities for improvement in content strategy and backlink profile.\n\n## Key Findings\n- **Performance Score**: 85/100\n- **Mobile Friendly**: Yes\n- **Indexed Pages**: 156\n- **Critical Issues**: 2"
  },
  {
    id: "2",
    title: "Keyword Analysis Report",
    type: "KEYWORD_ANALYSIS",
    site: "E-commerce Store",
    createdAt: "2024-01-10",
    status: "completed",
    content: "# Keyword Analysis Report\n\n## Top Performing Keywords\n1. **organic skincare** - Position: 3\n2. **natural beauty products** - Position: 5\n3. **vegan cosmetics** - Position: 8\n\n## Opportunities\n- **Low competition keywords**: 12 identified\n- **Seasonal trends**: 3 emerging keywords"
  },
  {
    id: "3",
    title: "Performance Report - Q4 2023",
    type: "PERFORMANCE",
    site: "My Business Website",
    createdAt: "2024-01-05",
    status: "completed",
    content: "# Performance Report Q4 2023\n\n## Traffic Overview\n- **Total Visitors**: 45,231 (+15% from Q3)\n- **Organic Traffic**: 28,567 (+22% from Q3)\n- **Conversion Rate**: 3.2% (+0.4% from Q3)\n\n## Recommendations\n- Improve page load speed on product pages\n- Optimize meta descriptions for better CTR"
  },
]

export function ReportsManagement() {
  const [reports, setReports] = useState<Report[]>(initialReports)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [newReport, setNewReport] = useState({
    title: "",
    type: "",
    site: "",
  })

  const getReportTypeBadge = (type: string) => {
    switch (type) {
      case "SEO_AUDIT":
        return { variant: "default" as const, label: "SEO Audit" }
      case "KEYWORD_ANALYSIS":
        return { variant: "secondary" as const, label: "Keywords" }
      case "PERFORMANCE":
        return { variant: "outline" as const, label: "Performance" }
      case "COMPETITOR_ANALYSIS":
        return { variant: "destructive" as const, label: "Competitor" }
      default:
        return { variant: "outline" as const, label: "Report" }
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return { variant: "default" as const, className: "bg-green-50 text-green-700 border-green-200", label: "Completed" }
      case "processing":
        return { variant: "secondary" as const, className: "bg-blue-50 text-blue-700 border-blue-200", label: "Processing" }
      case "failed":
        return { variant: "destructive" as const, className: "bg-red-50 text-red-700 border-red-200", label: "Failed" }
      default:
        return { variant: "outline" as const, className: "bg-gray-50 text-gray-700 border-gray-200", label: "Unknown" }
    }
  }

  const handleCreateReport = () => {
    if (!newReport.title || !newReport.type || !newReport.site) {
      toast.error("Please fill in all fields")
      return
    }

    const report: Report = {
      id: Date.now().toString(),
      title: newReport.title,
      type: newReport.type,
      site: newReport.site,
      createdAt: new Date().toISOString().split('T')[0],
      status: "completed",
      content: `# ${newReport.title}\n\nThis is a newly generated ${newReport.type.toLowerCase()} report for ${newReport.site}. The full analysis will be available once processing is complete.`
    }

    setReports(prev => [report, ...prev])
    setNewReport({ title: "", type: "", site: "" })
    setIsCreateDialogOpen(false)
    toast.success("Report generated successfully!")
  }

  const handleViewReport = (report: Report) => {
    setSelectedReport(report)
    setIsViewDialogOpen(true)
  }

  const handleDownloadReport = (report: Report) => {
    // Simulate download functionality
    const blob = new Blob([report.content || "No content available"], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${report.title.replace(/\s+/g, '_')}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success(`Downloading ${report.title}`)
  }

  const handleDeleteReport = (reportId: string) => {
    setReports(prev => prev.filter(report => report.id !== reportId))
    toast.success("Report deleted successfully")
  }

  const thisMonthReports = reports.filter(report => {
    const reportDate = new Date(report.createdAt)
    const now = new Date()
    return reportDate.getMonth() === now.getMonth() && reportDate.getFullYear() === now.getFullYear()
  })

  const mostPopularType = reports.reduce((acc, report) => {
    acc[report.type] = (acc[report.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const popularType = Object.entries(mostPopularType).sort((a, b) => b[1] - a[1])[0]?.[0] || "SEO_AUDIT"
  const popularTypeLabel = getReportTypeBadge(popularType).label

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Reports</h1>
          <p className="text-muted-foreground">Generate and manage SEO reports for your websites.</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Report
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Report</DialogTitle>
              <DialogDescription>Generate a new SEO report for your website.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="report-title">Report Title</Label>
                <Input 
                  id="report-title" 
                  placeholder="Monthly SEO Report" 
                  value={newReport.title}
                  onChange={(e) => setNewReport(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select value={newReport.type} onValueChange={(value) => setNewReport(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SEO_AUDIT">SEO Audit</SelectItem>
                    <SelectItem value="KEYWORD_ANALYSIS">Keyword Analysis</SelectItem>
                    <SelectItem value="PERFORMANCE">Performance Report</SelectItem>
                    <SelectItem value="COMPETITOR_ANALYSIS">Competitor Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="report-site">Site</Label>
                <Select value={newReport.site} onValueChange={(value) => setNewReport(prev => ({ ...prev, site: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a site" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="My Business Website">My Business Website</SelectItem>
                    <SelectItem value="E-commerce Store">E-commerce Store</SelectItem>
                    <SelectItem value="Blog Site">Blog Site</SelectItem>
                    <SelectItem value="Portfolio Website">Portfolio Website</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateReport}>Generate Report</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
            <p className="text-xs text-muted-foreground">Generated reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisMonthReports.length}</div>
            <p className="text-xs text-muted-foreground">Reports generated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Popular</CardTitle>
            <Badge variant={getReportTypeBadge(popularType).variant}>
              {popularTypeLabel}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{popularTypeLabel}</div>
            <p className="text-xs text-muted-foreground">Report type</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <div className="grid gap-4">
        {reports.map((report) => {
          const typeBadge = getReportTypeBadge(report.type)
          const statusBadge = getStatusBadge(report.status)
          
          return (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1 flex-wrap">
                      <Badge variant={typeBadge.variant}>{typeBadge.label}</Badge>
                      <span>•</span>
                      <span>{report.site}</span>
                      <span>•</span>
                      <span className="text-xs">Created on {new Date(report.createdAt).toLocaleDateString()}</span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusBadge.variant} className={statusBadge.className}>
                      {statusBadge.label}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteReport(report.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground max-w-md truncate">
                    {report.content?.split('\n')[0] || "No description available"}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewReport(report)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDownloadReport(report)}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* View Report Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedReport?.title}</DialogTitle>
            <DialogDescription>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={getReportTypeBadge(selectedReport?.type || "").variant}>
                  {getReportTypeBadge(selectedReport?.type || "").label}
                </Badge>
                <span>•</span>
                <span>{selectedReport?.site}</span>
                <span>•</span>
                <span>Created on {selectedReport?.createdAt}</span>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="prose dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans">
              {selectedReport?.content || "No content available for this report."}
            </pre>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => selectedReport && handleDownloadReport(selectedReport)}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {reports.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold">No reports yet</h3>
            <p className="text-muted-foreground mb-4">Create your first report to get started</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Report
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}