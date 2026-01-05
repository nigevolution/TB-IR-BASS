import fs from 'fs'
import crypto from 'crypto'

export function generateClientIR(clientId, baseIRPath, outputPath) {
  const base = fs.readFileSync(baseIRPath)
  const mark = crypto.createHash('sha256').update(clientId).digest()
  const stamped = Buffer.concat([base, mark.slice(0, 64)])
  fs.writeFileSync(outputPath, stamped)
}
