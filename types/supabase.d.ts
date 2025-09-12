import type { UserRole, Plan } from "@/lib/types"

export interface SupabaseUser {
  id: string
  email: string
  user_metadata: {
    full_name?: string
    avatar_url?: string
  }
}

export interface UserProfile {
  id: string
  email: string
  full_name?: string
  role: UserRole
  plan: Plan
  created_at: string
  updated_at: string
}
