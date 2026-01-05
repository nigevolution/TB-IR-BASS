const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

exports.handler = async (event) => {
  const file = event.queryStringParameters?.file

  if (!file) {
    return { statusCode: 400, body: "Arquivo não informado" }
  }

  const { data, error } = await supabase.storage
    .from("vault")
    .download(file)

  if (error) {
    return { statusCode: 404, body: "Cofre não encontrado" }
  }

  const buffer = Buffer.from(await data.arrayBuffer())

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "audio/wav",
      "Content-Disposition": "inline",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*"
    },
    body: buffer.toString("base64"),
    isBase64Encoded: true
  }
}
