import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const supabase = createClient(
  'https://zyvqkqpdhwukbxmkgawa.supabase.co',
  'sb_publishable_OT68Y68T113_9msiMlmeZg_ZIv-udl7'
)

export async function handler(event) {
  const { name, email, phone } = event.queryStringParameters

  if (!name || !email || !phone)
    return { statusCode: 400, body: 'Dados obrigatórios' }

  const id = name.replace(/\s+/g, '_') + '_' + Date.now()

  await supabase.from('clients').insert({
    id,
    nome: name,
    email,
    zap: phone
  })

  const baseIR = path.join(process.cwd(), 'protected/vault/fender_ultra.wav')
  const out = `/tmp/${id}.wav`

  fs.copyFileSync(baseIR, out)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'audio/wav',
      'Content-Disposition': `attachment; filename="${id}.wav"`
    },
    body: fs.readFileSync(out).toString('base64'),
    isBase64Encoded: true
  }
}
