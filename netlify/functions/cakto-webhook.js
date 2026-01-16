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
  if (!payload?.data?.id) {
    return { statusCode: 200, body: "ignored" }
  }

  const orderId = payload.data.id

  // 🔑 Busca pedido na Cakto
  const res = await fetch(
    `https://api.cakto.com.br/public_api/orders/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CAKTO_TOKEN}`
      }
    }
  )

  const order = await res.json()

  if (order.status !== "paid") {
    return { statusCode: 200, body: "pending" }
  }

  const email =
    order.customer?.email || "cliente@tbbassir.com.br"

  const product =
    order.items?.map(i => i.name).join(", ") || "IR Combo"

  const token = crypto.randomUUID()

  await supabase.from("ir_licenses").insert({
    email,
    product,
    token,
    used: false,
    expires_at: new Date(Date.now() + 1000 * 60 * 30)
  })

  return { statusCode: 200, body: "ok" }
}
