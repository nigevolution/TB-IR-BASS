exports.handler = async (event) => {
  const { file } = event.queryStringParameters || {}

  if (!file) {
    return { statusCode: 400, body: "Arquivo não informado" }
  }

  const fileUrl = `https://tb-ir-bass.netlify.app/vault/${file}`

  const res = await fetch(fileUrl)

  if (!res.ok) {
    return { statusCode: 404, body: "Cofre não encontrado" }
  }

  const buffer = await res.arrayBuffer()
  const base64 = Buffer.from(buffer).toString("base64")

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "audio/wav",
      "Content-Disposition": "inline",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*"
    },
    body: base64,
    isBase64Encoded: true
  }
}
