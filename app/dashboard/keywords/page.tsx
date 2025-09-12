import { redirect } from "next/navigation"
import { createClient } from "@/lib/server"
import { DashboardLayout } from "@/components/dashboard-layout"
import { KeywordTracking } from "@/components/keyword-tracking"

export default async function KeywordsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/signin")
  }

  return (
    <DashboardLayout>
      <KeywordTracking />
    </DashboardLayout>
  )
}
