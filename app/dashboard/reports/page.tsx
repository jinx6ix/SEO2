import { redirect } from "next/navigation"
import { createClient } from "@/lib/server"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ReportsManagement } from "@/components/reports-management"

export default async function ReportsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/signin")
  }

  return (
    <DashboardLayout>
      <ReportsManagement />
    </DashboardLayout>
  )
}
