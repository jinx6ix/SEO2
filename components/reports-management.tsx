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
import { Plus, FileText, Download, Eye, Calendar } from "lucide-react"

const mockReports = [
  {
    id: "1",
    title: "Monthly SEO Report - January 2024",
    type: "SEO_AUDIT",
    site: "My Business Website",
    createdAt: "2024-01-15",
    status: "completed",
  },
  {
    id: "2",
    title: "Keyword Analysis Report",
    type: "KEYWORD_ANALYSIS",
    site: "E-commerce Store",
    createdAt: "2024-01-10",
    status: "completed",
  },
  {
    id: "3",
    title: "Performance Report - Q4 2023",
    type: "PERFORMANCE",
    site: "My Business Website",
    createdAt: "2024-01-05",
    status: "completed",
  },
]

export function ReportsManagement() {
  const [reports] = useState(mockReports)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const getReportTypeBadge = (type: string) => {
    switch (type) {
      case "SEO_AUDIT":
        return { variant: "default" as const, label: "SEO Audit" }
      case "KEYWORD_ANALYSIS":
        return { variant: "secondary" as const, label: "Keywords" }
      case "PERFORMANCE":
        return { variant: "outline" as const, label: "Performance" }
      default:
        return { variant: "outline" as const, label: "Report" }
    }
  }

  return (
    <div className="space-y-6">
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
                <Input id="report-title" placeholder="Monthly SEO Report" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select>
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
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a site" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="site1">My Business Website</SelectItem>
                    <SelectItem value="site2">E-commerce Store</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>Generate Report</Button>
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
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Reports generated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Popular</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">SEO Audit</div>
            <p className="text-xs text-muted-foreground">Report type</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <div className="grid gap-4">
        {reports.map((report) => {
          const typeBadge = getReportTypeBadge(report.type)
          return (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Badge variant={typeBadge.variant}>{typeBadge.label}</Badge>
                      <span>•</span>
                      <span>{report.site}</span>
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Completed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Created on {new Date(report.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
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
    </div>
  )
}
