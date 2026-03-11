/* ================== PREÇOS DINÂMICOS ==================
   ✅ MUDA AQUI e o site inteiro atualiza os valores
   (fallback: se não tiver aqui, usa p.preco do produto)
*/
const precosCakto = {
  "Bass Mods IR": 49,
  "Fender Ultra 2 IR": 45,
  "Music Man IR": 49,
  "Sadowsky M5 IR": 59,
  "Sadowsky Metroline IR": 35,
  "Lakland SS44-75 IR": 59,
  "Sadowsky NYC IR": 69,
  "Fodera IR": 89,
  "Swing Guitars Jazz Deluxe IR": 69,
  "TRB JP2 IR": 59,
  "Mayones Jabba 5 IR": 89,
  "MTD 535-24 IR": 89,
  "Warwick Corvette IR": 59,
  "Ken Smith IR": 59
};

/* ================== PRODUTOS ================== */
const produtos = [
  {
    nome:"Bass Mods IR",
    preco:59,
    link:"https://pay.cakto.com.br/rtuwa88_720263",
    desc:"Grave definido, ataque rápido e presença moderna.",
    audio:"/audio/bass-mods.mp3",
    video:"/videos/bass-mods.mp4"
  },
  {
    nome:"Fender 1978 IR",
    preco:null,
    link:null,
    desc:"Vintage de verdade: grave redondo e cheio, médios orgânicos e aquele brilho antigo que encaixa perfeito na mix — ideal pra groove, rock, funk e worship.",
    release:"2026-03-09T19:00:00",
    status:"EM BREVE",
    audio:"/audio/fender-1978.mp3",
    video:"/videos/fender-1978.mp4"
  },
  {
    nome:"Fender Ultra 2 IR",
    preco:59,
    link:"https://pay.cakto.com.br/w3x2i3r_700686",
    desc:"Timbre limpo, quente e equilibrado.",
    audio:"/audio/fender-ultra-ii.mp3",
    video:"/videos/fender-ultra-2.mp4"
  },
  {
    nome:"Music Man IR",
    preco:59,
    link:"https://pay.cakto.com.br/n9ji2mm_700692",
    desc:"Punch agressivo, slap estalado e presença absurda.",
    audio:"/audio/music-man.mp3",
    video:"/videos/music-man.mp4"
  },
  {
    nome:"G&L L-2500 Americano IR",
    preco:null,
    link:null,
    desc:"Americano com punch e presença: graves firmes, médios agressivos e definição absurda — perfeito pra slap, rock e som moderno sem embolar.",
    status:"EM BREVE",
    audio:"/audio/gl-l2500.mp3",
    video:"/videos/gl-l2500.mp4"
  },
  {
    nome:"Sadowsky M5 IR",
    preco:69,
    link:"https://pay.cakto.com.br/36243of_6",
    desc:"Grave cheio, médios polidos e definição premium.",
    audio:"/audio/sadowsky-m5.mp3",
    video:"/videos/sadowsky-m5.mp4"
  },
  {
    nome:"Sadowsky Metroline IR",
    preco:39,
    link:"https://pay.cakto.com.br/yaueq45_665688",
    desc:"Timbre clássico, suave e musical.",
    audio:"/audio/sadowsky-metroline.mp3",
    video:"/videos/sadowsky-metroline.mp4"
  },
  {
    nome:"Lakland SS44-75 IR",
    preco:69,
    link:"https://pay.cakto.com.br/wgonjnx_723722",
    desc:"Boutique americano com punch absurdo, slap cristalino e médios vivos.",
    audio:"/audio/lakland-sl-44-75.mp3",
    video:"/videos/lakland-sl44-75.mp4",
    release:"2026-01-13T19:00:00"
  },
  {
    nome:"Sadowsky NYC IR",
    preco:69,
    link:"https://pay.cakto.com.br/3k2ofxi_750123",
    desc:"Flagship nova-iorquino com graves profundos e brilho cristalino.",
    audio:"/audio/sadowsky-nyc.mp3",
    video:"/videos/sadowsky-nyc.mp4",
    release:"2026-01-20T12:00:00"
  },

  /* === NOVOS TIMBRES === */
  {
    nome:"Fodera IR",
    preco:89,
    link:"https://pay.cakto.com.br/8pw23r3_733800",
    desc:"Referência absoluta em boutique bass. Grave profundo, médios tridimensionais e definição de estúdio.",
    audio:"/audio/fodera.mp3",
    video:"/videos/fodera-bass.mp4"
  },
  {
    nome:"Swing Guitars Jazz Deluxe IR",
    preco:89,
    link:"https://pay.cakto.com.br/3ff2d5r_750130",
    desc:"Timbre vintage com personalidade. Graves macios, médios encorpados e dinâmica musical perfeita para grooves, jazz, soul e bases orgânicas.",
    release:"2026-02-02T19:00:00",
    audio:"/audio/swing-guitars-jazz-deluxe.mp3",
    video:"/videos/swing-guitars-jazz-deluxe.mp4"
  },
  {
    nome:"TRB JP2 IR",
    preco:69,
    link:"https://pay.cakto.com.br/ebr74qa_733818",
    desc:"Assinatura japonesa moderna. Grave firme, ataque rápido e equilíbrio perfeito para palco e estúdio.",
    audio:"/audio/trb-jp2.mp3",
    video:"/videos/trb-jp2.mp4"
  },

  {
    nome:"Mayones Jabba 5 IR",
    preco:99,
    link:"https://pay.cakto.com.br/388nbge_735148",
    desc:"Flagship europeu com profundidade e definição profissional.",
    release:"2026-01-23T19:00:00",
    audio:"/audio/mayones-jabba-5.mp3",
    video:"/videos/mayones-jabba.mp4"
  },
  {
    nome:"MTD 535-24 IR",
    preco:99,
    link:"https://pay.cakto.com.br/3bgf2sv_735157",
    desc:"Boutique luthier com dinâmica extrema e médios orgânicos.",
    release:"2026-01-23T19:00:00",
    audio:"/audio/mtd-535-24.mp3",
    video:"/videos/mtd-535-24.mp4"
  },

  {
    nome:"Warwick Corvette IR",
    preco:79,
    link:"https://pay.cakto.com.br/3frq3qm_719724",
    desc:"Médio encorpado e ataque metálico.",
    audio:"/audio/warwick-corvette.mp3",
    video:"/videos/warwick-proseries-corvette.mp4"
  },
  {
    nome:"Ken Smith IR",
    preco:79,
    link:"https://pay.cakto.com.br/zy8esjf_719715",
    desc:"Resposta hi-fi, ultra definição e sustain perfeito.",
    audio:"/audio/ken-smith.mp3",
    video:"/videos/ken-smith.mp4"
  }
];

