const produtos = [
  {
    nome:"Bass Mods IR",
    preco:49,
    link:null,
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
    preco:59,
    link:"https://pay.cakto.com.br/36243of_6",
    desc:"Grave cheio, médios polidos e definição premium."
  },
  {
    nome:"Sadowsky Metroline IR",
    preco:39,
    link:"https://pay.cakto.com.br/yaueq45_665688",
    desc:"Timbre clássico, suave e musical."
  },

  // LANÇAMENTOS
  {
    nome:"Lakland SS44-75 IR",
    preco:null,
    link:null,
    desc:"Boutique americano com punch absurdo, slap cristalino e médios vivos.",
    status:"LANÇAMENTO"
  },
  {
    nome:"Sadowsky NYC IR",
    preco:null,
    link:null,
    desc:"Flagship nova-iorquino com graves profundos e brilho cristalino.",
    status:"LANÇAMENTO"
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
    link:"https://pay.cakto.com.br/3frq3qm_719724",
    desc:"Médio encorpado e ataque metálico."
  },
  {
    nome:"Ken Smith IR",
    preco:69,
    link:"https://pay.cakto.com.br/zy8esjf_719715",
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

// WHATSAPP ELBS (DIREITA)
const zap1 = document.createElement("a");
zap1.href = "https://wa.me/qr/S2YUU3XBMXFCI1";
zap1.target = "_blank";
zap1.id = "zap-elbs";
zap1.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg">`;
document.body.appendChild(zap1);

// WHATSAPP SILAS (ESQUERDA)
const zap2 = document.createElement("a");
zap2.href = "https://wa.me/qr/LG6FOBKIZD5QC1";
zap2.target = "_blank";
zap2.id = "zap-silas";
zap2.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg">`;
document.body.appendChild(zap2);

// ESTILO DOS BOTÕES + BALÕES
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

.zap-label{
 position:absolute;
 bottom:75px;
 background:#ff7a00;
 color:#000;
 padding:6px 12px;
 border-radius:20px;
 font-weight:bold;
 font-size:13px;
 white-space:nowrap;
 box-shadow:0 0 15px rgba(255,140,0,.6);
 animation:pulseLabel 2s infinite;
}

#zap-elbs .zap-label{right:0;}
#zap-silas .zap-label{left:0;}

@keyframes zapFloat{
 0%{transform:translateY(0)}
 50%{transform:translateY(-6px)}
 100%{transform:translateY(0)}
}
@keyframes pulseLabel{
 0%{transform:scale(1);opacity:.9}
 50%{transform:scale(1.08);opacity:1}
 100%{transform:scale(1);opacity:.9}
}
`;
document.head.appendChild(css);

// LABELS
const elbsLabel = document.createElement("div");
elbsLabel.className = "zap-label";
elbsLabel.innerHTML = "✨ Dúvidas? Fale com <b>Elbs</b>";
zap1.appendChild(elbsLabel);

const silasLabel = document.createElement("div");
silasLabel.className = "zap-label";
silasLabel.innerHTML = "✨ Dúvidas? Fale com <b>Silas</b>";
zap2.appendChild(silasLabel);
