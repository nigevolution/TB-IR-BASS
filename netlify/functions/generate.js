import fs from "fs"
import path from "path"

export async function handler(event) {

  const { name, email, phone, device } = event.queryStringParameters

  if (!name || !email || !phone || !device) {
    return { statusCode: 400, body: "Dados incompletos" }
  }

  const id = `${name.replace(/\s+/g, "_")}_${Date.now()}`

  const baseIR = path.join(process.cwd(), "protected/vault/fender_ultra.wav")
  const out = path.join("/tmp", `${id}.wav`)

  fs.copyFileSync(baseIR, out)

  const logDir = path.join(process.cwd(), "protected/clients")
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true })

  fs.writeFileSync(path.join(logDir, `${id}.json`), JSON.stringify({
    id, name, email, phone, device, created: new Date().toISOString()
  }, null, 2))

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "audio/wav",
      "Content-Disposition": `attachment; filename="${id}.wav"`
    },
    body: fs.readFileSync(out).toString("base64"),
    isBase64Encoded: true
  }
}
