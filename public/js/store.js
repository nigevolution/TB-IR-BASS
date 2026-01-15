/* ================== PRODUTOS ================== */
const produtos = [
  {nome:"Bass Mods IR",preco:49,link:"https://pay.cakto.com.br/rtuwa88_720263",desc:"Grave definido, ataque rápido e presença moderna.",audio:"/audio/bass-mods.mp3"},
  {nome:"Fender Ultra 2 IR",preco:49,link:"https://pay.cakto.com.br/w3x2i3r_700686",desc:"Timbre limpo, quente e equilibrado.",audio:"/audio/fender-ultra-ii.mp3"},
  {nome:"Music Man IR",preco:49,link:"https://pay.cakto.com.br/n9ji2mm_700692",desc:"Punch agressivo, slap estalado e presença absurda.",audio:"/audio/music-man.mp3"},
  {nome:"Sadowsky M5 IR",preco:59,link:"https://pay.cakto.com.br/36243of_6",desc:"Grave cheio, médios polidos e definição premium.",audio:"/audio/sadowsky-m5.mp3"},
  {nome:"Sadowsky Metroline IR",preco:39,link:"https://pay.cakto.com.br/yaueq45_665688",desc:"Timbre clássico, suave e musical.",audio:"/audio/sadowsky-metroline.mp3"},
  {nome:"Lakland SS44-75 IR",preco:59,link:"https://pay.cakto.com.br/wgonjnx_723722",desc:"Boutique americano com punch absurdo.",audio:"/audio/lakland-sl-44-75.mp3"},
  {nome:"Sadowsky NYC IR",preco:59,desc:"Flagship nova-iorquino com graves profundos.",status:"LANÇAMENTO"},
  {nome:"Mayones Jabba 5 IR",preco:null,desc:"Flagship europeu.",status:"LANÇAMENTO"},
  {nome:"MTD 535-24 IR",preco:null,desc:"Boutique luthier.",status:"LANÇAMENTO EM BREVE"},
  {nome:"Warwick Corvette IR",preco:69,link:"https://pay.cakto.com.br/3frq3qm_719724",desc:"Médio encorpado e ataque metálico.",audio:"/audio/warwick-corvette.mp3"},
  {nome:"Ken Smith IR",preco:69,link:"https://pay.cakto.com.br/zy8esjf_719715",desc:"Resposta hi-fi, ultra definição.",audio:"/audio/ken-smith.mp3"}
];

const grid = document.getElementById("produtos");
let GLOBAL_AUDIO = new Audio();
GLOBAL_AUDIO.preload = "metadata";

/* ================== RENDER ================== */
produtos.forEach(p=>{
  const card=document.createElement("div");
  card.className="card";
  let html=`<h3>${p.nome}</h3><p>${p.desc}</p>`;

  if(p.preco && p.link) html+=`<div class="price">R$ ${p.preco.toFixed(2).replace(".",",")}</div>`;

  if(p.audio){
    html+=`
    <button class="preview-btn" onclick="playPreview(this,'${p.audio}')">▶ Preview 30s</button>`;
  }

  if(p.link && p.preco){
    html+=`<button class="buy-btn" onclick="window.open('${p.link}')">Comprar agora</button>`;
  } else if(p.status){
    html+=`<div class="status">${p.status}</div>`;
  }

  card.innerHTML=html;
  grid.appendChild(card);
});

/* ================== PLAYER ================== */
function playPreview(btn,src){
  document.querySelectorAll(".preview-btn").forEach(b=>b.classList.remove("playing"));
  btn.classList.add("playing");
  GLOBAL_AUDIO.pause();
  GLOBAL_AUDIO.src=src;
  GLOBAL_AUDIO.currentTime=0;
  GLOBAL_AUDIO.play();
  setTimeout(()=>{
    GLOBAL_AUDIO.pause();
    GLOBAL_AUDIO.currentTime=0;
    btn.classList.remove("playing");
  },30000);
}

/* ================== ESTILO EXTRA ================== */
const css=document.createElement("style");
css.innerHTML=`
.preview-btn{margin-top:14px}
.buy-btn{margin-top:10px}
.preview-btn.playing{box-shadow:0 0 35px rgba(255,154,60,.9)}
`;
document.head.appendChild(css);
