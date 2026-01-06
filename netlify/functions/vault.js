const { createClient } = require("@supabase/supabase-js")

exports.handler = async (event) => {
  try {
    const file = event.queryStringParameters?.file

    if (!file) {
      return { statusCode: 400, body: "Arquivo não informado" }
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data, error } = await supabase.storage
      .from("vault")
      .download(file)

    if (error || !data) {
      return { statusCode: 404, body: "Arquivo não encontrado" }
    }

    const buffer = Buffer.from(await data.arrayBuffer())

    return {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        "Content-Type": "audio/wav",
        "Content-Length": buffer.length,
        "Accept-Ranges": "bytes",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*",
        "Content-Disposition": `inline; filename="${file}"`
      },
      body: buffer.toString("base64")
    }
  } catch (e) {
    return { statusCode: 500, body: "Erro interno: " + e.message }
  }
}
