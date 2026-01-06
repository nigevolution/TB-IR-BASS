const { createClient } = require("@supabase/supabase-js")

const MAP = {
  "94f3k1": "fender_ultra.wav",
  "k7d92x": "mesa_boogie.wav",
  "q91axp": "darkglass.wav"
}

exports.handler = async (event) => {
  const id = event.queryStringParameters?.id
  if (!id || !MAP[id]) return { statusCode: 403, body: "Acesso negado" }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const { data } = await supabase.storage.from("vault").download(MAP[id])
  const buffer = Buffer.from(await data.arrayBuffer())

  return {
    statusCode: 200,
    isBase64Encoded: true,
    headers: {
      "Content-Type": "audio/wav",
      "Content-Disposition": "inline",
      "Accept-Ranges": "bytes",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*"
    },
    body: buffer.toString("base64")
  }
}
