export type UserRole = "USER" | "ADMIN"
export type Plan = "FREE" | "PRO" | "ENTERPRISE"
export type AuditStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED"
export type ReportType = "SEO_AUDIT" | "KEYWORD_REPORT" | "PERFORMANCE_REPORT"

export interface User {
  id: string
  email: string
  full_name?: string
  role: UserRole
  plan: Plan
  created_at: string
  updated_at: string
}

export interface Site {
  id: string
  name: string
  url: string
  description?: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface Keyword {
  id: string
  keyword: string
  site_id: string
  user_id: string
  position?: number
  volume?: number
  difficulty?: number
  created_at: string
  updated_at: string
}

export interface Audit {
  id: string
  site_id: string
  user_id: string
  status: AuditStatus
  score?: number
  issues?: any
  recommendations?: any
  created_at: string
  updated_at: string
}

export interface Report {
  id: string
  title: string
  type: ReportType
  site_id: string
  user_id: string
  data?: any
  created_at: string
  updated_at: string
}