const grid = document.getElementById("produtos");

/* ================== CSS DO DESCONTO (injeta sem quebrar) ================== */
(function ensureDiscountCSS(){
  if(document.getElementById("discountCSS")) return;
  const css = document.createElement("style");
  css.id = "discountCSS";
  css.innerHTML = `
    .price-wrap{display:flex;flex-direction:column;gap:6px;margin-top:10px}
    .price-line{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
    .price-old{opacity:.65;text-decoration:line-through;font-size:14px}
    .price-new{font-weight:800;font-size:18px}
    .badge-off{
      font-weight:800;font-size:12px;
      padding:4px 10px;border-radius:999px;
      background:rgba(0,255,140,.12);
      border:1px solid rgba(0,255,140,.35);
    }
  `;
  document.head.appendChild(css);
})();

/* ================== ÁUDIO (stand-by) ================== */
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

/* ================== MODAL DE VÍDEO ================== */
function ensureVideoModal(){
  if (document.getElementById("videoModal")) return;

  const modal = document.createElement("div");
  modal.id = "videoModal";
  modal.innerHTML = `
    <div class="vm-backdrop"></div>
    <div class="vm-card" role="dialog" aria-modal="true">
      <button class="vm-close" aria-label="Fechar">✕</button>
      <video class="vm-video" controls playsinline preload="metadata"></video>
    </div>
  `;
  document.body.appendChild(modal);

  const v = modal.querySelector(".vm-video");

  const close = () => {
    modal.classList.remove("open");
    v.pause();
    v.removeAttribute("src");
    v.load();
  };

  modal.querySelector(".vm-backdrop").addEventListener("click", close);
  modal.querySelector(".vm-close").addEventListener("click", close);
  document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") close(); });
  v.addEventListener("ended", close);

  const css = document.createElement("style");
  css.innerHTML = `
    #videoModal{position:fixed;inset:0;display:none;z-index:999999}
    #videoModal.open{display:block}
    #videoModal .vm-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.72)}

    /* DESKTOP / PC */
    #videoModal .vm-card{
      position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
      width:min(920px,92vw);
      max-height:90vh;
      background:rgba(10,10,10,.92);
      border-radius:18px;
      padding:14px;
      box-shadow:0 30px 90px rgba(0,0,0,.8);
      overflow:hidden;
    }

    #videoModal .vm-close{
      position:absolute;right:10px;top:8px;border:none;cursor:pointer;
      width:38px;height:38px;border-radius:12px;background:rgba(255,255,255,.10);
      color:#fff;font-size:18px;z-index:2
    }

    #videoModal .vm-video{
      width:100%;
      height:auto;
      max-height:78vh;
      object-fit:contain;
      border-radius:14px;
      outline:none;
      background:#000;
    }

    .video-btn{
      border:none;border-radius:18px;
      padding:14px 28px;
      background:linear-gradient(135deg,#ff9a3c,#ff7a00);
      font-weight:bold;
      box-shadow:0 0 25px rgba(255,154,60,.6);
      cursor:pointer;
      margin:6px 0;
    }

    /* MOBILE: tela cheia */
    @media (max-width: 768px){
      #videoModal .vm-card{
        left:0;top:0;transform:none;
        width:100vw;height:100vh;max-height:none;
        border-radius:0;
        padding:0;
        background:#000;
        box-shadow:none;
      }

      #videoModal .vm-close{
        right:14px;top:14px;
        width:42px;height:42px;border-radius:14px;
        background:rgba(255,255,255,.14);
        backdrop-filter: blur(6px);
      }

      #videoModal .vm-video{
        width:100vw;height:100vh;max-height:none;
        border-radius:0;
        object-fit:contain;
      }

      #videoModal .vm-backdrop{background:#000}
    }
  `;
  document.head.appendChild(css);
}

