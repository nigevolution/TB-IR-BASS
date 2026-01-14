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

  /* ===== LANÇAMENTOS COM ÁUDIO ===== */
  {
    nome:"Lakland SS44-75 IR",
    preco:59,
    link:"https://pay.cakto.com.br/wgonjnx_723722",
    desc:"Boutique americano com punch absurdo, slap cristalino e médios vivos.",
    release:"2026-01-13T19:00:00",
    status:"LANÇAMENTO",
    audio:"audio/lakland-sl-44-75.wav"
  },

  {
    nome:"Sadowsky NYC IR",
    preco:null,
    link:null,
    desc:"Flagship nova-iorquino com graves profundos e brilho cristalino.",
    release:"2026-01-20T12:00:00",
    status:"LANÇAMENTO",
    audio:"audio/sadowsky-nyc.wav"
  },

  {
    nome:"MTD 535-24 IR",
    preco:null,
    link:null,
    desc:"Boutique luthier com dinâmica extrema e médios orgânicos.",
    status:"LANÇAMENTO EM BREVE"
  }
];

const grid = document.getElementById("produtos");

/* ===== CONTROLE DE ÁUDIO ===== */
function stopAllAudios(){
  document.querySelectorAll("audio").forEach(a=>{
    a.pause();
    a.currentTime = 0;
  });
}

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

  /* ===== PLAYER DE ÁUDIO (30s) ===== */
  if(p.audio){
    html += `
      <div class="audio-wrap">
        <audio preload="none"
          onplay="stopAllAudios(); this.play();"
          ontimeupdate="if(this.currentTime > 30){ this.pause(); this.currentTime = 0 }">
          <source src="${p.audio}">
        </audio>
        <button class="play-btn" onclick="this.previousElementSibling.play()">▶ Preview 30s</button>
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

/* ===== CRONÔMETRO ===== */
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

/* ===== ESTILO PLAYER ===== */
const css = document.createElement("style");
css.innerHTML = `
.audio-wrap{margin-top:14px}
.play-btn{
  background:#ff9a3c;
  border:none;
  border-radius:20px;
  padding:8px 16px;
  font-weight:bold;
  cursor:pointer;
}
`;
document.head.appendChild(css);
