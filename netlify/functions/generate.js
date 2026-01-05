const fs = require("fs")
const path = require("path")

exports.handler = async (event) => {
  const { file } = event.queryStringParameters
  const filePath = path.join(__dirname,"../../public/vault",file)

  if(!fs.existsSync(filePath))
    return { statusCode:403, body:"Link expirado" }

  const data = fs.readFileSync(filePath)
  fs.unlinkSync(filePath)

  return {
    statusCode:200,
    headers:{
      "Content-Type":"audio/wav",
      "Content-Disposition":"inline",
      "Cache-Control":"no-store"
    },
    body:data.toString("base64"),
    isBase64Encoded:true
  }
}
