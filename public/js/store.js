const PIX_BASE = "00020126360014br.gov.bcb.pix0114+55659967168955204000053039865802BR5919Elbs Ferreira Nobre6009Sao Paulo62290525REC695FD8ED61BB024765269163043415";

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
      <button class="cardbtn" onclick="alert('Cartão em ativação')">Cartão</button>
      <button class="mix" onclick="alert('Mix em ativação')">Mix</button>
    </div>
  `;
  grid.appendChild(div);
});

function gerarPix(valor,produto){
  const cents = Math.round(valor*100).toString().padStart(12,"0");
  const txid = "TB"+Math.floor(Math.random()*9999999);
  return PIX_BASE + `62100506${txid}52040000530398654${cents}6304`;
}

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
