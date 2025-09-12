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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, TrendingUp, TrendingDown, Minus } from "lucide-react"

const mockKeywords = [
  {
    id: "1",
    keyword: "seo tools",
    site: "My Business Website",
    position: 15,
    previousPosition: 18,
    volume: 8100,
    difficulty: 65,
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    keyword: "website audit",
    site: "My Business Website",
    position: 8,
    previousPosition: 12,
    volume: 2400,
    difficulty: 45,
    lastUpdated: "2024-01-15",
  },
  {
    id: "3",
    keyword: "keyword tracking",
    site: "E-commerce Store",
    position: 23,
    previousPosition: 23,
    volume: 1600,
    difficulty: 55,
    lastUpdated: "2024-01-14",
  },
]

export function KeywordTracking() {
  const [keywords] = useState(mockKeywords)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const getPositionTrend = (current: number, previous: number) => {
    if (current < previous) return { icon: TrendingUp, color: "text-green-600", change: previous - current }
    if (current > previous) return { icon: TrendingDown, color: "text-red-600", change: current - previous }
    return { icon: Minus, color: "text-gray-500", change: 0 }
  }

  const getDifficultyBadge = (difficulty: number) => {
    if (difficulty >= 70) return { variant: "destructive" as const, label: "Hard" }
    if (difficulty >= 40) return { variant: "secondary" as const, label: "Medium" }
    return { variant: "default" as const, label: "Easy" }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Keywords</h1>
          <p className="text-muted-foreground">Track your keyword rankings and monitor performance over time.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Keywords
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Keywords</DialogTitle>
              <DialogDescription>Add new keywords to track for your websites.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keyword">Keyword</Label>
                <Input id="keyword" placeholder="Enter keyword to track" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-select">Site</Label>
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
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Add Keyword</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{keywords.length}</div>
            <p className="text-xs text-muted-foreground">Across all sites</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(keywords.reduce((acc, k) => acc + k.position, 0) / keywords.length)}
            </div>
            <p className="text-xs text-muted-foreground">Average ranking position</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improving</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {keywords.filter((k) => k.position < k.previousPosition).length}
            </div>
            <p className="text-xs text-muted-foreground">Keywords moving up</p>
          </CardContent>
        </Card>
      </div>

      {/* Keywords Table */}
      <Card>
        <CardHeader>
          <CardTitle>Keyword Rankings</CardTitle>
          <CardDescription>Current positions and trends for your tracked keywords</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keywords.map((keyword) => {
                const trend = getPositionTrend(keyword.position, keyword.previousPosition)
                const difficulty = getDifficultyBadge(keyword.difficulty)
                return (
                  <TableRow key={keyword.id}>
                    <TableCell className="font-medium">{keyword.keyword}</TableCell>
                    <TableCell>{keyword.site}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">#{keyword.position}</span>
                        <div className={`flex items-center gap-1 ${trend.color}`}>
                          <trend.icon className="h-3 w-3" />
                          {trend.change > 0 && <span className="text-xs">{trend.change}</span>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{keyword.volume.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={difficulty.variant}>{difficulty.label}</Badge>
                    </TableCell>
                    <TableCell>{keyword.lastUpdated}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
