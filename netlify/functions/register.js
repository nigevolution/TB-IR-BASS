const fs=require("fs")
const path=require("path")

exports.handler=async (e)=>{
 const {nome,email,zap}=e.queryStringParameters
 if(!nome||!email||!zap) return {statusCode:400,body:"Dados incompletos"}

 const dbp=path.join(__dirname,"../db.json")
 const db=JSON.parse(fs.readFileSync(dbp))
 const id="TB"+Math.random().toString(36).substr(2,5).toUpperCase()

 db.push({id,nome,email,zap,data:new Date().toLocaleString(),blocked:false})
 fs.writeFileSync(dbp,JSON.stringify(db,null,2))

 return {
  statusCode:302,
  headers:{Location:`/.netlify/functions/import?id=${id}`}
 }
}
