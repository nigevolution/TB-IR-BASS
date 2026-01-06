import { createClient } from "@supabase/supabase-js"

export const handler = async (event) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const code = event.path.split("/").pop()

  const { data } = await supabase
    .from("ir_licenses")
    .select("*")
    .eq("token", code)
    .single()

  if (!data || data.used || new Date(data.expires_at) < new Date()) {
    return { statusCode: 403, body: "Link expirado" }
  }

  return {
    statusCode: 302,
    headers: {
      Location: `/.netlify/functions/vault?token=${code}`
    }
  }
}
