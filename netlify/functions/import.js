exports.handler=async (e)=>{
 const id=e.queryStringParameters.id
 if(!id) return {statusCode:403,body:"ID inválido"}

 return {
  statusCode:302,
  headers:{
   Location:"https://raw.githubusercontent.com/nigevolution/ir-vault/main/protected/TB-BASS-IR.wav"
  }
 }
}
