(()=>{
  "use strict";

  const FEATURE_PARAM = "browser-ir-demo";
  const DEMO_ASSETS = Object.freeze({
    "bass-mods": "/assets/ir-demo/bass-mods-demo.wav",
    "fender-ultra-2": "/assets/ir-demo/fender-ultra-2-demo.wav",
    "fender-1978": "/assets/ir-demo/fender-1978-demo.wav",
    "music-man": "/assets/ir-demo/music-man-demo.wav",
    "gl-l2500": "/assets/ir-demo/gl-l2500-demo.wav",
    "kubicki-ex-factor": "/assets/ir-demo/kubicki-ex-factor-demo.wav",
    "fender-american-elite-2018": "/assets/ir-demo/fender-american-elite-2018-demo.wav",
    "fodera-elite-dlx": "/assets/ir-demo/fodera-elite-dlx-demo.wav",
    "mtd-kingston-zx": "/assets/ir-demo/mtd-kingston-zx-demo.wav",
    "sadowsky-m5": "/assets/ir-demo/sadowsky-m5-demo.wav",
    "sadowsky-metroline": "/assets/ir-demo/sadowsky-metroline-demo.wav",
    "lakland-ss44-75": "/assets/ir-demo/lakland-ss44-75-demo.wav",
    "sadowsky-nyc": "/assets/ir-demo/sadowsky-nyc-demo.wav",
    "fodera": "/assets/ir-demo/fodera-demo.wav",
    "swing": "/assets/ir-demo/swing-demo.wav",
    "trb-jp2": "/assets/ir-demo/trb-jp2-demo.wav",
    "mayones": "/assets/ir-demo/mayones-demo.wav",
    "mtd": "/assets/ir-demo/mtd-demo.wav",
    "warwick-corvette": "/assets/ir-demo/warwick-corvette-demo.wav",
    "ken-smith": "/assets/ir-demo/ken-smith-demo.wav"
  });
  const MAX_FILE_BYTES = 20 * 1024 * 1024;
  const TARGET_PEAK = Math.pow(10, -1 / 20);

  let modal = null;
  let objectUrls = [];
  let activeDemoUrl = null;

  function isEnabled(){
    return new URLSearchParams(window.location.search).get(FEATURE_PARAM) === "1";
  }

  function cleanupObjectUrls(){
    objectUrls.forEach(url => URL.revokeObjectURL(url));
    objectUrls = [];
  }

  function rememberObjectUrl(blob){
    const url = URL.createObjectURL(blob);
    objectUrls.push(url);
    return url;
  }

  function ensureStyles(){
    if(document.getElementById("browserIrDemoStyles")) return;
    const style = document.createElement("style");
    style.id = "browserIrDemoStyles";
    style.textContent = `
      .browser-ir-demo-btn{margin-top:10px;width:100%;border:1px solid rgba(255,154,60,.32);background:rgba(255,154,60,.08);color:#ffd4ad;border-radius:12px;padding:11px 14px;font-weight:700;cursor:pointer}
      .browser-ir-demo-btn:hover{background:rgba(255,154,60,.14)}
      .browser-ir-demo-modal{position:fixed;inset:0;z-index:10030;display:none;align-items:center;justify-content:center;padding:18px}
      .browser-ir-demo-modal.open{display:flex}
      .browser-ir-demo-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.82);backdrop-filter:blur(8px)}
      .browser-ir-demo-card{position:relative;width:min(94vw,560px);max-height:92vh;overflow:auto;border:1px solid rgba(255,154,60,.28);border-radius:22px;background:#111;padding:22px;color:#fff;box-shadow:0 26px 80px rgba(0,0,0,.58)}
      .browser-ir-demo-close{position:absolute;right:12px;top:12px;width:38px;height:38px;border:0;border-radius:12px;background:#242424;color:#fff;font-size:18px;cursor:pointer}
      .browser-ir-demo-card h3{margin:0 44px 8px 0;font-size:23px}
      .browser-ir-demo-copy{color:#c9c9c9;line-height:1.5;margin:0 0 14px}
      .browser-ir-demo-privacy{margin:12px 0;padding:10px 12px;border-radius:12px;background:rgba(56,171,90,.10);border:1px solid rgba(56,171,90,.28);color:#bcebc9;font-weight:700}
      .browser-ir-demo-file{width:100%;margin:10px 0 12px;color:#ddd}
      .browser-ir-demo-process{width:100%;border:0;border-radius:12px;padding:13px 16px;background:#f28a2e;color:#111;font-weight:900;cursor:pointer}
      .browser-ir-demo-process:disabled{opacity:.55;cursor:wait}
      .browser-ir-demo-status{min-height:24px;margin:12px 0;color:#d5d5d5;line-height:1.4}
      .browser-ir-demo-player{display:none;width:100%;margin:10px 0}
      .browser-ir-demo-ab{display:none;grid-template-columns:1fr 1fr;gap:10px;margin:10px 0}
      .browser-ir-demo-ab button{border:1px solid rgba(255,255,255,.16);border-radius:11px;padding:11px;background:#1d1d1d;color:#fff;font-weight:800;cursor:pointer}
      .browser-ir-demo-ab button.active{border-color:#f28a2e;background:rgba(242,138,46,.13)}
      .browser-ir-demo-buy{display:none;text-decoration:none;text-align:center;margin-top:12px;border-radius:12px;padding:13px 16px;background:#fff;color:#111;font-weight:900}
      @media(max-width:520px){.browser-ir-demo-card{padding:18px 16px;border-radius:18px}.browser-ir-demo-card h3{font-size:20px}.browser-ir-demo-modal{padding:10px}}
    `;
    document.head.appendChild(style);
  }
  function rms(buffer){
    let sum = 0;
    let count = 0;
    for(let channel = 0; channel < buffer.numberOfChannels; channel++){
      const data = buffer.getChannelData(channel);
      for(let i = 0; i < data.length; i++){
        sum += data[i] * data[i];
        count++;
      }
    }
    return count ? Math.sqrt(sum / count) : 0;
  }

  function peak(buffer){
    let value = 0;
    for(let channel = 0; channel < buffer.numberOfChannels; channel++){
      const data = buffer.getChannelData(channel);
      for(let i = 0; i < data.length; i++){
        value = Math.max(value, Math.abs(data[i]));
      }
    }
    return value;
  }

  function scaleBuffer(buffer, gain){
    for(let channel = 0; channel < buffer.numberOfChannels; channel++){
      const data = buffer.getChannelData(channel);
      for(let i = 0; i < data.length; i++) data[i] *= gain;
    }
    return buffer;
  }

  function normalizeWetToDry(dry, wet){
    const dryRms = rms(dry);
    const wetRms = rms(wet);
    let gain = dryRms > 1e-9 && wetRms > 1e-9 ? dryRms / wetRms : 1;
    const projectedPeak = peak(wet) * gain;
    if(projectedPeak > TARGET_PEAK) gain *= TARGET_PEAK / projectedPeak;
    return scaleBuffer(wet, gain);
  }
  function copyFirstSeconds(audioContext, decoded){
    const seconds = Math.min(10, decoded.duration);
    if(!Number.isFinite(seconds) || seconds <= 0) throw new Error("O arquivo não contém áudio reproduzível.");
    const frames = Math.max(1, Math.floor(seconds * decoded.sampleRate));
    const channels = Math.max(1, Math.min(decoded.numberOfChannels, 2));
    const copy = audioContext.createBuffer(channels, frames, decoded.sampleRate);
    for(let channel = 0; channel < channels; channel++){
      const source = decoded.getChannelData(channel);
      copy.getChannelData(channel).set(source.subarray(0, frames));
    }
    return copy;
  }

  function audioBufferToWavBlob(buffer){
    const channels = buffer.numberOfChannels;
    const frames = buffer.length;
    const bytesPerSample = 2;
    const dataBytes = frames * channels * bytesPerSample;
    const array = new ArrayBuffer(44 + dataBytes);
    const view = new DataView(array);
    const writeAscii = (offset, text) => {
      for(let i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i));
    };
    writeAscii(0, "RIFF");
    view.setUint32(4, 36 + dataBytes, true);
    writeAscii(8, "WAVE");
    writeAscii(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, channels, true);
    view.setUint32(24, buffer.sampleRate, true);
    view.setUint32(28, buffer.sampleRate * channels * bytesPerSample, true);
    view.setUint16(32, channels * bytesPerSample, true);
    view.setUint16(34, 16, true);
    writeAscii(36, "data");
    view.setUint32(40, dataBytes, true);
    let offset = 44;
    const channelData = Array.from({length: channels}, (_, index) => buffer.getChannelData(index));
    for(let frame = 0; frame < frames; frame++){
      for(let channel = 0; channel < channels; channel++){
        const sample = Math.max(-1, Math.min(1, channelData[channel][frame]));
        const pcm = sample < 0 ? Math.round(sample * 32768) : Math.round(sample * 32767);
        view.setInt16(offset, pcm, true);
        offset += 2;
      }
    }
    return new Blob([array], {type:"audio/wav"});
  }

  function switchPlayerSource(player, buttons, url, label){
    const time = Number.isFinite(player.currentTime) ? player.currentTime : 0;
    const shouldResume = !player.paused;
    player.src = url;
    player.load();
    const restore = () => {
      player.currentTime = Math.min(time, Number.isFinite(player.duration) ? player.duration : time);
      if(shouldResume) player.play().catch(()=>{});
      player.removeEventListener("loadedmetadata", restore);
    };
    player.addEventListener("loadedmetadata", restore);
    buttons.forEach(button => button.classList.toggle("active", button.dataset.source === label));
  }

  async function loadDemoIR(audioContext, demoUrl){
    const response = await fetch(demoUrl, {method:"GET", cache:"force-cache"});
    if(!response.ok) throw new Error("Não foi possível carregar o timbre DEMO neste dispositivo.");
    const bytes = await response.arrayBuffer();
    return audioContext.decodeAudioData(bytes);
  }
  async function processFile(file, elements, demoUrl){
    if(!file) throw new Error("Escolha um arquivo de áudio seco primeiro.");
    if(file.size > MAX_FILE_BYTES) throw new Error("Use um arquivo de áudio com no máximo 20 MB.");

    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    const OfflineCtor = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    if(!AudioCtor || !OfflineCtor) throw new Error("Este navegador não oferece o processamento de áudio necessário para a demo local.");

    let audioContext = null;
    try{
      audioContext = new AudioCtor();
      const inputBytes = await file.arrayBuffer();
      let decoded;
      try{
        decoded = await audioContext.decodeAudioData(inputBytes.slice(0));
      }catch(error){
        throw new Error("Não consegui decodificar este arquivo. Tente WAV, MP3, M4A, AIF ou AIFF.");
      }
      const dry = copyFirstSeconds(audioContext, decoded);
      const demoIR = await loadDemoIR(audioContext, demoUrl);

      const offline = new OfflineCtor(dry.numberOfChannels, dry.length, dry.sampleRate);
      const source = offline.createBufferSource();
      const convolver = offline.createConvolver();
      source.buffer = dry;
      convolver.buffer = demoIR;
      convolver.normalize = false;
      source.connect(convolver);
      convolver.connect(offline.destination);
      source.start(0);
      const wet = normalizeWetToDry(dry, await offline.startRendering());

      cleanupObjectUrls();
      const dryUrl = rememberObjectUrl(audioBufferToWavBlob(dry));
      const wetUrl = rememberObjectUrl(audioBufferToWavBlob(wet));
      elements.player.dataset.dryUrl = dryUrl;
      elements.player.dataset.wetUrl = wetUrl;
      elements.player.src = wetUrl;
      elements.player.style.display = "block";
      elements.ab.style.display = "grid";
      elements.buy.style.display = "block";
      elements.buttons.forEach(button => button.classList.toggle("active", button.dataset.source === "wet"));
      elements.status.textContent = `Pronto: ${Math.min(10, decoded.duration).toFixed(1)}s processados neste dispositivo.`;
    }finally{
      if(audioContext && typeof audioContext.close === "function") await audioContext.close().catch(()=>{});
    }
  }
  function closeModal(){
    if(!modal) return;
    const player = modal.querySelector(".browser-ir-demo-player");
    if(player){
      player.pause();
      player.removeAttribute("src");
      player.load();
    }
    cleanupObjectUrls();
    modal.classList.remove("open");
  }

  function ensureModal(product){
    ensureStyles();
    if(modal) return modal;

    modal = document.createElement("div");
    modal.className = "browser-ir-demo-modal";
    modal.innerHTML = `
      <div class="browser-ir-demo-backdrop"></div>
      <section class="browser-ir-demo-card" role="dialog" aria-modal="true" aria-labelledby="browserIrDemoTitle">
        <button class="browser-ir-demo-close" type="button" aria-label="Fechar">✕</button>
        <h3 id="browserIrDemoTitle">TB-BASS IR — teste local</h3>
        <p class="browser-ir-demo-copy">Escolha um áudio seco do seu baixo. A demo processa somente os primeiros 10 segundos neste dispositivo.</p>
        <div class="browser-ir-demo-privacy">Seu áudio não é enviado para o servidor</div>
        <input class="browser-ir-demo-file" type="file" accept="audio/*,.wav,.mp3,.m4a,.aif,.aiff">
        <button class="browser-ir-demo-process" type="button">Processar 10s neste dispositivo</button>
        <div class="browser-ir-demo-status" aria-live="polite"></div>
        <audio class="browser-ir-demo-player" controls playsinline></audio>
        <div class="browser-ir-demo-ab">
          <button type="button" data-source="dry">Original</button>
          <button type="button" data-source="wet">TB-BASS Demo</button>
        </div>
        <a class="browser-ir-demo-buy" target="_blank" rel="noopener">Comprar IR</a>
      </section>
    `;
    document.body.appendChild(modal);
    const fileInput = modal.querySelector(".browser-ir-demo-file");
    const processButton = modal.querySelector(".browser-ir-demo-process");
    const status = modal.querySelector(".browser-ir-demo-status");
    const player = modal.querySelector(".browser-ir-demo-player");
    const ab = modal.querySelector(".browser-ir-demo-ab");
    const buttons = Array.from(ab.querySelectorAll("button"));
    const buy = modal.querySelector(".browser-ir-demo-buy");

    modal.querySelector(".browser-ir-demo-backdrop").addEventListener("click", closeModal);
    modal.querySelector(".browser-ir-demo-close").addEventListener("click", closeModal);

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const url = button.dataset.source === "dry" ? player.dataset.dryUrl : player.dataset.wetUrl;
        if(url) switchPlayerSource(player, buttons, url, button.dataset.source);
      });
    });

    processButton.addEventListener("click", async () => {
      processButton.disabled = true;
      processButton.textContent = "Processando neste dispositivo...";
      status.textContent = "Preparando a comparação local...";
      player.style.display = "none";
      ab.style.display = "none";
      buy.style.display = "none";
      try{
        await processFile(fileInput.files && fileInput.files[0], {player, ab, buy, buttons, status}, activeDemoUrl);
      }catch(error){
        cleanupObjectUrls();
        status.textContent = `Não consegui gerar a demo: ${error && error.message ? error.message : error}`;
      }finally{
        processButton.disabled = false;
        processButton.textContent = "Processar 10s neste dispositivo";
      }
    });

    return modal;
  }
  function openModal(product){
    const demoUrl = DEMO_ASSETS[product?.irId];
    if(!demoUrl) return;
    activeDemoUrl = demoUrl;
    const current = ensureModal(product);
    const status = current.querySelector(".browser-ir-demo-status");
    const player = current.querySelector(".browser-ir-demo-player");
    const ab = current.querySelector(".browser-ir-demo-ab");
    const buy = current.querySelector(".browser-ir-demo-buy");
    const title = current.querySelector("#browserIrDemoTitle");
    title.textContent = `${product.nome} — teste local`;
    buy.href = product.link;
    buy.textContent = `Comprar ${product.nome}`;
    cleanupObjectUrls();
    player.pause();
    player.removeAttribute("src");
    player.style.display = "none";
    player.load();
    ab.style.display = "none";
    buy.style.display = "none";
    status.textContent = "";
    current.classList.add("open");
  }

  function attachToCard({card, product}){
    const demoUrl = DEMO_ASSETS[product?.irId];
    if(!isEnabled() || !demoUrl) return false;
    if(!card || card.querySelector(".browser-ir-demo-btn")) return Boolean(card);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "browser-ir-demo-btn";
    button.textContent = "🔒 Testar localmente no navegador";
    button.addEventListener("click", () => openModal(product));
    const buyButton = card.querySelector(".buy-btn");
    if(buyButton) buyButton.insertAdjacentElement("afterend", button);
    else card.appendChild(button);
    return true;
  }

  window.TBBrowserIRDemo = {
    attachToCard
  };
})();
