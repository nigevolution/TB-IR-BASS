import { createClient } from "@supabase/supabase-js"

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 200, body: "ok" }
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const payload = JSON.parse(event.body || "{}")
  if (!payload?.data?.id) return { statusCode: 200, body: "ignored" }

  const paymentId = payload.data.id

  // Busca pagamento no Mercado Pago
  const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` }
  })
  const mp = await mpRes.json()

  if (mp.status !== "approved") return { statusCode: 200, body: "pending" }

  const email = mp.payer?.email || "cliente@tbirbass.com"
  const product = mp.additional_info?.items?.[0]?.title || "IR"

  // cria token único
  const token = crypto.randomUUID()

  await supabase.from("ir_licenses").insert({
    email,
    product,
    token,
    used: false,
    expires_at: new Date(Date.now() + 1000 * 60 * 30) // 30 min
  })

  return { statusCode: 200, body: "ok" }
}
