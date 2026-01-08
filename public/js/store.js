function crc16(payload) {
  let polinomio = 0x1021;
  let resultado = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    resultado ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      resultado = (resultado & 0x8000) ? (resultado << 1) ^ polinomio : resultado << 1;
    }
  }
  return (resultado & 0xFFFF).toString(16).toUpperCase().padStart(4, "0");
}

function gerarPix(valor, produto) {
  const nome = "ELBS FERREIRA NOBRE";
  const cidade = "SAO PAULO";
  const chave = "+5565996716895";
  const valorStr = valor.toFixed(2);

  const merchant = `0014br.gov.bcb.pix01${chave.length.toString().padStart(2,"0")}${chave}`;
  const campo26 = `26${merchant.length.toString().padStart(2,"0")}${merchant}`;

  let payload =
    "000201" +
    campo26 +
    "52040000" +
    "5303986" +
    `54${valorStr.length.toString().padStart(2,"0")}${valorStr}` +
    "5802BR" +
    `59${nome.length.toString().padStart(2,"0")}${nome}` +
    `60${cidade.length.toString().padStart(2,"0")}${cidade}` +
    `62${(produto.length+4).toString().padStart(2,"0")}0503${produto}`;

  payload += "6304";
  payload += crc16(payload);
  return payload;
}

const produtos = [
 {nome:"Bass Mods IR",preco:49,desc:"Grave definido, ataque rápido e presença moderna."},
 {nome:"Fender Ultra IR",preco:49,desc:"Timbre limpo, quente e equilibrado para grooves e slap."},
 {nome:"Music Man IR",preco:49,desc:"Médio agressivo, punch moderno e resposta dinâmica."},
 {nome:"Sadowsky M5 IR",preco:49,desc:"Grave cheio, médios polidos e definição premium."},
 {nome:"Sadowsky Metroline IR",preco:39,desc:"Timbre clássico, suave e musical."},
 {nome:"Ken Smith IR",preco:69,desc:"Resposta hi-fi, ultra definição e sustain perfeito."},
 {nome:"Warwick Corvette IR",preco:69,desc:"Timbre pesado, médio encorpado e ataque metálico."},
 {nome:"Mayones Jabba 5 IR",preco:89,desc:"Flagship: profundo, cristalino e profissional."}
];

const grid = document.getElementById("produtos");

produtos.forEach(p=>{
  const d=document.createElement("div");
  d.className="card";
  d.innerHTML=`
    <h3>${p.nome}</h3>
    <p>${p.desc}</p>
    <b>R$ ${p.preco.toFixed(2).replace(".",",")}</b><br>
    <button onclick="abrirPix('${p.nome}',${p.preco})">Pagar com PIX</button>
  `;
  grid.appendChild(d);
});

function abrirPix(produto,valor){
 const code = gerarPix(valor,produto);
 const m=document.createElement("div");
 m.style="position:fixed;inset:0;background:#000c;display:flex;align-items:center;justify-content:center;z-index:999";
 m.innerHTML=`
 <div style="background:#111;padding:30px;border-radius:20px;color:#fff;text-align:center">
  <h3>${produto}</h3>
  <p>Valor: R$ ${valor.toFixed(2)}</p>
  <textarea style="width:260px;height:110px">${code}</textarea><br>
  <button onclick="navigator.clipboard.writeText('${code}')">Copiar PIX</button><br><br>
  <button onclick="this.parentNode.parentNode.remove()">Fechar</button>
 </div>`;
 document.body.appendChild(m);
}
