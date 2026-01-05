import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function handler(event) {
  const { name, email, phone } = event.queryStringParameters

  if (!name || !email) {
    return { statusCode: 400, body: "Dados inválidos" }
  }

  await supabase.from('clients').insert([{
    id: name.replace(/\s+/g, '_'),
    nome: name,
    email,
    zap: phone
  }])

  const baseIR = fs.readFileSync('./protected/base_ir.wav')
  const output = Buffer.concat([baseIR, Buffer.from(`\nTBIR:${email}`)])

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'audio/wav',
      'Content-Disposition': `attachment; filename="${name}.wav"`
    },
    body: output.toString('base64'),
    isBase64Encoded: true
  }
}
