const fs = require("fs")
const path = require("path")

exports.handler = async () => {

  const vaultDir = path.join(__dirname, "../public/vault")

  if (!fs.existsSync(vaultDir)) {
    return { statusCode: 500, body: "Cofre não encontrado" }
  }

  const wavFile = fs.readdirSync(vaultDir)
    .find(f => f.toLowerCase().endsWith(".wav"))

  if (!wavFile) {
    return { statusCode: 404, body: "Nenhum IR disponível" }
  }

  const filePath = path.join(vaultDir, wavFile)

  const data = fs.readFileSync(filePath)

  // 🔥 AUTODESTRUIÇÃO
  fs.unlinkSync(filePath)

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "audio/wav",
      "Content-Disposition": "inline",
      "Cache-Control": "no-store"
    },
    body: data.toString("base64"),
    isBase64Encoded: true
  }
}
