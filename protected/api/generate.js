import { generateClientIR } from "../generate.js";
import fs from "fs";
import path from "path";

export async function handler(event) {
  const q = event.queryStringParameters;
  if(!q.name||!q.email||!q.phone||!q.device)
    return { statusCode:400, body:"Missing fields" };

  const id = generateClientIR(q.name,q.email,q.phone,q.device);
  const file = path.join(process.cwd(), "protected/clients", `${id}.wav`);

  return {
    statusCode:200,
    headers:{
      "Content-Type":"audio/wav",
      "Content-Disposition":`attachment; filename=${id}.wav`
    },
    body: fs.readFileSync(file).toString("base64"),
    isBase64Encoded:true
  };
}
