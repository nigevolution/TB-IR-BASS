import { createClient } from "@supabase/supabase-js"

export const handler = async (event) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const token = event.queryStringParameters && event.queryStringParameters.token
  if (!token) return { statusCode: 403, body: "Token inválido" }

  const { data: lic } = await supabase
    .from("ir_licenses")
    .select("*")
    .eq("token", token)
    .single()

  if (!lic || lic.used || new Date(lic.expires_at) < new Date()) {
    return { statusCode: 403, body: "Link expirado" }
  }

  async function findFileRecursive(path = "") {
    const { data: list } = await supabase.storage.from("vault").list(path)
    for (const f of list) {
      if (f.id === null) {
        const found = await findFileRecursive(path + f.name + "/")
        if (found) return found
      } else {
        if (f.name.toLowerCase() === lic.ir_file.toLowerCase()) {
          return path + f.name
        }
      }
    }
    return null
  }

  const foundPath = await findFileRecursive("")
  if (!foundPath) return { statusCode: 404, body: "IR não encontrado no cofre" }

  const { data, error } = await supabase.storage.from("vault").download(foundPath)
  if (error || !data) return { statusCode: 404, body: "IR não encontrado no cofre" }

  const buffer = Buffer.from(await data.arrayBuffer())

  // marca como usado
  await supabase.from("ir_licenses").update({ used: true }).eq("token", token)

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "audio/wav",
      "Content-Disposition": "inline; filename=ir.wav",
      "Cache-Control": "no-store, no-cache",
      "Pragma": "no-cache",
      "Expires": "0"
    },
    body: buffer.toString("base64"),
    isBase64Encoded: true
  }
}
