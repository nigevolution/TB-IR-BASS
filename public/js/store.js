/* ================== PREÇOS DINÂMICOS ================== */
const precosCakto = {
  "TrackPilot by TB-BASS IR": 49,

  "Bass Mods IR": 49,
  "Fender Ultra 2 IR": 45,
  "Fender 1978 IR": null,
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
    nome:"TrackPilot by TB-BASS IR",
    preco:49,
    link:"https://pay.cakto.com.br/p8ufknn_866145",
    desc:"Automação inteligente para REAPER criada para acelerar seu fluxo de trabalho. O TrackPilot organiza, adiciona e importa seus áudios diretamente nas tracks certas em poucos segundos. Após a compra, o acesso é enviado para o Gmail cadastrado na Cakto, com os arquivos disponibilizados via Google Drive para facilitar o download, a instalação e o uso.",
    cupom:null,
    video:"/videos/trackpilot.mp4"
  },
  {
    nome:"Bass Mods IR",
    irId:"bass-mods",
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
    release:"2026-03-15T19:00:00",
    status:"EM BREVE",
    audio:"/audio/fender-1978.mp3",
    video:"/videos/fender-1978.mp4",
    showBuy:false
  },
  {
    nome:"Fender Ultra 2 IR",
    irId:"fender-ultra-2",
    preco:59,
    link:"https://pay.cakto.com.br/w3x2i3r_700686",
    desc:"Timbre limpo, quente e equilibrado.",
    audio:"/audio/fender-ultra-ii.mp3",
    video:"/videos/fender-ultra-2.mp4"
  },
  {
    nome:"Music Man IR",
    irId:"music-man",
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
    video:"/videos/gl-l2500.mp4",
    showBuy:false
  },
  {
    nome:"Sadowsky M5 IR",
    irId:"sadowsky-m5",
    preco:69,
    link:"https://pay.cakto.com.br/36243of_6",
    desc:"Grave cheio, médios polidos e definição premium.",
    audio:"/audio/sadowsky-m5.mp3",
    video:"/videos/sadowsky-m5.mp4"
  },
  {
    nome:"Sadowsky Metroline IR",
    irId:"sadowsky-metroline",
    preco:39,
    link:"https://pay.cakto.com.br/yaueq45_665688",
    desc:"Timbre clássico, suave e musical.",
    audio:"/audio/sadowsky-metroline.mp3",
    video:"/videos/sadowsky-metroline.mp4"
  },
  {
    nome:"Lakland SS44-75 IR",
    irId:"lakland-ss44-75",
    preco:69,
    link:"https://pay.cakto.com.br/wgonjnx_723722",
    desc:"Boutique americano com punch absurdo, slap cristalino e médios vivos.",
    audio:"/audio/lakland-sl-44-75.mp3",
    video:"/videos/lakland-sl44-75.mp4",
    release:"2026-01-13T19:00:00"
  },
  {
    nome:"Sadowsky NYC IR",
    irId:"sadowsky-nyc",
    preco:69,
    link:"https://pay.cakto.com.br/3k2ofxi_750123",
    desc:"Flagship nova-iorquino com graves profundos e brilho cristalino.",
    audio:"/audio/sadowsky-nyc.mp3",
    video:"/videos/sadowsky-nyc.mp4",
    release:"2026-01-20T12:00:00"
  },
  {
    nome:"Fodera IR",
    irId:"fodera",
    preco:89,
    link:"https://pay.cakto.com.br/8pw23r3_733800",
    desc:"Referência absoluta em boutique bass. Grave profundo, médios tridimensionais e definição de estúdio.",
    audio:"/audio/fodera.mp3",
    video:"/videos/fodera-bass.mp4"
  },
  {
    nome:"Swing Guitars Jazz Deluxe IR",
    irId:"swing",
    preco:89,
    link:"https://pay.cakto.com.br/3ff2d5r_750130",
    desc:"Timbre vintage com personalidade. Graves macios, médios encorpados e dinâmica musical perfeita para grooves, jazz, soul e bases orgânicas.",
    release:"2026-02-02T19:00:00",
    audio:"/audio/swing-guitars-jazz-deluxe.mp3",
    video:"/videos/swing-guitars-jazz-deluxe.mp4"
  },
  {
    nome:"TRB JP2 IR",
    irId:"trb-jp2",
    preco:69,
    link:"https://pay.cakto.com.br/ebr74qa_733818",
    desc:"Assinatura japonesa moderna. Grave firme, ataque rápido e equilíbrio perfeito para palco e estúdio.",
    audio:"/audio/trb-jp2.mp3",
    video:"/videos/trb-jp2.mp4"
  },
  {
    nome:"Mayones Jabba 5 IR",
    irId:"mayones",
    preco:99,
    link:"https://pay.cakto.com.br/388nbge_735148",
    desc:"Flagship europeu com profundidade e definição profissional.",
    release:"2026-01-23T19:00:00",
    audio:"/audio/mayones-jabba-5.mp3",
    video:"/videos/mayones-jabba.mp4"
  },
  {
    nome:"MTD 535-24 IR",
    irId:"mtd",
    preco:99,
    link:"https://pay.cakto.com.br/3bgf2sv_735157",
    desc:"Boutique luthier com dinâmica extrema e médios orgânicos.",
    release:"2026-01-23T19:00:00",
    audio:"/audio/mtd-535-24.mp3",
    video:"/videos/mtd-535-24.mp4"
  },
  {
    nome:"Warwick Corvette IR",
    irId:"warwick-corvette",
    preco:79,
    link:"https://pay.cakto.com.br/3frq3qm_719724",
    desc:"Médio encorpado e ataque metálico.",
    audio:"/audio/warwick-corvette.mp3",
    video:"/videos/warwick-proseries-corvette.mp4"
  },
  {
    nome:"Ken Smith IR",
    irId:"ken-smith",
    preco:79,
    link:"https://pay.cakto.com.br/zy8esjf_719715",
    desc:"Resposta hi-fi, ultra definição e sustain perfeito.",
    audio:"/audio/ken-smith.mp3",
    video:"/videos/ken-smith.mp4"
  }
];

