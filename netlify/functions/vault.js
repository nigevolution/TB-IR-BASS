import { createClient } from "@supabase/supabase-js"

export async function handler(event) {
  try {
    const file = event.queryStringParameters?.file
    if (!file) {
      return { statusCode: 400, body: "Arquivo não informado" }
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data, error } = await supabase
      .storage
      .from("vault")
      .download(file)

    if (error || !data) {
      return { statusCode: 404, body: "Arquivo não encontrado" }
    }

    const buffer = Buffer.from(await data.arrayBuffer())

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "audio/wav",
        "Content-Disposition": `inline; filename="${file}"`,
        "Accept-Ranges": "bytes",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff"
      },
      body: buffer.toString("base64"),
      isBase64Encoded: true
    }

  } catch (e) {
    return { statusCode: 500, body: e.toString() }
  }
}
