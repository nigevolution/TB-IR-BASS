import fs from "fs";
import path from "path";
import crypto from "crypto";

export async function handler(event) {

  const id = event.queryStringParameters?.id;
  if (!id) {
    return { statusCode: 400, body: "ID não informado." };
  }

  // IR base protegido (seu IR original)
  const baseIR = path.join(process.cwd(), "protected/vault/fender_ultra.wav");

  if (!fs.existsSync(baseIR)) {
    return { statusCode: 500, body: "IR base não encontrado." };
  }

  const raw = fs.readFileSync(baseIR);

  // 🔐 watermark invisível
  const signature = crypto.createHash("sha256")
    .update(id + Date.now().toString())
    .digest("hex")
    .slice(0, 32);

  const watermark = Buffer.from("\nTBIR:" + signature + "\n");

  const finalIR = Buffer.concat([raw, watermark]);

  const filename = `${id}.wav`;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "audio/wav",
      "Content-Disposition": `attachment; filename="${filename}"`
    },
    body: finalIR.toString("base64"),
    isBase64Encoded: true
  };
}
