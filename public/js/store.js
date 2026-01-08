function crc16(str) {
  let crc = 0xFFFF;
  for (let c = 0; c < str.length; c++) {
    crc ^= str.charCodeAt(c) << 8;
    for (let i = 0; i < 8; i++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, "0");
}

function gerarPix(valor,produto){
 const valorStr = valor.toFixed(2);
 let payload =
 "00020126360014br.gov.bcb.pix0114+5565996716895" +
 "52040000" +
 "5303986" +
 `54${valorStr.length.toString().padStart(2,"0")}${valorStr}` +
 "5802BR" +
 "5919Elbs Ferreira Nobre" +
 "6013Varzea Grande" +
 `62100506TB${produto.replace(/[^A-Z0-9]/gi,"").substring(0,10)}`;
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
  const div = document.createElement("div");
  div.className="card";
  div.innerHTML = `
    <h3>${p.nome}</h3>
    <p class="desc">${p.desc}</p>
    <div class="price">R$ ${p.preco.toFixed(2).replace(".",",")}</div>
    <div class="paybtns">
      <button class="pix" onclick="abrirPix('${p.nome}',${p.preco})">PIX</button>
    </div>
  `;
  grid.appendChild(div);
});

function abrirPix(produto,valor){
  const codigo = gerarPix(valor,produto);
  const modal = document.createElement("div");
  modal.style = "position:fixed;inset:0;background:#000c;display:flex;align-items:center;justify-content:center;z-index:999";
  modal.innerHTML = `
    <div style="background:#111;padding:30px;border-radius:20px;text-align:center;max-width:320px">
      <h3>${produto}</h3>
      <p><b>R$ ${valor.toFixed(2).replace(".",",")}</b></p>
      <textarea style="width:100%;height:120px">${codigo}</textarea>
      <button onclick="navigator.clipboard.writeText('${codigo}')">Copiar PIX</button><br><br>
      <button onclick="this.parentNode.parentNode.remove()">Fechar</button>
    </div>`;
  document.body.appendChild(modal);
}
