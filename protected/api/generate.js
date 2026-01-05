import { generateClientIR } from '../generate.js'
import path from 'path'

export async function handler(event) {
  const client = event.queryStringParameters.id

  const base = path.join(process.cwd(), 'protected/vault/fender_ultra.wav')
  const out  = path.join('/tmp', `${client}.wav`)

  generateClientIR(client, base, out)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'audio/wav',
      'Content-Disposition': `attachment; filename="${client}.wav"`
    },
    body: Buffer.from(require('fs').readFileSync(out)).toString('base64'),
    isBase64Encoded: true
  }
}
