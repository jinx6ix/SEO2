"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Plus, 
  BarChart3, 
  Settings, 
  ExternalLink, 
  Trash2, 
  Edit, 
  RefreshCw, 
  Eye,
  Download,
  Globe,
  User,
  Bell,
  Shield,
  Database,
  Mail
} from "lucide-react"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Site {
  id: string
  name: string
  url: string
  description: string
  lastAudit: string
  score: number
  issues: number
  keywords: number
  status: "active" | "paused" | "error"
  category: string
  auditSchedule: "daily" | "weekly" | "monthly"
}

interface UserSettings {
  email: string
  name: string
  notifications: {
    email: boolean
    slack: boolean
    weeklyReports: boolean
    criticalIssues: boolean
  }
  preferences: {
    theme: "light" | "dark" | "system"
    timezone: string
    language: string
  }
}

interface APISettings {
  key: string
  usage: number
  limit: number
  lastUsed: string
}

const initialSites: Site[] = [
  {
    id: "1",
    name: "My Business Website",
    url: "https://mybusiness.com",
    description: "Main business website and primary online presence",
    lastAudit: "2024-01-15",
    score: 85,
    issues: 2,
    keywords: 45,
    status: "active",
    category: "business",
    auditSchedule: "weekly"
  },
  {
    id: "2",
    name: "E-commerce Store",
    url: "https://mystore.com",
    description: "Online store for product sales and e-commerce",
    lastAudit: "2024-01-10",
    score: 78,
    issues: 5,
    keywords: 32,
    status: "active",
    category: "ecommerce",
    auditSchedule: "daily"
  },
  {
    id: "3",
    name: "Blog Site",
    url: "https://blog.mybusiness.com",
    description: "Company blog for content marketing and SEO",
    lastAudit: "2024-01-12",
    score: 92,
    issues: 1,
    keywords: 28,
    status: "paused",
    category: "blog",
    auditSchedule: "monthly"
  }
]

const initialUserSettings: UserSettings = {
  email: "user@example.com",
  name: "John Doe",
  notifications: {
    email: true,
    slack: false,
    weeklyReports: true,
    criticalIssues: true
  },
  preferences: {
    theme: "system",
    timezone: "UTC",
    language: "en"
  }
}

const initialAPISettings: APISettings = {
  key: "sk_••••••••••••••••••••••••••••••••",
  usage: 1250,
  limit: 10000,
  lastUsed: "2024-01-15"
}

