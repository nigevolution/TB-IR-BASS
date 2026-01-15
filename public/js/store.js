const produtos = [
  {
    nome: "Bass Mods IR",
    preco: 49,
    link: "https://pay.cakto.com.br/rtuwa88_720263",
    desc: "Grave definido, ataque rápido e presença moderna.",
    audio: "/audio/bass-mods.mp3"
  },
  {
    nome: "Fender Ultra 2 IR",
    preco: 49,
    link: "https://pay.cakto.com.br/w3x2i3r_700686",
    desc: "Timbre limpo, quente e equilibrado.",
    audio: "/audio/fender-ultra-ii.mp3"
  },
  {
    nome: "Music Man IR",
    preco: 49,
    link: "https://pay.cakto.com.br/n9ji2mm_700692",
    desc: "Punch agressivo, slap estalado e presença absurda.",
    audio: "/audio/music-man.mp3"
  },
  {
    nome: "Sadowsky M5 IR",
    preco: 59,
    link: "https://pay.cakto.com.br/36243of_6",
    desc: "Grave cheio, médios polidos e definição premium.",
    audio: "/audio/sadowsky-m5.mp3"
  },
  {
    nome: "Sadowsky Metroline IR",
    preco: 39,
    link: "https://pay.cakto.com.br/yaueq45_665688",
    desc: "Timbre clássico, suave e musical.",
    audio: "/audio/sadowsky-metroline.mp3"
  },
  {
    nome: "Lakland SS44-75 IR",
    preco: 59,
    link: "https://pay.cakto.com.br/wgonjnx_723722",
    desc: "Boutique americano com punch absurdo.",
    audio: "/audio/lakland-sl-44-75.mp3",
    release: "2026-01-13T19:00:00"
  },
  {
    nome: "Sadowsky NYC IR",
    preco: 59,
    link: "https://pay.cakto.com.br/EXEMPLO",
    desc: "Flagship nova-iorquino com graves profundos.",
    audio: "/audio/sadowsky-nyc.mp3",
    release: "2026-01-20T12:00:00"
  },
  {
    nome: "Mayones Jabba 5 IR",
    desc: "Flagship europeu.",
    release: "2026-01-23T19:00:00"
  },
  {
    nome: "MTD 535-24 IR",
    desc: "Boutique luthier.",
    status: "LANÇAMENTO EM BREVE"
  },
  {
    nome: "Warwick Corvette IR",
    preco: 69,
    link: "https://pay.cakto.com.br/3frq3qm_719724",
    desc: "Médio encorpado e ataque metálico.",
    audio: "/audio/warwick-corvette.mp3"
  },
  {
    nome: "Ken Smith IR",
    preco: 69,
    link: "https://pay.cakto.com.br/zy8esjf_719715",
    desc: "Resposta hi-fi, ultra definição.",
    audio: "/audio/ken-smith.mp3"
  }
];

const grid = document.getElementById("produtos");

/* ===== AUDIO ===== */
function stopAllAudios() {
  document.querySelectorAll("audio").forEach(a => {
    a.pause();
    a.currentTime = 0;
  });
}

/* ===== RENDER ===== */
produtos.forEach(p => {
  const card = document.createElement("div");
  card.className = "card";
  let html = `<h3>${p.nome}</h3><p>${p.desc}</p>`;

  if (p.audio) {
    html += `
      <audio preload="metadata">
        <source src="${p.audio}" type="audio/mpeg">
      </audio>
      <button onclick="
        stopAllAudios();
        const a = this.previousElementSibling;
        a.currentTime=0; a.play();
        this.classList.add('playing');
      ">▶ Preview 30s</button>
    `;
  }

  if (p.release) {
    html += `<div class="countdown" data-date="${p.release}" data-link="${p.link}" data-price="${p.preco}">⏳ 00d 00h 00m 00s</div>`;
  }

  if (p.link && !p.release) {
    html += `<button onclick="window.open('${p.link}')">Comprar agora</button>
             <div class="price">R$ ${p.preco.toFixed(2).replace(".",",")}</div>`;
  }

  if (p.status) html += `<div class="status">${p.status}</div>`;

  card.innerHTML = html;
  grid.appendChild(card);
});

/* ===== COUNTDOWN ===== */
function startCountdown(){
  document.querySelectorAll(".countdown").forEach(el=>{
    const t=new Date(el.dataset.date).getTime();
    const i=setInterval(()=>{
      const d=t-Date.now();
      if(d<=0){
        el.outerHTML=`<button onclick="window.open('${el.dataset.link}')">Comprar agora</button>
                      <div class="price">R$ ${Number(el.dataset.price).toFixed(2).replace(".",",")}</div>`;
        clearInterval(i);
      } else {
        const dd=Math.floor(d/86400000),
              h=Math.floor(d/3600000)%24,
              m=Math.floor(d/60000)%60,
              s=Math.floor(d/1000)%60;
        el.innerHTML=`⏳ ${dd}d ${h}h ${m}m ${s}s`;
      }
    },1000);
  });
}
startCountdown();

/* ===== HIGHLIGHT VISUAL ===== */
const css = document.createElement("style");
css.innerHTML = `
.card{position:relative}
.card::after{
  content:"";
  position:absolute;
  inset:-2px;
  border-radius:inherit;
  background:linear-gradient(120deg,#ff9a3c,#ff6a00,#ff9a3c);
  opacity:.18;
  filter:blur(18px);
  animation:pulse 3s infinite;
  pointer-events:none;
}
@keyframes pulse{
  0%,100%{opacity:.15}
  50%{opacity:.35}
}
button.playing{box-shadow:0 0 25px #ff9a3c}
`;
document.head.appendChild(css);
