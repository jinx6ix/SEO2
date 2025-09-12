import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/server"
import { z } from "zod"

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = signupSchema.parse(body)

    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${process.env.NEXTAUTH_URL}/dashboard`,
        data: {
          full_name: name,
        },
      },
    })

    if (error) {
      console.log("[v0] Signup error:", error.message)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.log("[v0] User created successfully:", data.user?.id)

    return NextResponse.json({
      message: "User created successfully. Please check your email to confirm your account.",
      user: {
        id: data.user?.id,
        name: name,
        email: email,
      },
    })
  } catch (error) {
    console.log("[v0] Signup route error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
