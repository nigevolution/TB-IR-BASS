import fs from "fs";
import path from "path";
import crypto from "crypto";

const DB = path.join(process.cwd(), "protected/clients.json");
const BASE = path.join(process.cwd(), "protected/vault/base.wav");
const OUT = path.join(process.cwd(), "protected/clients");

export function generateClientIR(name, email, phone, device) {
  const db = JSON.parse(fs.readFileSync(DB));
  const id = `TB-${String(++db.last).padStart(4,"0")}`;

  const payload = `${id}|${name}|${email}|${phone}|${device}|${Date.now()}`;
  const hash = crypto.createHash("sha256").update(payload).digest("hex");

  const base = fs.readFileSync(BASE);
  const signed = Buffer.concat([
    base,
    Buffer.from(`\nTB-LICENSE:${payload}|${hash}`)
  ]);

  fs.writeFileSync(path.join(OUT, `${id}.wav`), signed);

  db.clients[id] = { name, email, phone, device, hash };
  fs.writeFileSync(DB, JSON.stringify(db, null, 2));

  return id;
}
