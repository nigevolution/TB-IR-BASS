const produtos = [
  {
    nome:"Bass Mods IR",
    preco:49,
    link:"https://pay.cakto.com.br/rtuwa88_720263",
    desc:"Grave definido, ataque rápido e presença moderna.",
    audio:"/audio/bass-mods.mp3"
  },
  {
    nome:"Fender Ultra 2 IR",
    preco:49,
    link:"https://pay.cakto.com.br/w3x2i3r_700686",
    desc:"Timbre limpo, quente e equilibrado.",
    audio:"/audio/fender-ultra-ii.mp3"
  },
  {
    nome:"Music Man IR",
    preco:49,
    link:"https://pay.cakto.com.br/n9ji2mm_700692",
    desc:"Punch agressivo, slap estalado e presença absurda.",
    audio:"/audio/music-man.mp3"
  },
  {
    nome:"Sadowsky M5 IR",
    preco:59,
    link:"https://pay.cakto.com.br/36243of_6",
    desc:"Grave cheio, médios polidos e definição premium.",
    audio:"/audio/sadowsky-m5.mp3"
  },
  {
    nome:"Sadowsky Metroline IR",
    preco:39,
    link:"https://pay.cakto.com.br/yaueq45_665688",
    desc:"Timbre clássico, suave e musical.",
    audio:"/audio/sadowsky-metroline.mp3"
  },

  /* 🔥 LANÇAMENTOS */
  {
    nome:"Lakland SS44-75 IR",
    preco:59,
    link:"https://pay.cakto.com.br/wgonjnx_723722",
    desc:"Boutique americano com punch absurdo, slap cristalino e médios vivos.",
    status:"LANÇAMENTO",
    audio:"/audio/lakland-sl-44-75.mp3"
  },
  {
    nome:"Sadowsky NYC IR",
    preco:null,
    link:null,
    desc:"Flagship nova-iorquino com graves profundos e brilho cristalino.",
    status:"LANÇAMENTO",
    audio:"/audio/sadowsky-nyc.mp3"
  },
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
    desc:"Médio encorpado e ataque metálico.",
    audio:"/audio/warwick-corvette.mp3"
  },
  {
    nome:"Ken Smith IR",
    preco:69,
    link:"https://pay.cakto.com.br/zy8esjf_719715",
    desc:"Resposta hi-fi, ultra definição e sustain perfeito.",
    audio:"/audio/ken-smith.mp3"
  }
];

const grid = document.getElementById("produtos");

/* 🔇 PARA TODOS OS ÁUDIOS */
function stopAllAudios(){
  document.querySelectorAll("audio").forEach(a=>{
    a.pause();
    a.currentTime = 0;
  });
}

produtos.forEach(p=>{
  const card = document.createElement("div");
  card.className = "card";

  let html = `
    ${p.status ? `<div class="badge">NOVO</div>` : ``}
    <h3>${p.nome}</h3>
    <p>${p.desc}</p>
  `;

  if(p.preco){
    html += `<div class="price">R$ ${p.preco.toFixed(2).replace(".",",")}</div>`;
  }

  /* ▶️ PLAYER DE PREVIEW */
  if(p.audio){
    html += `
      <div class="audio-wrap">
        <audio preload="none">
          <source src="${p.audio}" type="audio/mpeg">
        </audio>
        <button class="play-btn">▶ Preview 30s</button>
      </div>
    `;
  }

  if(p.status){
    html += `<div class="status">${p.status}</div>`;
  }

  if(p.link){
    html += `<button onclick="window.open('${p.link}')">Comprar agora</button>`;
  }

  card.innerHTML = html;
  grid.appendChild(card);
});

/* 🎧 CONTROLE DE PLAY (FUNCIONA EM TODOS OS NAVEGADORES) */
document.addEventListener("click", e=>{
  if(e.target.classList.contains("play-btn")){
    const audio = e.target.previousElementSibling;

    stopAllAudios();
    audio.currentTime = 0;
    audio.play();

    audio.ontimeupdate = () => {
      if(audio.currentTime >= 30){
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }
});

/* 🎨 ESTILO DO PLAYER */
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
