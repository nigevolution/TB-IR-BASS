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

  /* LANÇAMENTO COM ÁUDIO */
  {
    nome:"Lakland SS44-75 IR",
    preco:59,
    link:"https://pay.cakto.com.br/wgonjnx_723722",
    desc:"Boutique americano com punch absurdo, slap cristalino e médios vivos.",
    status:"LANÇAMENTO",
    audio:"/audio/lakland-sl-44-75.mp3"
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

/* PARA TODOS OS ÁUDIOS */
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

  /* PLAYER CORRETO */
  if(p.audio){
    html += `
      <div class="audio-wrap">
        <audio preload="none" data-preview>
          <source src="${p.audio}" type="audio/mpeg">
        </audio>
        <button class="play-btn">▶ Preview 30s</button>
      </div>
      <div class="status">${p.status}</div>
    `;
  }

  if(p.link){
    html += `<button onclick="window.open('${p.link}')">Comprar agora</button>`;
  }

  card.innerHTML = html;
  grid.appendChild(card);
});

/* CONTROLE DE PLAY (CORRETO) */
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

/* ESTILO */
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