const grid = document.getElementById("produtos");

/* ================== HELPERS ================== */
function toNumberOrNull(v){
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function formatBRL(n){
  return `R$ ${n.toFixed(2).replace(".",",")}`;
}

function isTrackPilotName(nome){
  return nome === "TrackPilot by TB-BASS IR";
}

function getPriceSuffix(nome){
  return isTrackPilotName(nome) ? " no primeiro mês" : "";
}

function getPriceNote(nome, oldPrice, newPrice){
  if(!isTrackPilotName(nome)) return "";
  if(oldPrice == null || newPrice == null) return "";
  if(newPrice >= oldPrice) return "";
  return `<div class="price-note">Depois ${formatBRL(oldPrice)} / mês</div>`;
}

function getDiscountText(nome, pct){
  return isTrackPilotName(nome) ? `${pct}% OFF no 1º mês` : `${pct}% OFF`;
}

/* ================== CSS EXTRA ================== */
(function ensureExtraCSS(){
  if(document.getElementById("extraStoreCSS")) return;

  const css = document.createElement("style");
  css.id = "extraStoreCSS";
  css.innerHTML = `
    .price-wrap{display:flex;flex-direction:column;gap:6px;margin-top:10px}
    .price-line{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center}
    .price-old{opacity:.65;text-decoration:line-through;font-size:14px}
    .price-new{font-weight:800;font-size:18px}
    .price-note{font-size:13px;opacity:.82;font-weight:700}
    .badge-off{
      font-weight:800;font-size:12px;
      padding:4px 10px;border-radius:999px;
      background:rgba(0,255,140,.12);
      border:1px solid rgba(0,255,140,.35);
    }

    .coupon-badge{
      margin:10px auto 12px;
      display:inline-block;
      padding:7px 14px;
      border-radius:999px;
      font-weight:900;
      font-size:13px;
      letter-spacing:1px;
      color:#000;
      background:linear-gradient(135deg,#ffdf8a,#d4af37,#ffbf3c);
      box-shadow:0 0 22px rgba(212,175,55,.45);
    }

    .trackpilot-feature{
      grid-column:1 / -1;
      min-height:320px;
      border-radius:28px;
      padding:42px;
      background:
        radial-gradient(circle at 18% 30%, rgba(0,140,255,.22), transparent 34%),
        radial-gradient(circle at 82% 28%, rgba(255,122,0,.25), transparent 34%),
        linear-gradient(135deg, rgba(255,122,0,.24), rgba(0,0,0,.82)),
        rgba(0,0,0,.78);
      border:1px solid rgba(255,122,0,.75);
      box-shadow:
        0 0 45px rgba(255,122,0,.32),
        inset 0 0 40px rgba(255,122,0,.08);
      position:relative;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      overflow:hidden;
    }

    .trackpilot-feature::before{
      content:"NOVO";
      position:absolute;
      top:24px;
      right:28px;
      background:linear-gradient(135deg,#ff9a3c,#ff7a00);
      color:#000;
      font-weight:900;
      font-size:13px;
      padding:7px 14px;
      border-radius:999px;
      box-shadow:0 0 24px rgba(255,122,0,.65);
    }

    .trackpilot-feature::after{
      content:"";
      position:absolute;
      left:8%;
      right:8%;
      bottom:26px;
      height:2px;
      background:linear-gradient(90deg, transparent, rgba(0,150,255,.85), rgba(255,122,0,.85), transparent);
      opacity:.85;
    }

    .trackpilot-feature h3{
      color:#ff9a3c;
      font-size:38px;
      margin-bottom:14px;
      text-shadow:0 0 28px rgba(255,122,0,.45);
    }

    .trackpilot-feature p{
      font-size:22px;
      max-width:760px;
      line-height:1.25;
      margin-left:auto;
      margin-right:auto;
    }

    .trackpilot-feature .video-btn,
    .trackpilot-feature .buy-btn{
      margin:10px 8px;
      transform:scale(1.04);
    }

    .trackpilot-feature .price-new{
      font-size:28px;
    }

    .trackpilot-feature .price-note{
      font-size:15px;
    }


    .try-ir-btn{
      border:none;
      border-radius:18px;
      padding:14px 28px;
      background:linear-gradient(135deg,#1fd38a,#0ea96b);
      color:#06130d;
      font-weight:900;
      box-shadow:0 0 25px rgba(31,211,138,.38);
      cursor:pointer;
      margin:6px 0;
    }
    .try-ir-btn:hover{filter:brightness(1.08)}
    #irTestModal{position:fixed;inset:0;display:none;z-index:999999}
    #irTestModal.open{display:block}
    #irTestModal .ir-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.76)}
    #irTestModal .ir-card{
      position:absolute;
      left:50%;
      top:50%;
      transform:translate(-50%,-50%);
      width:min(620px,92vw);
      background:rgba(12,10,8,.96);
      border:1px solid rgba(255,154,60,.35);
      border-radius:24px;
      padding:24px;
      box-shadow:0 30px 90px rgba(0,0,0,.85);
      text-align:left;
    }
    #irTestModal h3{color:#ff9a3c;margin:0 42px 10px 0}
    #irTestModal p{line-height:1.45;opacity:.9}
    #irTestModal .ir-close{
      position:absolute;
      right:14px;
      top:12px;
      width:38px;
      height:38px;
      border:none;
      border-radius:12px;
      color:#fff;
      background:rgba(255,255,255,.12);
      cursor:pointer;
      font-size:18px;
    }
    #irTestModal .ir-version-box{
      display:flex;
      flex-direction:column;
      gap:10px;
      margin:14px 0 12px;
    }
    #irTestModal .ir-version-option{
      display:flex;
      gap:10px;
      align-items:flex-start;
      padding:12px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(255,255,255,.06);
      cursor:pointer;
    }
    #irTestModal .ir-version-option input{
      margin-top:3px;
      accent-color:#ff9a3c;
    }
    #irTestModal .ir-version-option b{
      display:block;
      color:#fff;
      margin-bottom:4px;
    }
    #irTestModal .ir-version-option small{
      display:block;
      opacity:.74;
      line-height:1.35;
    }

    #irTestModal .ir-guidance{
      margin:12px 0 12px;
      padding:12px 14px;
      border-radius:16px;
      background:rgba(255,154,60,.08);
      border:1px solid rgba(255,154,60,.22);
      font-size:13px;
      line-height:1.45;
      color:#fff;
      opacity:.9;
    }
    #irTestModal .ir-guidance b{
      color:#ffbf7a;
    }

    #irTestModal .ir-file-picker{
      width:100%;
      display:flex;
      gap:10px;
      align-items:center;
      padding:12px;
      border-radius:14px;
      background:rgba(255,255,255,.08);
      border:1px solid rgba(255,255,255,.16);
      box-sizing:border-box;
      margin:10px 0;
    }
    #irTestModal .ir-file-btn{
      border:none;
      border-radius:10px;
      padding:10px 14px;
      background:rgba(255,255,255,.18);
      color:#fff;
      font-weight:800;
      cursor:pointer;
      white-space:nowrap;
    }
    #irTestModal .ir-file-name{
      font-size:13px;
      opacity:.82;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }

    #irTestModal .ir-file{
      width:100%;
      padding:14px;
      border-radius:14px;
      background:rgba(255,255,255,.08);
      border:1px solid rgba(255,255,255,.16);
      color:#fff;
      box-sizing:border-box;
      margin:10px 0;
    }
    #irTestModal .ir-generate{
      width:100%;
      margin-top:12px;
      border:none;
      border-radius:16px;
      padding:15px 22px;
      background:linear-gradient(135deg,#ff9a3c,#ff7a00);
      color:#000;
      font-weight:900;
      cursor:pointer;
    }
    #irTestModal .ir-generate:disabled{opacity:.55;cursor:not-allowed}
    #irTestModal .ir-status{
      margin-top:12px;
      font-size:14px;
      opacity:.86;
      min-height:20px;
    }
    #irTestModal audio{
      width:100%;
      margin-top:14px;
      display:none;
    }
    #irTestModal .ir-privacy{
      font-size:13px;
      opacity:.72;
      margin-top:12px;
    }

    @media (max-width:768px){
      .trackpilot-feature{
        grid-column:span 1;
        min-height:300px;
        padding:32px 22px;
      }

      .trackpilot-feature h3{
        font-size:26px;
      }

      .trackpilot-feature p{
        font-size:17px;
      }

      .trackpilot-feature::before{
        top:16px;
        right:16px;
      }
    }
  `;
  document.head.appendChild(css);
})();

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

  document.addEventListener("keydown", e=>{
    if(e.key === "Escape") close();
  });

  v.addEventListener("ended", close);

  const css = document.createElement("style");
  css.innerHTML = `
    #videoModal{position:fixed;inset:0;display:none;z-index:999999}
    #videoModal.open{display:block}
    #videoModal .vm-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.72)}
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
    @media (max-width:768px){
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
        backdrop-filter:blur(6px);
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


/* ================== TESTE DE TIMBRE COM CLOUD RUN ================== */
const TB_BASS_PREVIEW_API = "https://tb-bass-ir-preview-5sieyq2o4a-uc.a.run.app";

function ensureIRTestModal(){
  if(document.getElementById("irTestModal")) return;

  const modal = document.createElement("div");
  modal.id = "irTestModal";
  modal.innerHTML = `
    <div class="ir-backdrop"></div>
    <div class="ir-card" role="dialog" aria-modal="true">
      <button class="ir-close" aria-label="Fechar">✕</button>
      <h3>Teste este IR com seu próprio baixo</h3>
      <p id="irTestProduct">Selecione um produto para testar.</p>

      <div class="ir-version-box">
        <label class="ir-version-option">
          <input type="radio" name="irTestVersion" value="immediate" checked>
          <span>
            <b>Versão que recebo na hora</b>
            <small>É o timbre entregue imediatamente após a compra.</small>
          </span>
        </label>

        <label class="ir-version-option">
          <input type="radio" name="irTestVersion" value="updated-7-days">
          <span>
            <b>Versão melhorada de 7 dias</b>
            <small>É a atualização refinada que o cliente recebe depois.</small>
          </span>
        </label>
      </div>

      <div class="ir-guidance">
        <b>Para um teste fiel:</b> envie um áudio seco do baixo, gravado direto na interface ou placa de som,
        sem caixa, sem amp, sem compressor, sem efeitos e sem som ambiente.<br>
        Não grave pelo celular. Selecione um arquivo de áudio seco já gravado. Áudio com ruído, eco ou ambiência altera o resultado do timbre.<br>
        Cordas novas ou semi-novas fazem muita diferença. Cordas muito velhas podem deixar o som apagado,
        sem brilho e sem definição.
      </div>

            <div class="ir-file-picker">
        <button id="irChooseFileBtn" class="ir-file-btn" type="button">Escolher arquivo pelo gerenciador</button>
        <span id="irChosenFileName" class="ir-file-name">Nenhum arquivo escolhido</span>
      </div>
      <input id="irTestFile" type="file" style="display:none">
      <button id="irTestGenerate" class="ir-generate">Gerar prévia fiel de 10s</button>
      <div id="irTestStatus" class="ir-status"></div>
      <audio id="irTestPlayer" controls playsinline></audio>
      <div class="ir-privacy">
        O áudio original é usado apenas para gerar a prévia e é apagado após o processamento.
        Os IRs ficam protegidos no servidor.
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.dataset.version = "immediate";

  modal.querySelectorAll('input[name="irTestVersion"]').forEach(input => {
    input.addEventListener("change", () => {
      modal.dataset.version = input.value;

      const status = document.getElementById("irTestStatus");
      const player = document.getElementById("irTestPlayer");
      const fileInput = document.getElementById("irTestFile");
      const generateBtn = document.getElementById("irTestGenerate");

      if(player){
        player.pause();
        player.removeAttribute("src");
        player.style.display = "none";
        player.load();
      }

      if(status){
        status.textContent = input.value === "updated-7-days"
          ? "Versão melhorada de 7 dias selecionada."
          : "Versão que recebe na hora selecionada.";
      }

      if((modal._selectedIRTestFile || fileInput?.files?.[0]) && generateBtn && !generateBtn.disabled){
        status.textContent += " Gerando nova prévia automaticamente...";
        setTimeout(() => generateBtn.click(), 120);
      }else if(status){
        status.textContent += " Escolha um áudio para gerar a prévia.";
      }
    });
  });

  modal.querySelectorAll(".ir-version-option").forEach(label => {
    label.addEventListener("click", () => {
      const input = label.querySelector('input[name="irTestVersion"]');
      if(input && !input.checked){
        input.checked = true;
        input.dispatchEvent(new Event("change", { bubbles:true }));
      }
    });
  });

  modal._selectedIRTestFile = null;

  const chooseFileBtn = document.getElementById("irChooseFileBtn");
  const hiddenFileInput = document.getElementById("irTestFile");
  const chosenFileName = document.getElementById("irChosenFileName");

  function setChosenIRFile(file){
    modal._selectedIRTestFile = file || null;
    if(chosenFileName){
      chosenFileName.textContent = file ? file.name : "Nenhum arquivo escolhido";
    }
  }

  if(chooseFileBtn && hiddenFileInput){
    chooseFileBtn.addEventListener("click", async () => {
      try{
        if(window.showOpenFilePicker){
          const handles = await window.showOpenFilePicker({
            multiple:false,
            excludeAcceptAllOption:false
          });

          if(handles && handles[0]){
            const file = await handles[0].getFile();
            hiddenFileInput.value = "";
            setChosenIRFile(file);
            return;
          }
        }
      }catch(err){
        if(err && err.name === "AbortError") return;
        console.warn("Falha no seletor nativo de arquivos, usando fallback.", err);
      }

      hiddenFileInput.click();
    });

    hiddenFileInput.addEventListener("change", () => {
      const file = hiddenFileInput.files && hiddenFileInput.files[0];
      setChosenIRFile(file || null);
    });
  }

  const close = () => {
    modal.classList.remove("open");
    const player = document.getElementById("irTestPlayer");
    if(player){
      player.pause();
      player.removeAttribute("src");
      player.style.display = "none";
    }
  };

  modal.querySelector(".ir-backdrop").addEventListener("click", close);
  modal.querySelector(".ir-close").addEventListener("click", close);

  document.getElementById("irTestGenerate").addEventListener("click", async () => {
    const fileInput = document.getElementById("irTestFile");
    const status = document.getElementById("irTestStatus");
    const player = document.getElementById("irTestPlayer");
    const btn = document.getElementById("irTestGenerate");
    const product = modal.dataset.product;

    try{
      const file = modal._selectedIRTestFile || (fileInput.files && fileInput.files[0]);

      if(!file){
        alert("Escolha um áudio seco do baixo primeiro.");
        return;
      }

      const allowedAudioExts = [".wav", ".mp3", ".m4a", ".aif", ".aiff"];
      const fileName = (file.name || "").toLowerCase();
      const isAllowedAudio = allowedAudioExts.some(ext => fileName.endsWith(ext));

      if(!isAllowedAudio){
        alert("Escolha um arquivo de áudio seco em WAV, MP3, M4A, AIF ou AIFF. Não grave pelo celular.");
        return;
      }

      if(file.size > 40 * 1024 * 1024){
        alert("Arquivo muito grande. Use um áudio menor que 40 MB.");
        return;
      }

      const selectedVersion = modal.dataset.version || "immediate";
      const selectedVersionLabel = selectedVersion === "updated-7-days"
        ? "versão melhorada de 7 dias"
        : "versão que recebe na hora";

      btn.disabled = true;
      btn.textContent = "Processando...";
      status.textContent = `Enviando áudio e aplicando a ${selectedVersionLabel} no servidor...`;
      player.style.display = "none";

      const form = new FormData();
      form.append("product", product);
      form.append("version", selectedVersion);
      form.append("audio", file);

      const response = await fetch(`${TB_BASS_PREVIEW_API}/api/preview`, {
        method: "POST",
        body: form
      });

      const data = await response.json();

      if(!response.ok || !data.ok){
        throw new Error(data.error || "Falha ao gerar prévia.");
      }

      player.src = TB_BASS_PREVIEW_API + data.preview_url + "?t=" + Date.now();
      player.style.display = "block";
      status.textContent = `Prévia fiel pronta: 10 segundos, 100% wet, sem dry misturado. Versão: ${data.version_label || selectedVersionLabel}.`;

      if(typeof gtag === "function"){
        gtag("event","custom_ir_preview_generated",{ item_id: product });
      }
    }catch(err){
      console.error(err);
      status.textContent = "Erro: " + err.message;
      alert("Não consegui gerar a prévia: " + err.message);
    }finally{
      btn.disabled = false;
      btn.textContent = "Gerar prévia fiel de 10s";
    }
  });
}

