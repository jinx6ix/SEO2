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
import { Plus, TrendingUp, TrendingDown, Minus, Search, Filter, Trash2, Edit } from "lucide-react"
import { toast } from "sonner"

interface Keyword {
  id: string
  keyword: string
  site: string
  position: number
  previousPosition: number
  volume: number
  difficulty: number
  lastUpdated: string
  url?: string
}

const initialKeywords: Keyword[] = [
  {
    id: "1",
    keyword: "seo tools",
    site: "My Business Website",
    position: 15,
    previousPosition: 18,
    volume: 8100,
    difficulty: 65,
    lastUpdated: "2024-01-15",
    url: "https://example.com/seo-tools"
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
    url: "https://example.com/audit"
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
    url: "https://store.com/tracking"
  },
  {
    id: "4",
    keyword: "content marketing",
    site: "Blog Site",
    position: 5,
    previousPosition: 7,
    volume: 5400,
    difficulty: 72,
    lastUpdated: "2024-01-16",
    url: "https://blog.com/content"
  },
]

export function KeywordTracking() {
  const [keywords, setKeywords] = useState<Keyword[]>(initialKeywords)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingKeyword, setEditingKeyword] = useState<Keyword | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [siteFilter, setSiteFilter] = useState("all")
  const [newKeyword, setNewKeyword] = useState({
    keyword: "",
    site: "",
    volume: 0,
    difficulty: 50,
    url: ""
  })

  const getPositionTrend = (current: number, previous: number) => {
    if (current < previous) return { icon: TrendingUp, color: "text-green-600", change: previous - current, trend: "up" }
    if (current > previous) return { icon: TrendingDown, color: "text-red-600", change: current - previous, trend: "down" }
    return { icon: Minus, color: "text-gray-500", change: 0, trend: "same" }
  }

  const getDifficultyBadge = (difficulty: number) => {
    if (difficulty >= 70) return { variant: "destructive" as const, label: "Hard" }
    if (difficulty >= 40) return { variant: "secondary" as const, label: "Medium" }
    return { variant: "default" as const, label: "Easy" }
  }

  const handleAddKeyword = () => {
    if (!newKeyword.keyword.trim() || !newKeyword.site) {
      toast.error("Please fill in required fields")
      return
    }

    const keyword: Keyword = {
      id: Date.now().toString(),
      keyword: newKeyword.keyword.trim(),
      site: newKeyword.site,
      position: Math.floor(Math.random() * 50) + 1,
      previousPosition: Math.floor(Math.random() * 50) + 1,
      volume: newKeyword.volume || 0,
      difficulty: newKeyword.difficulty,
      lastUpdated: new Date().toISOString().split('T')[0],
      url: newKeyword.url
    }

    setKeywords(prev => [keyword, ...prev])
    setNewKeyword({ keyword: "", site: "", volume: 0, difficulty: 50, url: "" })
    setIsAddDialogOpen(false)
    toast.success(`Added keyword "${keyword.keyword}"`)
  }

  const handleEditKeyword = () => {
    if (!editingKeyword?.keyword.trim()) {
      toast.error("Keyword is required")
      return
    }

    setKeywords(prev => prev.map(k => 
      k.id === editingKeyword.id ? { ...editingKeyword } : k
    ))
    setIsEditDialogOpen(false)
    setEditingKeyword(null)
    toast.success("Keyword updated successfully")
  }

  const handleDeleteKeyword = (keywordId: string) => {
    const keyword = keywords.find(k => k.id === keywordId)
    setKeywords(prev => prev.filter(k => k.id !== keywordId))
    toast.success(`Deleted keyword "${keyword?.keyword}"`)
  }

  const handleBulkDelete = (keywordIds: string[]) => {
    setKeywords(prev => prev.filter(k => !keywordIds.includes(k.id)))
    toast.success(`Deleted ${keywordIds.length} keywords`)
  }

  const startEdit = (keyword: Keyword) => {
    setEditingKeyword({ ...keyword })
    setIsEditDialogOpen(true)
  }

  // Filter keywords based on search and site filter
  const filteredKeywords = keywords.filter(keyword => {
    const matchesSearch = keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         keyword.site.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSite = siteFilter === "all" || keyword.site === siteFilter
    return matchesSearch && matchesSite
  })

  // Calculate statistics
  const totalKeywords = keywords.length
  const avgPosition = Math.round(keywords.reduce((acc, k) => acc + k.position, 0) / keywords.length)
  const improvingKeywords = keywords.filter((k) => k.position < k.previousPosition).length
  const decliningKeywords = keywords.filter((k) => k.position > k.previousPosition).length
  
  const uniqueSites = Array.from(new Set(keywords.map(k => k.site)))
  const topPerforming = keywords.filter(k => k.position <= 10).length
  const needImprovement = keywords.filter(k => k.position > 20).length

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
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
                <Label htmlFor="keyword">Keyword *</Label>
                <Input 
                  id="keyword" 
                  placeholder="Enter keyword to track" 
                  value={newKeyword.keyword}
                  onChange={(e) => setNewKeyword(prev => ({ ...prev, keyword: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-select">Site *</Label>
                <Select value={newKeyword.site} onValueChange={(value) => setNewKeyword(prev => ({ ...prev, site: value }))}>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="volume">Monthly Volume</Label>
                  <Input 
                    id="volume" 
                    type="number" 
                    placeholder="0"
                    value={newKeyword.volume}
                    onChange={(e) => setNewKeyword(prev => ({ ...prev, volume: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Input 
                    id="difficulty" 
                    type="number" 
                    min="0" 
                    max="100"
                    placeholder="50"
                    value={newKeyword.difficulty}
                    onChange={(e) => setNewKeyword(prev => ({ ...prev, difficulty: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">Target URL (Optional)</Label>
                <Input 
                  id="url" 
                  placeholder="https://example.com/page"
                  value={newKeyword.url}
                  onChange={(e) => setNewKeyword(prev => ({ ...prev, url: e.target.value }))}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddKeyword}>Add Keyword</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search keywords or sites..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={siteFilter} onValueChange={setSiteFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by site" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sites</SelectItem>
            {uniqueSites.map(site => (
              <SelectItem key={site} value={site}>{site}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalKeywords}</div>
            <p className="text-xs text-muted-foreground">Across all sites</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgPosition}</div>
            <p className="text-xs text-muted-foreground">Average ranking position</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improving</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{improvingKeywords}</div>
            <p className="text-xs text-muted-foreground">Keywords moving up</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top 10</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{topPerforming}</div>
            <p className="text-xs text-muted-foreground">In top 10 positions</p>
          </CardContent>
        </Card>
      </div>

      {/* Keywords Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Keyword Rankings</CardTitle>
              <CardDescription>
                {filteredKeywords.length} of {keywords.length} keywords showing
                {siteFilter !== "all" && ` for ${siteFilter}`}
              </CardDescription>
            </div>
            {filteredKeywords.length > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const selectedIds = filteredKeywords.map(k => k.id)
                  handleBulkDelete(selectedIds)
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete All Filtered
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {filteredKeywords.length === 0 ? (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No keywords found</h3>
              <p className="text-muted-foreground mb-4">
                {keywords.length === 0 ? "Add your first keyword to get started" : "Try adjusting your search or filter"}
              </p>
              {keywords.length === 0 && (
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Keyword
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  <TableHead>Site</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredKeywords.map((keyword) => {
                  const trend = getPositionTrend(keyword.position, keyword.previousPosition)
                  const difficulty = getDifficultyBadge(keyword.difficulty)
                  return (
                    <TableRow key={keyword.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div>
                          <div>{keyword.keyword}</div>
                          {keyword.url && (
                            <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {keyword.url}
                            </div>
                          )}
                        </div>
                      </TableCell>
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
                      <TableCell>{new Date(keyword.lastUpdated).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => startEdit(keyword)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteKeyword(keyword.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Keyword Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Keyword</DialogTitle>
            <DialogDescription>Update keyword details and tracking information.</DialogDescription>
          </DialogHeader>
          {editingKeyword && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-keyword">Keyword</Label>
                <Input 
                  id="edit-keyword"
                  value={editingKeyword.keyword}
                  onChange={(e) => setEditingKeyword(prev => prev ? { ...prev, keyword: e.target.value } : null)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-site">Site</Label>
                <Select 
                  value={editingKeyword.site} 
                  onValueChange={(value) => setEditingKeyword(prev => prev ? { ...prev, site: value } : null)}
                >
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-position">Current Position</Label>
                  <Input 
                    id="edit-position"
                    type="number"
                    value={editingKeyword.position}
                    onChange={(e) => setEditingKeyword(prev => prev ? { ...prev, position: parseInt(e.target.value) || 0 } : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-volume">Monthly Volume</Label>
                  <Input 
                    id="edit-volume"
                    type="number"
                    value={editingKeyword.volume}
                    onChange={(e) => setEditingKeyword(prev => prev ? { ...prev, volume: parseInt(e.target.value) || 0 } : null)}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditKeyword}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}