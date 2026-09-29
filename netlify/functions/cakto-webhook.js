import { createClient } from "@supabase/supabase-js"
import { sendGa4Purchase } from "./lib/ga4-purchase.mjs"

async function getCaktoAccessToken() {
  if (process.env.CAKTO_TOKEN) return process.env.CAKTO_TOKEN
  const clientId = process.env.CAKTO_CLIENT_ID || process.env.CACKTO_CLIENT_ID
  const clientSecret = process.env.CAKTO_CLIENT_SECRET || process.env.CACKTO_CLIENT_SECRET
  if (!clientId || !clientSecret) throw new Error("Cakto credentials not configured")

  const params = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret
  })
  const response = await fetch("https://api.cakto.com.br/oauth/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: params.toString()
  })
  if (!response.ok) throw new Error(`Cakto OAuth failed: ${response.status}`)
  const data = await response.json()
  const token = data.access_token || data.accessToken || data.token
  if (!token) throw new Error("Cakto OAuth returned no access token")
  return token
}

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
  const caktoToken = await getCaktoAccessToken()
  const res = await fetch(
    `https://api.cakto.com.br/public_api/orders/${encodeURIComponent(orderId)}/`,
    { headers: { Authorization: `Bearer ${caktoToken}` } }
  )
  if (!res.ok) {
    return { statusCode: 502, body: "cakto_order_error" }
  }
  const order = await res.json()

  if (order.status !== "paid") {
    return { statusCode: 200, body: "pending" }
  }

  const email =
    order.customer?.email || "cliente@tbbassir.com.br"

  const product =
    order.product?.name || order.items?.map(i => i.name).join(", ") || "IR Combo"

  const token = crypto.randomUUID()

  await supabase.from("ir_licenses").insert({
    email,
    product,
    token,
    used: false,
    expires_at: new Date(Date.now() + 1000 * 60 * 30)
  })

  try {
    const ga4 = await sendGa4Purchase(order)
    if (!ga4.skipped && !ga4.ok) {
      console.error("GA4 purchase failed", { orderId, status: ga4.status })
    }
  } catch (error) {
    console.error("GA4 purchase error", { orderId, message: error?.message || "unknown" })
  }

  return { statusCode: 200, body: "ok" }
}
