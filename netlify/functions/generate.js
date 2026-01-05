const fs = require("fs")
const path = require("path")

exports.handler = async (event) => {
  const { file } = event.queryStringParameters || {}

  if (!file) {
    return { statusCode: 400, body: "Arquivo não informado" }
  }

  const filePath = path.join(__dirname, "../../public/vault", file)

  if (!fs.existsSync(filePath)) {
    return { statusCode: 404, body: "Cofre não encontrado" }
  }

  const data = fs.readFileSync(filePath)

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "audio/wav",
      "Content-Disposition": "inline",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*"
    },
    body: data.toString("base64"),
    isBase64Encoded: true
  }
}