export function SitesManagement() {
  const [sites, setSites] = useState<Site[]>(initialSites)
  const [userSettings, setUserSettings] = useState<UserSettings>(initialUserSettings)
  const [apiSettings, setApiSettings] = useState<APISettings>(initialAPISettings)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingSite, setEditingSite] = useState<Site | null>(null)
  const [newSite, setNewSite] = useState({
    name: "",
    url: "",
    description: "",
    category: "business",
    auditSchedule: "weekly"
  })

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  const getStatusBadge = (status: Site['status']) => {
    switch (status) {
      case "active":
        return { variant: "default" as const, label: "Active" }
      case "paused":
        return { variant: "secondary" as const, label: "Paused" }
      case "error":
        return { variant: "destructive" as const, label: "Error" }
    }
  }

  const handleAddSite = () => {
    if (!newSite.name.trim() || !newSite.url.trim()) {
      toast.error("Please fill in required fields")
      return
    }

    const site: Site = {
      id: Date.now().toString(),
      name: newSite.name.trim(),
      url: newSite.url.trim(),
      description: newSite.description.trim(),
      lastAudit: new Date().toISOString().split('T')[0],
      score: Math.floor(Math.random() * 30) + 70,
      issues: Math.floor(Math.random() * 8),
      keywords: Math.floor(Math.random() * 50) + 10,
      status: "active",
      category: newSite.category,
      auditSchedule: newSite.auditSchedule as "daily" | "weekly" | "monthly"
    }

    setSites(prev => [site, ...prev])
    setNewSite({ name: "", url: "", description: "", category: "business", auditSchedule: "weekly" })
    setIsAddDialogOpen(false)
    toast.success(`Added site "${site.name}"`)
  }

  const handleEditSite = () => {
    if (!editingSite?.name.trim() || !editingSite?.url.trim()) {
      toast.error("Please fill in required fields")
      return
    }

    setSites(prev => prev.map(site => 
      site.id === editingSite.id ? { ...editingSite } : site
    ))
    setIsEditDialogOpen(false)
    setEditingSite(null)
    toast.success("Site updated successfully")
  }

  const handleDeleteSite = (siteId: string) => {
    const site = sites.find(s => s.id === siteId)
    setSites(prev => prev.filter(s => s.id !== siteId))
    toast.success(`Deleted site "${site?.name}"`)
  }

  const handleRunAudit = (siteId: string) => {
    const site = sites.find(s => s.id === siteId)
    toast.info(`Starting SEO audit for ${site?.name}...`)
    
    setTimeout(() => {
      setSites(prev => prev.map(s => 
        s.id === siteId ? { 
          ...s, 
          score: Math.min(100, s.score + Math.floor(Math.random() * 10)),
          issues: Math.max(0, s.issues - Math.floor(Math.random() * 3)),
          lastAudit: new Date().toISOString().split('T')[0]
        } : s
      ))
      toast.success(`SEO audit completed for ${site?.name}`)
    }, 3000)
  }

  const handleToggleSiteStatus = (siteId: string) => {
    setSites(prev => prev.map(site => 
      site.id === siteId ? { 
        ...site, 
        status: site.status === "active" ? "paused" : "active" 
      } : site
    ))
  }

  const handleExportData = () => {
    const exportData = {
      sites,
      exportedAt: new Date().toISOString(),
      version: "1.0"
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `seo-tracker-sites-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    
    toast.success("Sites data exported successfully")
  }

  const handleUpdateUserSettings = (updates: Partial<UserSettings>) => {
    setUserSettings(prev => ({ ...prev, ...updates }))
    toast.success("Settings updated successfully")
  }

  const handleRegenerateAPIKey = () => {
    const newKey = `sk_${Math.random().toString(36).substr(2, 32)}`
    setApiSettings(prev => ({ 
      ...prev, 
      key: newKey,
      lastUsed: new Date().toISOString().split('T')[0]
    }))
    toast.success("API key regenerated")
  }

  const startEdit = (site: Site) => {
    setEditingSite({ ...site })
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Settings</h1>
          <p className="text-muted-foreground">Manage your sites, account settings, and preferences.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Site
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Site</DialogTitle>
                <DialogDescription>Add a new website to track its SEO performance.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Site Name *</Label>
                    <Input 
                      id="site-name" 
                      placeholder="My Website" 
                      value={newSite.name}
                      onChange={(e) => setNewSite(prev => ({ ...prev, name: e.target.value }))}
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-url">URL *</Label>
                  <Input 
                    id="site-url" 
                    placeholder="https://example.com" 
                    value={newSite.url}
                    onChange={(e) => setNewSite(prev => ({ ...prev, url: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description">Description</Label>
                  <Textarea 
                    id="site-description" 
                    placeholder="Brief description of your website" 
                    value={newSite.description}
                    onChange={(e) => setNewSite(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audit-schedule">Audit Schedule</Label>
                  <Select value={newSite.auditSchedule} onValueChange={(value) => setNewSite(prev => ({ ...prev, auditSchedule: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddSite}>Add Site</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="sites" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sites" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Sites
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            API
          </TabsTrigger>
        </TabsList>

        {/* Sites Tab */}
        <TabsContent value="sites" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sites.map((site) => (
              <Card key={site.id} className="relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{site.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <ExternalLink className="h-3 w-3" />
                        {site.url.replace(/^https?:\/\//, '')}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getScoreBadgeVariant(site.score)}>
                        {site.score}
                      </Badge>
                      <Badge variant={getStatusBadge(site.status).variant}>
                        {getStatusBadge(site.status).label}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{site.description}</p>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Keywords</p>
                      <p className="text-muted-foreground">{site.keywords}</p>
                    </div>
                    <div>
                      <p className="font-medium">Issues</p>
                      <p className="text-muted-foreground">{site.issues}</p>
                    </div>
                    <div>
                      <p className="font-medium">Schedule</p>
                      <p className="text-muted-foreground capitalize">{site.auditSchedule}</p>
                    </div>
                  </div>

                  <div className="text-sm">
                    <p className="font-medium">Last Audit</p>
                    <p className="text-muted-foreground">{new Date(site.lastAudit).toLocaleDateString()}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => handleRunAudit(site.id)}>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Audit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => startEdit(site)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleToggleSiteStatus(site.id)}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDeleteSite(site.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sites.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold">No sites added yet</h3>
                <p className="text-muted-foreground mb-4">Add your first website to start tracking SEO performance</p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Site
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={userSettings.name}
                    onChange={(e) => handleUpdateUserSettings({ name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={userSettings.email}
                    onChange={(e) => handleUpdateUserSettings({ email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select 
                    value={userSettings.preferences.timezone}
                    onValueChange={(value) => handleUpdateUserSettings({ 
                      preferences: { ...userSettings.preferences, timezone: value } 
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="CET">Central European Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select 
                    value={userSettings.preferences.language}
                    onValueChange={(value) => handleUpdateUserSettings({ 
                      preferences: { ...userSettings.preferences, language: value } 
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select 
                  value={userSettings.preferences.theme}
                  onValueChange={(value: "light" | "dark" | "system") => handleUpdateUserSettings({ 
                    preferences: { ...userSettings.preferences, theme: value } 
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </div>
                </div>
                <Switch 
                  id="email-notifications"
                  checked={userSettings.notifications.email}
                  onCheckedChange={(checked) => handleUpdateUserSettings({
                    notifications: { ...userSettings.notifications, email: checked }
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="slack-notifications">Slack Notifications</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive notifications in Slack
                  </div>
                </div>
                <Switch 
                  id="slack-notifications"
                  checked={userSettings.notifications.slack}
                  onCheckedChange={(checked) => handleUpdateUserSettings({
                    notifications: { ...userSettings.notifications, slack: checked }
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weekly-reports">Weekly Reports</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive weekly SEO performance reports
                  </div>
                </div>
                <Switch 
                  id="weekly-reports"
                  checked={userSettings.notifications.weeklyReports}
                  onCheckedChange={(checked) => handleUpdateUserSettings({
                    notifications: { ...userSettings.notifications, weeklyReports: checked }
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="critical-issues">Critical Issues</Label>
                  <div className="text-sm text-muted-foreground">
                    Immediate alerts for critical SEO issues
                  </div>
                </div>
                <Switch 
                  id="critical-issues"
                  checked={userSettings.notifications.criticalIssues}
                  onCheckedChange={(checked) => handleUpdateUserSettings({
                    notifications: { ...userSettings.notifications, criticalIssues: checked }
                  })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Manage your API keys and usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input 
                    id="api-key" 
                    value={apiSettings.key} 
                    readOnly 
                    className="font-mono"
                  />
                  <Button variant="outline" onClick={handleRegenerateAPIKey}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Keep this key secure. Do not share it publicly.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>API Usage</Label>
                  <div className="text-2xl font-bold">{apiSettings.usage.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">requests this month</p>
                </div>
                <div className="space-y-2">
                  <Label>Monthly Limit</Label>
                  <div className="text-2xl font-bold">{apiSettings.limit.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">total requests</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Last Used</Label>
                <p className="text-sm">{new Date(apiSettings.lastUsed).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Site Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Site</DialogTitle>
            <DialogDescription>Update site information and settings.</DialogDescription>
          </DialogHeader>
          {editingSite && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-site-name">Site Name</Label>
                  <Input 
                    id="edit-site-name" 
                    value={editingSite.name}
                    onChange={(e) => setEditingSite(prev => prev ? { ...prev, name: e.target.value } : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-site-category">Category</Label>
                  <Select 
                    value={editingSite.category}
                    onValueChange={(value) => setEditingSite(prev => prev ? { ...prev, category: value } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="blog">Blog</SelectItem>
                      <SelectItem value="portfolio">Portfolio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-site-url">URL</Label>
                <Input 
                  id="edit-site-url" 
                  value={editingSite.url}
                  onChange={(e) => setEditingSite(prev => prev ? { ...prev, url: e.target.value } : null)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-site-description">Description</Label>
                <Textarea 
                  id="edit-site-description" 
                  value={editingSite.description}
                  onChange={(e) => setEditingSite(prev => prev ? { ...prev, description: e.target.value } : null)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-audit-schedule">Audit Schedule</Label>
                <Select 
                  value={editingSite.auditSchedule}
                  onValueChange={(value) => setEditingSite(prev => prev ? { ...prev, auditSchedule: value as "daily" | "weekly" | "monthly" } : null)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditSite}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}