/* ================== PRODUTOS ================== */
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
    desc: "Resposta hi-fi e ultra definição.",
    audio: "/audio/ken-smith.mp3"
  }
];

const grid = document.getElementById("produtos");

/* ================== ÁUDIO ================== */
function stopAllAudios(){
  document.querySelectorAll("audio").forEach(a=>{
    a.pause();
    a.currentTime=0;
  });
}

/* ================== RENDER ================== */
produtos.forEach(p=>{
  const card=document.createElement("div");
  card.className="card";
  let html=`<h3>${p.nome}</h3><p>${p.desc}</p>`;

  if(p.audio){
    html+=`
      <audio preload="none" ontimeupdate="if(this.currentTime>=30){this.pause();this.currentTime=0}">
        <source src="${p.audio}">
      </audio>
      <button onclick="stopAllAudios();this.previousElementSibling.play()">▶ Preview 30s</button>
    `;
  }

  if(p.release){
    html+=`<div class="countdown" data-date="${p.release}">⏳ carregando...</div>`;
  }

  if(p.preco && !p.release){
    html+=`<div class="price">R$ ${p.preco.toFixed(2).replace(".",",")}</div>
    <button onclick="window.open('${p.link}')">Comprar agora</button>`;
  }

  card.innerHTML=html;
  grid.appendChild(card);
});

/* ================== CRONÔMETRO ================== */
setInterval(()=>{
  document.querySelectorAll(".countdown").forEach(el=>{
    const diff=new Date(el.dataset.date)-Date.now();
    if(diff<=0){el.innerHTML="🔥 DISPONÍVEL";return;}
    const d=Math.floor(diff/86400000);
    const h=Math.floor(diff/3600000)%24;
    const m=Math.floor(diff/60000)%60;
    const s=Math.floor(diff/1000)%60;
    el.innerHTML=`⏳ ${d}d ${h}h ${m}m ${s}s`;
  });
},1000);