function openVideo(url){
  ensureVideoModal();
  const modal = document.getElementById("videoModal");
  const v = modal.querySelector(".vm-video");
  v.src = url;
  modal.classList.add("open");
  v.play().catch(()=>{});
}

/* ================== RENDER ================== */
produtos.forEach(p=>{
  const card = document.createElement("div");
  card.className = "card";

  // ✅ PREÇO FINAL (vem do precosCakto; se não tiver, usa p.preco)
  const precoFinal = (precosCakto[p.nome] ?? p.preco);

  let html = `
    <h3>${p.nome}</h3>
    <p>${p.desc}</p>
    ${p.status ? `<div class="status">${p.status}</div>` : ``}
  `;

  /* VÍDEO PREVIEW */
  if(p.video){
    html += `<button class="video-btn" data-video="${p.video}">▶ Ver vídeo</button>`;
  }

  /* ÁUDIO EM STAND-BY (oculto) */
  if(p.audio){
    html += `
      <div class="audio-wrap" style="display:none">
        <audio preload="metadata" src="${p.audio}"></audio>
        <button class="preview-btn">▶ Preview 30s</button>
      </div>
    `;
  }

  /* BOTÃO COMPRAR */
  if(p.link && !p.release){
    html += `<button class="buy-btn" onclick="window.open('${p.link}')">Comprar agora</button>`;
  }

  /* PREÇO + DESCONTO — abaixo do botão */
  if(precoFinal && !p.release){
    const antigo = (p.preco != null ? Number(p.preco) : null);
    const novo = Number(precoFinal);

    const temDesconto = (antigo != null && antigo > 0 && novo < antigo);
    const pct = temDesconto ? Math.round(((antigo - novo) / antigo) * 100) : 0;

    html += `<div class="price-wrap">`;

    if(temDesconto){
      html += `
        <div class="price-line">
          <span class="price-old">R$ ${antigo.toFixed(2).replace(".",",")}</span>
          <span class="badge-off">${pct}% OFF</span>
        </div>
        <div class="price-new">R$ ${novo.toFixed(2).replace(".",",")}</div>
      `;
    }else{
      html += `<div class="price-new">R$ ${novo.toFixed(2).replace(".",",")}</div>`;
    }

    html += `</div>`;
  }

  /* LANÇAMENTO (cronômetro) */
  if(p.release){
    html += `
      <div class="countdown"
        data-date="${p.release}"
        data-link="${p.link}"
        data-price="${precoFinal}"
        data-old="${p.preco}">
        ⏳ 00d 00h 00m 00s
      </div>
    `;
  }

  card.innerHTML = html;
  grid.appendChild(card);

  /* Clique no botão de vídeo */
  const vb = card.querySelector(".video-btn");
  if(vb){
    vb.addEventListener("click", ()=>{
      const url = vb.getAttribute("data-video");
      openVideo(url);
    });
  }

  /* ===== PLAY ANIMADO (mantido, mas oculto) ===== */
  if(p.audio){
    const audio = card.querySelector("audio");
    const btn = card.querySelector(".preview-btn");
    if(audio && btn){
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
  }
});

/* ================== CRONÔMETRO ================== */
function startCountdown(){
  document.querySelectorAll(".countdown").forEach(el=>{
    const target = new Date(el.dataset.date).getTime();
    const timer = setInterval(()=>{
      const diff = target - Date.now();
      if(diff<=0){
        const old = (el.dataset.old != null && el.dataset.old !== "null") ? Number(el.dataset.old) : null;
        const cur = Number(el.dataset.price);
        const tem = (old != null && old > 0 && cur < old);
        const pct = tem ? Math.round(((old-cur)/old)*100) : 0;

        el.outerHTML = `
          <button class="buy-btn" onclick="window.open('${el.dataset.link}')">Comprar agora</button>
          <div class="price-wrap">
            ${tem ? `
              <div class="price-line">
                <span class="price-old">R$ ${old.toFixed(2).replace(".",",")}</span>
                <span class="badge-off">${pct}% OFF</span>
              </div>
            ` : ``}
            <div class="price-new">R$ ${cur.toFixed(2).replace(".",",")}</div>
          </div>
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
