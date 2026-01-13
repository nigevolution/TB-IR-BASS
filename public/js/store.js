const produtos = [
  {
    nome:"Bass Mods IR",
    preco:49,
    link:"https://pay.cakto.com.br/rtuwa88_720263",
    desc:"Grave definido, ataque rápido e presença moderna."
  },
  {
    nome:"Fender Ultra 2 IR",
    preco:49,
    link:"https://pay.cakto.com.br/w3x2i3r_700686",
    desc:"Timbre limpo, quente e equilibrado."
  },
  {
    nome:"Music Man IR",
    preco:49,
    link:"https://pay.cakto.com.br/n9ji2mm_700692",
    desc:"Punch agressivo, slap estalado e presença absurda."
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

  /* ===== LANÇAMENTOS COM CONTADOR ===== */

  {
    nome:"Lakland SS44-75 IR",
    preco:null,
    link:null,
    desc:"Boutique americano com punch absurdo, slap cristalino e médios vivos.",
    status:"LANÇAMENTO",
    release:"2026-01-13T19:00:00"
  },
  {
    nome:"Sadowsky NYC IR",
    preco:null,
    link:null,
    desc:"Flagship nova-iorquino com graves profundos e brilho cristalino.",
    status:"LANÇAMENTO",
    release:"2026-01-20T12:00:00"
  },
  {
    nome:"MTD 535-24 IR",
    preco:null,
    link:null,
    desc:"Boutique luthier com dinâmica extrema e médios orgânicos.",
    status:"LANÇAMENTO EM BREVE",
  },
  {
    nome:"Mayones Jabba 5 IR",
    preco:null,
    link:null,
    desc:"Flagship europeu com profundidade e definição profissional.",
    status:"LANÇAMENTO EM BREVE",
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

/* ===== CRIA OS CARDS ===== */
produtos.forEach(p=>{
  const card = document.createElement("div");
  card.className = "card";

  let preco = p.preco !== null
    ? `<div class="price">R$ ${p.preco.toFixed(2).replace(".",",")}</div>`
    : "";

  let botao = "";

  if(p.link){
    botao = `<button onclick="window.open('${p.link}')">Comprar agora</button>`;
  } else if(p.release){
    botao = `
      <div class="countdown" data-date="${p.release}">
        ⏳ 00d 00h 00m 00s
      </div>
      <div class="status">${p.status}</div>
    `;
  }

  card.innerHTML = `
    <h3>${p.nome}</h3>
    <p>${p.desc}</p>
    ${preco}
    ${botao}
  `;

  grid.appendChild(card);
});

/* ===== CONTADOR EM TEMPO REAL ===== */
function startCountdown(){
  document.querySelectorAll(".countdown").forEach(el=>{
    const target = new Date(el.dataset.date).getTime();

    const timer = setInterval(()=>{
      const now = Date.now();
      const diff = target - now;

      if(diff <= 0){
        el.innerHTML = "🚀 DISPONÍVEL AGORA";
        clearInterval(timer);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      el.innerHTML = `⏳ ${d}d ${h}h ${m}m ${s}s`;
    }, 1000);
  });
}

startCountdown();
