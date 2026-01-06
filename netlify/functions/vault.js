const { createClient } = require("@supabase/supabase-js")

const MAP = {
  "94f3k1": "fender_ultra.wav"
}

exports.handler = async (event) => {
  try {
    const id = event.queryStringParameters && event.queryStringParameters.id
    if (!id || !MAP[id]) {
      return { statusCode: 403, body: "Acesso negado" }
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data, error } = await supabase.storage
      .from("vault")
      .download(MAP[id])

    if (error || !data) {
      return { statusCode: 404, body: "Arquivo não encontrado" }
    }

    const buffer = Buffer.from(await data.arrayBuffer())

    return {
      statusCode: 200,
      headers: {
  "Content-Type": "audio/wav",
  "Content-Disposition": "inline; filename=ir.wav",
  "Cache-Control": "no-store, no-cache, must-revalidate",
  "Pragma": "no-cache",
  "Expires": "0",
  "Access-Control-Allow-Origin": "*"
}
