import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/server"
import { z } from "zod"

const createKeywordSchema = z.object({
  keyword: z.string().min(1, "Keyword is required"),
  siteId: z.string().min(1, "Site ID is required"),
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

    const { data: keywords, error } = await supabase
      .from("keywords")
      .select(`
        *,
        sites:site_id(name)
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: "Failed to fetch keywords" }, { status: 500 })
    }

    return NextResponse.json(keywords)
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
    const { keyword, siteId } = createKeywordSchema.parse(body)

    const { data: site, error: siteError } = await supabase
      .from("sites")
      .select("id")
      .eq("id", siteId)
      .eq("user_id", user.id)
      .single()

    if (siteError || !site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 })
    }

    const { data: newKeyword, error } = await supabase
      .from("keywords")
      .insert({
        keyword,
        site_id: siteId,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: "Failed to create keyword" }, { status: 500 })
    }

    return NextResponse.json(newKeyword, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
