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
    link:"https://mpago.la/1pqvu5J",
    desc:"Timbre limpo, quente e equilibrado."
  },
  {
    nome:"Sadowsky M5 IR",
    preco:49,
    link:"https://mpago.la/2nGQqmt",
    desc:"Grave cheio, médios polidos e definição premium."
  },
  {
    nome:"Sadowsky Metroline IR",
    preco:39,
    link:"https://pagamento.sejaefi.com.br/42719b9c-8306-46ab-af6a-b8fac28e5c79",
    desc:"Timbre clássico, suave e musical."
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
  },
  {
    nome:"Mayones Jabba 5 IR",
    preco:89,
    link:null,
    desc:"Flagship: profundo, cristalino e profissional.",
    status:"LANÇAMENTO EM BREVE"
  }
];

const grid = document.getElementById("produtos");

produtos.forEach(p=>{
  const card = document.createElement("div");
  card.className="card";

  let botao = p.link
    ? `<button onclick="window.open('${p.link}')">Comprar agora</button>`
    : `<div style="margin-top:10px;font-weight:bold;color:#ffcc00">${p.status}</div>`;

  card.innerHTML = `
    <h3>${p.nome}</h3>
    <p>${p.desc}</p>
    <div class="price">R$ ${p.preco.toFixed(2).replace(".",",")}</div>
    ${botao}
  `;
  grid.appendChild(card);
});


// 🔥 BOTÃO WHATSAPP GLOBAL
const zap = document.createElement("a");
zap.href = "https://wa.me/qr/S2YUU3XBMXFCI1";
zap.target = "_blank";
zap.id = "whatsapp-float";
zap.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg">`;
document.body.appendChild(zap);

const css = document.createElement("style");
css.innerHTML = `
#whatsapp-float{
  position:fixed;
  right:22px;
  bottom:22px;
  width:66px;
  height:66px;
  background:#25D366;
  border-radius:50%;
  box-shadow:0 0 30px rgba(37,211,102,.7);
  z-index:99999;
  display:flex;
  align-items:center;
  justify-content:center;
  animation:zapFloat 1.6s infinite;
}
#whatsapp-float img{width:38px;height:38px}
@keyframes zapFloat{
  0%{transform:translateY(0)}
  50%{transform:translateY(-6px)}
  100%{transform:translateY(0)}
}
`;
document.head.appendChild(css);
