import { redirect } from "next/navigation"
import { createClient } from "@/lib/server"
import { DashboardLayout } from "@/components/dashboard-layout"
import { SitesManagement } from "@/components/sites-management"

export default async function SitesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/signin")
  }

  return (
    <DashboardLayout>
      <SitesManagement />
    </DashboardLayout>
  )
}
