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

  /* ===== LANÇAMENTOS COM ÁUDIO ===== */
  {
    nome:"Lakland SS44-75 IR",
    preco:59,
    link:"https://pay.cakto.com.br/wgonjnx_723722",
    desc:"Boutique americano com punch absurdo, slap cristalino e médios vivos.",
    release:"2026-01-13T19:00:00",
    status:"LANÇAMENTO",
    audio:"/audio/lakland-sl-44-75.mp3"
  },
  {
    nome:"Sadowsky NYC IR",
    preco:null,
    link:null,
    desc:"Flagship nova-iorquino com graves profundos e brilho cristalino.",
    release:"2026-01-20T12:00:00",
    status:"LANÇAMENTO",
    audio:"/audio/sadowsky-nyc.mp3"
  },

  /* ===== LANÇAMENTO SEM RELÓGIO ===== */
  {
    nome:"Mayones Jabba 5 IR",
    preco:null,
    link:null,
    desc:"Flagship europeu com profundidade e definição profissional.",
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

/* ===== PARA PARAR OUTROS ÁUDIOS ===== */
function stopAllAudios(){
  document.querySelectorAll("audio").forEach(a=>{
    a.pause();
    a.currentTime = 0;
  });
}

/* ===== MONTAGEM DOS CARDS ===== */
produtos.forEach(p=>{
  const card = document.createElement("div");
  card.className = "card";

  const isNovo = p.status || p.release;

  let html = `
    ${isNovo ? `<div class="badge">NOVO</div>` : ``}
    <h3>${p.nome}</h3>
    <p>${p.desc}</p>
  `;

  if(p.preco){
    html += `<div class="price">R$ ${p.preco.toFixed(2).replace(".",",")}</div>`;
  }

  /* ===== PLAYER DE ÁUDIO (FUNCIONA NO SAFARI) ===== */
  if(p.audio){
    html += `
      <div class="audio-wrap">
        <audio
          controls
          preload="none"
          style="width:100%"
          onplay="stopAllAudios()"
          ontimeupdate="if(this.currentTime > 30){ this.pause(); this.currentTime = 0 }">
          <source src="${p.audio}" type="audio/mpeg">
        </audio>
        <div class="audio-label">▶ Preview 30s</div>
      </div>
    `;
  }

  /* ===== CRONÔMETRO ===== */
  if(p.release){
    html += `
      <div class="countdown"
        data-date="${p.release}"
        data-link="${p.link}"
        data-price="${p.preco}">
        ⏳ 00d 00h 00m 00s
      </div>
      <div class="status">${p.status}</div>
    `;
  }
  else if(p.status){
    html += `<div class="status">${p.status}</div>`;
  }
  else if(p.link){
    html += `<button onclick="window.open('${p.link}')">Comprar agora</button>`;
  }

  card.innerHTML = html;
  grid.appendChild(card);
});

/* ===== CRONÔMETRO EM TEMPO REAL ===== */
function startCountdown(){
  document.querySelectorAll(".countdown").forEach(el=>{
    const target = new Date(el.dataset.date).getTime();

    const timer = setInterval(()=>{
      const diff = target - Date.now();

      if(diff <= 0){
        el.innerHTML = `
          <div class="price">R$ ${Number(el.dataset.price).toFixed(2).replace(".",",")}</div>
          <button onclick="window.open('${el.dataset.link}')">Comprar agora</button>
        `;
        clearInterval(timer);
        return;
      }

      const d = Math.floor(diff / 86400000);
      const h = Math.floor(diff / 3600000 % 24);
      const m = Math.floor(diff / 60000 % 60);
      const s = Math.floor(diff / 1000 % 60);

      el.innerHTML = `⏳ ${d}d ${h}h ${m}m ${s}s`;
    },1000);
  });
}
startCountdown();

/* ===== ESTILOS ===== */
const css = document.createElement("style");
css.innerHTML = `
.audio-wrap{margin-top:14px}
.audio-label{
  margin-top:6px;
  font-size:12px;
  color:#ffb86b;
  font-weight:bold;
}

.badge{
  position:absolute;
  top:14px;
  right:14px;
  background:#ff9a3c;
  color:#2a0f16;
  padding:5px 12px;
  font-size:11px;
  font-weight:bold;
  border-radius:20px;
  animation:pulse 1.6s infinite;
}

.status{
  margin-top:12px;
  font-weight:bold;
  color:#ffb86b;
}

.countdown{
  margin-top:12px;
  font-weight:bold;
  color:#ffb86b;
}

@keyframes pulse{
  0%{transform:scale(1)}
  50%{transform:scale(1.08)}
  100%{transform:scale(1)}
}
`;
document.head.appendChild(css);
