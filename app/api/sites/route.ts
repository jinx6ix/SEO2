import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/server"
import { z } from "zod"

const createSiteSchema = z.object({
  name: z.string().min(1, "Site name is required"),
  url: z.string().url("Invalid URL format"),
  description: z.string().optional(),
})

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: sites, error } = await supabase
      .from("sites")
      .select(`
        *,
        audits:audits(*, created_at),
        keywords:keywords(*),
        audit_count:audits(count),
        keyword_count:keywords(count)
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: "Failed to fetch sites" }, { status: 500 })
    }

    return NextResponse.json(sites)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, url, description } = createSiteSchema.parse(body)

    const { data: site, error } = await supabase
      .from("sites")
      .insert({
        name,
        url,
        description,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: "Failed to create site" }, { status: 500 })
    }

    return NextResponse.json(site, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
