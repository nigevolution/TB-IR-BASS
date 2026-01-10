const produtos = [
  {
    nome:"Bass Mods IR",
    preco:49,
    link:"https://mpago.la/1cvainu",
    desc:"Grave definido, ataque rápido e presença moderna."
  },
  {
    nome:"Fender Ultra 2 IR",
    preco:49,
    link:"https://pay.cakto.com.br/w3x2i3r_700686",
    desc:"Timbre limpo, quente e equilibrado."
  },
  {
    nome:"Sadowsky M5 IR",
    preco:49,
    link:"https://pay.cakto.com.br/36243of_6",
    desc:"Grave cheio, médios polidos e definição premium."
  },
  {
    nome:"Sadowsky Metroline IR",
    preco:39,
    link:"https://pay.cakto.com.br/yaueq45_665688",
    desc:"Timbre clássico, suave e musical."
  },

  // LANÇAMENTOS PREMIUM
  {
    nome:"Lakland SS44-75 IR",
    preco:null,
    link:null,
    desc:"Boutique americano com punch absurdo, slap cristalino e médios vivos.",
    status:"LANÇAMENTO EM BREVE"
  },
  {
    nome:"Sadowsky NYC IR",
    preco:null,
    link:null,
    desc:"Flagship nova-iorquino com graves profundos e brilho cristalino.",
    status:"LANÇAMENTO EM BREVE"
  },
  {
    nome:"MTD 535-24 IR",
    preco:null,
    link:null,
    desc:"Boutique luthier com dinâmica extrema e médios orgânicos.",
    status:"LANÇAMENTO EM BREVE"
  },
  {
    nome:"Mayones Jabba 5 IR",
    preco:null,
    link:null,
    desc:"Flagship europeu com profundidade e definição profissional.",
    status:"LANÇAMENTO EM BREVE"
  },

  {
    nome:"Warwick Corvette IR",
    preco:69,
    link:"https://mpago.la/234okPL",
    desc:"Médio encorpado e ataque metálico."
  },
  {
    nome:"Ken Smith IR",
    preco:69,
    link:"https://mpago.la/1WpXcYY",
    desc:"Resposta hi-fi, ultra definição e sustain perfeito."
  }
];

const grid = document.getElementById("produtos");

produtos.forEach(p=>{
  const card = document.createElement("div");
  card.className="card";

  let botao = p.link
    ? `<button onclick="window.open('${p.link}')">Comprar agora</button>`
    : `<div style="margin-top:10px;font-weight:bold;color:#ffcc00">${p.status}</div>`;

  let preco = p.preco !== null
    ? `<div class="price">R$ ${p.preco.toFixed(2).replace(".",",")}</div>`
    : "";

  card.innerHTML = `
    <h3>${p.nome}</h3>
    <p>${p.desc}</p>
    ${preco}
    ${botao}
  `;
  grid.appendChild(card);
});

// =======================
// WHATSAPP ELBS (direita)
// =======================
const zap1 = document.createElement("a");
zap1.href = "https://wa.me/qr/S2YUU3XBMXFCI1";
zap1.target = "_blank";
zap1.id = "zap-elbs";
zap1.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg">`;
document.body.appendChild(zap1);

// =======================
// WHATSAPP SILAS (esquerda)
// =======================
const zap2 = document.createElement("a");
zap2.href = "https://wa.me/qr/LG6FOBKIZD5QC1";
zap2.target = "_blank";
zap2.id = "zap-silas";
zap2.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg">`;
document.body.appendChild(zap2);

// =======================
// ESTILOS DOS BOTÕES
// =======================
const css = document.createElement("style");
css.innerHTML = `
#zap-elbs, #zap-silas{
  position:fixed;
  bottom:22px;
  width:62px;
  height:62px;
  background:#25D366;
  border-radius:50%;
  box-shadow:0 0 25px rgba(37,211,102,.7);
  z-index:99999;
  display:flex;
  align-items:center;
  justify-content:center;
  animation:zapFloat 1.6s infinite;
}
#zap-elbs{ right:22px; }
#zap-silas{ left:22px; }

#zap-elbs img, #zap-silas img{ width:36px;height:36px }

@keyframes zapFloat{
  0%{transform:translateY(0)}
  50%{transform:translateY(-6px)}
  100%{transform:translateY(0)}
}
`;
document.head.appendChild(css);
