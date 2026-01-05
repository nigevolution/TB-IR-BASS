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
  const log = path.join("/tmp", `${id}.json`)

  // Copia o IR
  fs.copyFileSync(baseIR, out)

  // Registra cliente invisível dentro do WAV
  fs.writeFileSync(log, JSON.stringify({
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
