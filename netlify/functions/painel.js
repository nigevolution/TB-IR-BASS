const fs=require("fs")
const path=require("path")

exports.handler=async()=>{
 const db=JSON.parse(fs.readFileSync(path.join(__dirname,"../db.json")))
 let html="<h1>TB iR-BASS — PAINEL</h1><table border=1 cellpadding=8>"
 html+="<tr><th>ID</th><th>Nome</th><th>Email</th><th>Whats</th><th>Data</th></tr>"
 db.forEach(c=>{
  html+=`<tr><td>${c.id}</td><td>${c.nome}</td><td>${c.email}</td><td>${c.zap}</td><td>${c.data}</td></tr>`
 })
 html+="</table>"
 return {statusCode:200,headers:{'Content-Type':'text/html'},body:html}
}
