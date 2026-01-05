import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
)

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")?.toUpperCase()

  if (!code) {
    return NextResponse.json({ error: "missing_code" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("ir_codes")
    .select("*")
    .eq("code", code)
    .eq("active", true)
    .single()

  if (!data || error) {
    return NextResponse.json({ error: "invalid_code" }, { status: 404 })
  }

  await supabase.from("ir_codes").update({ active: false }).eq("code", code)

  const fileUrl = `https://raw.githubusercontent.com/nigevolution/TB-IR-BASS/main/protected/${data.ir_name}.wav`
  const file = await fetch(fileUrl)
  const buffer = await file.arrayBuffer()

  return new Response(buffer, {
    headers: {
      "Content-Type": "audio/wav",
      "Content-Disposition": `attachment; filename="${data.ir_name}.wav"`
    }
  })
}
