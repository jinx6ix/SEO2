import { redirect } from "next/navigation"
import { createClient } from "@/lib/server"
import { AdminLayout } from "@/components/admin-layout"
import { UserManagement } from "@/components/user-management"

export default async function AdminUsersPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/signin")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    redirect("/dashboard")
  }

  return (
    <AdminLayout>
      <UserManagement />
    </AdminLayout>
  )
}
