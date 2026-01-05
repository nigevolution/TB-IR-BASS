import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const id = req.query.id;

  if (!id) {
    return res.status(400).send("ID inválido");
  }

  const clientPath = path.join(process.cwd(), "protected", id);

  if (!fs.existsSync(clientPath)) {
    return res.status(403).send("Licença não encontrada");
  }

  const irFile = path.join(process.cwd(), "protected", "vault", "fender_ultra.wav");

  if (!fs.existsSync(irFile)) {
    return res.status(404).send("IR não encontrado");
  }

  res.setHeader("Content-Type", "audio/wav");
  res.setHeader("Content-Disposition", 'attachment; filename="TB-IR.wav"');

  res.send(fs.readFileSync(irFile));
}
