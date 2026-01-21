/* ================== PRODUTOS ================== */
const produtos = [
  { nome:"Bass Mods IR", preco:49, link:"https://pay.cakto.com.br/rtuwa88_720263", desc:"Grave definido, ataque rápido e presença moderna.", audio:"/audio/bass-mods.mp3" },
  { nome:"Fender Ultra 2 IR", preco:49, link:"https://pay.cakto.com.br/w3x2i3r_700686", desc:"Timbre limpo, quente e equilibrado.", audio:"/audio/fender-ultra-ii.mp3" },
  { nome:"Music Man IR", preco:49, link:"https://pay.cakto.com.br/n9ji2mm_700692", desc:"Punch agressivo, slap estalado e presença absurda.", audio:"/audio/music-man.mp3" },
  { nome:"Sadowsky M5 IR", preco:59, link:"https://pay.cakto.com.br/36243of_6", desc:"Grave cheio, médios polidos e definição premium.", audio:"/audio/sadowsky-m5.mp3" },
  { nome:"Sadowsky Metroline IR", preco:39, link:"https://pay.cakto.com.br/yaueq45_665688", desc:"Timbre clássico, suave e musical.", audio:"/audio/sadowsky-metroline.mp3" },
  { nome:"Lakland SS44-75 IR", preco:59, link:"https://pay.cakto.com.br/wgonjnx_723722", desc:"Boutique americano com punch absurdo, slap cristalino e médios vivos.", audio:"/audio/lakland-sl-44-75.mp3", release:"2026-01-13T19:00:00" },
  { nome:"Sadowsky NYC IR", preco:59, link:"https://pay.cakto.com.br/EXEMPLO", desc:"Flagship nova-iorquino com graves profundos e brilho cristalino.", audio:"/audio/sadowsky-nyc.mp3", release:"2026-01-20T12:00:00" },

  /* === NOVOS TIMBRES (APENAS ISSO FOI ADICIONADO) === */
  {
    nome:"Fodera IR",
    preco:79,
    link:"https://pay.cakto.com.br/8pw23r3_733800",
    desc:"Referência absoluta em boutique bass. Grave profundo, médios tridimensionais e definição de estúdio.", audio:"/audio/fodera.mp3"
  },
  {
    nome:"TRB JP2 IR",
    preco:59,
    link:"https://pay.cakto.com.br/ebr74qa_733818",
    desc:"Assinatura japonesa moderna. Grave firme, ataque rápido e equilíbrio perfeito para palco e estúdio.", audio:"/audio/trb-jp2.mp3"
  },

  { nome:"Mayones Jabba 5 IR", preco:null, link:null, desc:"Flagship europeu com profundidade e definição profissional.", release:"2026-01-23T19:00:00" },
   
 { nome:"MTD 535-24 IR",
  preco:89,
  link:"https://pay.cakto.com.br/3bgf2sv_735157",
  desc:"Boutique luthier com dinâmica extrema e médios orgânicos.",
  release:"2026-01-30T19:00:00"
},
  { nome:"Warwick Corvette IR", preco:69, link:"https://pay.cakto.com.br/3frq3qm_719724", desc:"Médio encorpado e ataque metálico.", audio:"/audio/warwick-corvette.mp3" },
  { nome:"Ken Smith IR", preco:69, link:"https://pay.cakto.com.br/zy8esjf_719715", desc:"Resposta hi-fi, ultra definição e sustain perfeito.", audio:"/audio/ken-smith.mp3" }
];
const grid = document.getElementById("produtos");

/* ================== ÁUDIO ================== */
function stopAllAudios(){
  document.querySelectorAll("audio").forEach(a=>{
    a.pause();
    a.currentTime = 0;
  });
  document.querySelectorAll(".preview-btn").forEach(b=>{
    b.classList.remove("playing");
    b.innerText = "▶ Preview 30s";
  });
}

/* ================== RENDER ================== */
produtos.forEach(p=>{
  const card = document.createElement("div");
  card.className = "card";

  let html = `
    <h3>${p.nome}</h3>
    <p>${p.desc}</p>
  `;

  /* PREVIEW */
  if(p.audio){
    html += `
    <div class="audio-wrap">
      <audio preload="metadata" src="${p.audio}"></audio>
      <button class="preview-btn">▶ Preview 30s</button>
    </div>`;
  }

  /* BOTÃO COMPRAR */
  if(p.link && !p.release){
    html += `<button class="buy-btn" onclick="window.open('${p.link}')">Comprar agora</button>`;
  }

  /* PREÇO — AGORA ABAIXO DO BOTÃO */
  if(p.preco && !p.release){
    html += `<div class="price">R$ ${p.preco.toFixed(2).replace(".",",")}</div>`;
  }

  /* LANÇAMENTO */
  if(p.release){
    html += `<div class="countdown" data-date="${p.release}" data-link="${p.link}" data-price="${p.preco}">⏳ 00d 00h 00m 00s</div>`;
  }

  card.innerHTML = html;
  grid.appendChild(card);

  /* ===== PLAY ANIMADO ===== */
  if(p.audio){
    const audio = card.querySelector("audio");
    const btn = card.querySelector(".preview-btn");

    btn.addEventListener("click",()=>{
      if(!audio.paused){
        audio.pause();
        audio.currentTime = 0;
        btn.classList.remove("playing");
        btn.innerText = "▶ Preview 30s";
        return;
      }

      stopAllAudios();
      audio.currentTime = 0;
      audio.play();
      btn.classList.add("playing");
      btn.innerText = "⏸ Tocando…";
    });

    audio.addEventListener("timeupdate",()=>{
      if(audio.currentTime >= 30){
        audio.pause();
        audio.currentTime = 0;
        btn.classList.remove("playing");
        btn.innerText = "▶ Preview 30s";
      }
    });
  }
});

/* ================== CRONÔMETRO ================== */
function startCountdown(){
  document.querySelectorAll(".countdown").forEach(el=>{
    const target = new Date(el.dataset.date).getTime();
    const timer = setInterval(()=>{
      const diff = target - Date.now();
      if(diff<=0){
        el.outerHTML = `
          <button class="buy-btn" onclick="window.open('${el.dataset.link}')">Comprar agora</button>
          <div class="price">R$ ${Number(el.dataset.price).toFixed(2).replace(".",",")}</div>
        `;
        clearInterval(timer);
        return;
      }
      const d=Math.floor(diff/86400000);
      const h=Math.floor((diff/3600000)%24);
      const m=Math.floor((diff/60000)%60);
      const s=Math.floor((diff/1000)%60);
      el.innerHTML=`⏳ ${d}d ${h}h ${m}m ${s}s`;
    },1000);
  });
}
startCountdown();
