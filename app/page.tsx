import { redirect } from "next/navigation"
import { createClient } from "@/lib/server"
import { LandingPage } from "@/components/landing-page"

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (profile?.role === "admin") {
      redirect("/admin")
    } else {
      redirect("/dashboard")
    }
  }

  return <LandingPage />
}
