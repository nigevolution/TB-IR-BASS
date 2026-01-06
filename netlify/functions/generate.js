import { createClient } from "@supabase/supabase-js"
import crypto from "crypto"

export const handler = async (event) => {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

  const { customer, ir_file, hours } = JSON.parse(event.body)

  const token = crypto.randomBytes(6).toString("hex")

  await supabase.from("ir_licenses").insert({
    customer,
    ir_file,
    token,
    expires_at: new Date(Date.now() + (hours || 12) * 60 * 60 * 1000)
  })

  return {
    statusCode: 200,
    body: JSON.stringify({
      link: `https://tb-ir-bass.netlify.app/.netlify/functions/vault?token=${token}`
    })
  }
}