function openIRTest(productId, productName){
  ensureIRTestModal();

  const modal = document.getElementById("irTestModal");
  modal.dataset.product = productId;
  modal.dataset.version = "immediate";

  document.getElementById("irTestProduct").innerHTML =
    `<b>${productName}</b><br>Envie um áudio seco do baixo para ouvir este IR aplicado em uma prévia de 10 segundos.`;

  document.getElementById("irTestFile").value = "";
  document.getElementById("irTestStatus").textContent = "";
  modal._selectedIRTestFile = null;
  const chosenFileName = document.getElementById("irChosenFileName");
  if(chosenFileName) chosenFileName.textContent = "Nenhum arquivo escolhido";

  const immediateOption = modal.querySelector('input[name="irTestVersion"][value="immediate"]');
  if(immediateOption) immediateOption.checked = true;

  const player = document.getElementById("irTestPlayer");
  player.pause();
  player.removeAttribute("src");
  player.style.display = "none";
  player.load();

  modal.classList.add("open");

  if(typeof gtag === "function"){
    gtag("event","custom_ir_preview_open",{ item_id: productId, item_name: productName });
  }
}

/* ================== RENDER ================== */
if(grid){
  grid.innerHTML = "";

  produtos.forEach(p=>{
    const card = document.createElement("div");
    card.className = isTrackPilotName(p.nome)
      ? "card trackpilot-feature"
      : "card";

    const precoFinal = toNumberOrNull(precosCakto[p.nome] ?? p.preco);
    const showBuy = p.showBuy !== false;
    const priceSuffix = getPriceSuffix(p.nome);

    let html = `
      <h3>${p.nome}</h3>
      <p>${p.desc}</p>
      ${p.cupom ? `<div class="coupon-badge">Cupom: ${p.cupom}</div>` : ``}
      ${p.status ? `<div class="status">${p.status}</div>` : ``}
    `;

    if(p.video){
      html += `<button class="video-btn" data-video="${p.video}">▶ Ver vídeo</button>`;
    }

    if(p.audio){
      html += `
        <div class="audio-wrap" style="display:none">
          <audio preload="metadata" src="${p.audio}"></audio>
          <button class="preview-btn">▶ Preview 30s</button>
        </div>
      `;
    }

    if(p.irId){
      html += `<button class="try-ir-btn" data-ir-id="${p.irId}" data-ir-name="${p.nome}">🎛 Testar meu áudio</button>`;
    }


    if(showBuy && p.link && !p.release){
      html += `<button class="buy-btn" onclick="window.open('${p.link}')">Comprar agora</button>`;
    }

    if(precoFinal != null && !p.release){
      const antigo = toNumberOrNull(p.preco);
      const novo = precoFinal;
      const temDesconto = antigo != null && antigo > 0 && novo < antigo;
      const pct = temDesconto ? Math.round(((antigo - novo) / antigo) * 100) : 0;

      html += `<div class="price-wrap">`;

      if(temDesconto){
        html += `
          <div class="price-line">
            <span class="price-old">${formatBRL(antigo)}${isTrackPilotName(p.nome) ? " / mês" : ""}</span>
            <span class="badge-off">${getDiscountText(p.nome, pct)}</span>
          </div>
          <div class="price-new">${formatBRL(novo)}${priceSuffix}</div>
          ${getPriceNote(p.nome, antigo, novo)}
        `;
      }else{
        html += `<div class="price-new">${formatBRL(novo)}${isTrackPilotName(p.nome) ? " / mês" : ""}</div>`;
      }

      html += `</div>`;
    }

    if(p.release){
      html += `
        <div class="countdown"
          data-date="${p.release}"
          data-link="${p.link ?? ""}"
          data-price="${precoFinal ?? ""}"
          data-old="${p.preco ?? ""}"
          data-name="${p.nome}"
          data-showbuy="${showBuy ? "1" : "0"}">
          ⏳ 00d 00h 00m 00s
        </div>
      `;
    }

    card.innerHTML = html;
    grid.appendChild(card);

    const vb = card.querySelector(".video-btn");
    if(vb){
      vb.addEventListener("click",()=>{
        openVideo(vb.getAttribute("data-video"));
      });
    }

    const tryBtn = card.querySelector(".try-ir-btn");
    if(tryBtn){
      tryBtn.addEventListener("click",()=>{
        openIRTest(tryBtn.dataset.irId, tryBtn.dataset.irName);
      });
    }


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
}

/* ================== CRONÔMETRO ================== */
function startCountdown(){
  document.querySelectorAll(".countdown").forEach(el=>{
    const target = new Date(el.dataset.date).getTime();

    const timer = setInterval(()=>{
      const diff = target - Date.now();

      if(diff <= 0){
        const showBuy = el.dataset.showbuy === "1";
        const link = (el.dataset.link || "").trim();

        const old = toNumberOrNull(el.dataset.old);
        const cur = toNumberOrNull(el.dataset.price);
        const priceSuffix = getPriceSuffix(el.dataset.name);

        const tem = old != null && old > 0 && cur != null && cur < old;
        const pct = tem ? Math.round(((old - cur) / old) * 100) : 0;

        let out = "";

        if(showBuy && link){
          out += `<button class="buy-btn" onclick="window.open('${link}')">Comprar agora</button>`;
        }

        if(cur != null){
          out += `
            <div class="price-wrap">
              ${tem ? `
                <div class="price-line">
                  <span class="price-old">${formatBRL(old)}${isTrackPilotName(el.dataset.name) ? " / mês" : ""}</span>
                  <span class="badge-off">${getDiscountText(el.dataset.name, pct)}</span>
                </div>
              ` : ``}
              <div class="price-new">${formatBRL(cur)}${tem ? priceSuffix : (isTrackPilotName(el.dataset.name) ? " / mês" : "")}</div>
              ${getPriceNote(el.dataset.name, old, cur)}
            </div>
          `;
        }

        el.outerHTML = out || ``;
        clearInterval(timer);
        return;
      }

      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      const s = Math.floor((diff / 1000) % 60);

      el.innerHTML = `⏳ ${d}d ${h}h ${m}m ${s}s`;
    },1000);
  });
}

startCountdown();
