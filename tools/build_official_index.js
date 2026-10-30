const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const publicIndex = path.join(root, "public", "index.html");
const rootIndex = path.join(root, "index.html");

const html = `<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>IR para Baixo e Contrabaixo | TB-BASS IR</title>
  <meta name="description" content="IR para baixo e contrabaixo (Impulse Response) em WAV 24-bit para Tank-B, Cuvave e pedaleiras. Compare timbres, teste com seu próprio baixo e compre online.">
  <meta name="keywords" content="IR para baixo, impulse response baixo, ir tank b, ir cuvave, presets tank b, impulse response contrabaixo, timbres de baixo, pack ir baixo, sadowsky ir, fender bass ir">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="canonical" href="https://tbbassir.com.br/">
  <link rel="icon" href="/logo.png">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="TB-BASS IR">
  <meta property="og:title" content="IR para Baixo e Contrabaixo | TB-BASS IR">
  <meta property="og:description" content="IR para baixo e contrabaixo em WAV 24-bit, com timbres profissionais para pedaleiras compatíveis. Compare os timbres e teste com seu próprio baixo.">
  <meta property="og:url" content="https://tbbassir.com.br/">
  <meta property="og:image" content="https://tbbassir.com.br/bg-hero.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">
  {"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://tbbassir.com.br/#organization","name":"TB-BASS IR","url":"https://tbbassir.com.br/","logo":"https://tbbassir.com.br/logo.png","member":{"@id":"https://tbbassir.com.br/#silas-marinho"}},{"@type":"Person","@id":"https://tbbassir.com.br/#silas-marinho","name":"Silas Marinho","memberOf":{"@id":"https://tbbassir.com.br/#organization"},"sameAs":["https://www.instagram.com/silasmarinhobx/"]},{"@type":"WebSite","@id":"https://tbbassir.com.br/#website","url":"https://tbbassir.com.br/","name":"TB-BASS IR","inLanguage":"pt-BR","publisher":{"@id":"https://tbbassir.com.br/#organization"}}]}
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é um IR para baixo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "É uma captura acústica de alta resolução (Impulse Response em WAV 24-bit) que recria na sua pedaleira o timbre exato de contrabaixos e gabinetes consagrados."
        }
      },
      {
        "@type": "Question",
        "name": "Como instalar o IR na Tank-B ou Cuvave?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Conecte sua pedaleira ao celular via Bluetooth usando o aplicativo M-EFCS ou ao computador via USB com o CubeSuite. Na aba de IRs, selecione o arquivo WAV 24-bit e carregue diretamente para o slot desejado."
        }
      },
      {
        "@type": "Question",
        "name": "Funciona em quais pedaleiras de contrabaixo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Compatível com qualquer equipamento com suporte a IR Loader: M-Vave Tank-B, Cuvave Baby Bass, Mooer, Zoom B1 Four / B3n, Ampero, Boss, Headrush, Line 6 e plugins no computador."
        }
      }
    ]
  }
  </script>

  <!-- Google Tag (GA4) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-FNRVG1V5MC"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-FNRVG1V5MC');
  </script>
  <!-- Fim Google Tag -->

  <!-- Meta Pixel Code -->
  <script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '1147738740851849');
  fbq('track', 'PageView');
  fbq('track', 'ViewContent');
  </script>
  <noscript>
    <img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=1147738740851849&ev=PageView&noscript=1"/>
  </noscript>
  <!-- End Meta Pixel Code -->

  <!-- UTMify (UTMs) -->
  <script
    src="https://cdn.utmify.com.br/scripts/utms/latest.js"
    data-utmify-prevent-xcod-sck
    data-utmify-prevent-subids
    data-utmify-ignore-classes="tb-whatsapp-direct"
    async
    defer
  ></script>
  <!-- /UTMify -->
  <!-- UTMify Pixel -->
  <script>
    window.pixelId = "6a1f37d4b460776ed0169286";
    var a = document.createElement("script");
    a.setAttribute("async", "");
    a.setAttribute("defer", "");
    a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
    document.head.appendChild(a);
  </script>

  <style>
    :root {
      --accent: #ff9a3c;
      --accent-dark: #ff6810;
      --accent-gradient: linear-gradient(135deg, #ff9a3c 0%, #ff5e0e 100%);
      --accent-soft: rgba(255, 154, 60, 0.15);
      --bg: #060608;
      --bg-card: #0d0d12;
      --bg-card-hover: #14141c;
      --text: #ffffff;
      --text-muted: #9e9ea8;
      --line: rgba(255, 255, 255, 0.08);
      --font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font);
      line-height: 1.5;
      overflow-x: hidden;
      scroll-behavior: smooth;
    }

    /* FUNDO FIXO CINEMATOGRÁFICO */
    .bg-layer {
      position: fixed;
      inset: 0;
      z-index: -2;
      background: radial-gradient(circle at 18% 20%, rgba(255,122,24,.12), transparent 24%),
                  radial-gradient(circle at 82% 62%, rgba(255,184,92,.08), transparent 28%),
                  linear-gradient(115deg, #020202 0%, #090705 46%, #020202 100%);
      overflow: hidden;
    }
    .bg-layer::before {
      content: "";
      position: absolute;
      inset: -25%;
      background: radial-gradient(ellipse at 28% 42%, rgba(255,122,24,.16), transparent 25%),
                  radial-gradient(ellipse at 72% 58%, rgba(255,188,110,.10), transparent 24%),
                  conic-gradient(from 205deg at 50% 50%, transparent 0 38%, rgba(255,122,24,.055) 44%, transparent 50% 100%);
      filter: blur(22px);
      animation: tbLuxuryDrift 18s ease-in-out infinite alternate;
      will-change: transform;
      pointer-events: none;
    }
    .bg-layer::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(108deg, transparent 20%, rgba(255,255,255,.018) 36%, rgba(255,145,55,.055) 48%, transparent 60%),
                  radial-gradient(circle at center, transparent 36%, rgba(0,0,0,.88) 88%);
      background-size: 180% 100%, 100% 100%;
      animation: tbLuxurySweep 13s ease-in-out infinite alternate;
      pointer-events: none;
    }
    @keyframes tbLuxuryDrift {
      0% { transform: translate3d(-3%, -2%, 0) scale(1); }
      50% { transform: translate3d(4%, 3%, 0) scale(1.08); }
      100% { transform: translate3d(-1%, 5%, 0) scale(1.03); }
    }
    @keyframes tbLuxurySweep {
      0% { background-position: 0% 50%, center; }
      100% { background-position: 100% 50%, center; }
    }
    @media (prefers-reduced-motion: reduce) {
      .bg-layer::before, .bg-layer::after { animation: none !important; }
    }

    /* NAVEGAÇÃO */
    .tb-site-nav {
      position: sticky;
      top: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1240px;
      margin: 0 auto;
      padding: 16px 24px;
      background: rgba(6, 6, 8, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--line);
    }
    .tb-site-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: #fff;
      font-weight: 900;
      font-size: 1.25rem;
      letter-spacing: -0.02em;
    }
    .tb-site-brand span {
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .tb-site-links {
      display: flex;
      gap: 24px;
    }
    .tb-site-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      transition: color 0.2s;
    }
    .tb-site-links a:hover { color: #fff; }
    .tb-site-cta {
      display: inline-flex;
      align-items: center;
      padding: 10px 20px;
      background: var(--accent-gradient);
      color: #080808;
      font-weight: 800;
      font-size: 13px;
      border-radius: 999px;
      text-decoration: none;
      box-shadow: 0 4px 18px rgba(255, 110, 20, 0.35);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .tb-site-cta:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(255, 110, 20, 0.5); }
    @media (max-width: 768px) {
      .tb-site-links { display: none; }
      .tb-site-nav { padding: 14px 18px; }
    }

    /* HERO LUXURY SPLIT */
    .conversion-shell {
      max-width: 1240px;
      margin: 0 auto;
      padding: 60px 24px 30px;
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 48px;
      align-items: center;
      position: relative;
    }
    .conversion-kicker {
      display: inline-block;
      margin-bottom: 14px;
      color: var(--accent);
      font-size: 12px;
      font-weight: 900;
      letter-spacing: .16em;
      text-transform: uppercase;
    }
    .conversion-shell h1 {
      margin: 0 0 16px;
      color: #fff;
      font-size: clamp(2.4rem, 4.6vw, 3.8rem);
      line-height: 1.05;
      font-weight: 900;
      letter-spacing: -0.04em;
    }
    .conversion-copy {
      color: var(--text-muted);
      font-size: clamp(1rem, 1.8vw, 1.15rem);
      line-height: 1.6;
      margin-bottom: 24px;
      max-width: 580px;
    }

    /* DESATIVAÇÃO SOLICITADA PELO CLIENTE: COMPARATIVO E TESTAR BAIXO */
    .ab-player-box {
      display: none !important;
    }
    .try-ir-btn, .ir-test-support-note {
      display: none !important;
    }
    .hero-feature-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin: 20px 0 28px;
    }
    .hero-feature-item {
      display: flex;
      align-items: center;
      gap: 12px;
      color: rgba(255, 255, 255, 0.88);
      font-size: 14.5px;
      font-weight: 600;
    }
    .hero-feature-item svg {
      flex-shrink: 0;
    }

    /* A/B AUDIO PLAYER NO HERO (MANTIDO DESATIVADO) */
    .ab-player-box {
      background: linear-gradient(145deg, rgba(25, 20, 18, 0.85), rgba(12, 12, 15, 0.95));
      border: 1px solid rgba(255, 154, 60, 0.3);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 22px;
      margin-bottom: 28px;
    }
    .ab-player-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      flex-wrap: wrap;
      gap: 10px;
    }
    .ab-title {
      font-size: 12px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--accent);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ab-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 10px var(--accent);
    }
    .ab-toggle-group {
      display: flex;
      background: #000;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 999px;
      padding: 3px;
      gap: 3px;
    }
    .ab-btn {
      background: transparent;
      border: none;
      color: #777;
      padding: 7px 14px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.2s;
    }
    .ab-btn.active {
      background: var(--accent-gradient);
      color: #000;
      box-shadow: 0 2px 10px rgba(255, 110, 20, 0.4);
    }
    .ab-player-controls {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .play-circle {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background: var(--accent-gradient);
      border: none;
      color: #000;
      display: grid;
      place-items: center;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(255, 110, 20, 0.35);
      transition: transform 0.15s;
      flex-shrink: 0;
    }
    .play-circle:hover { transform: scale(1.06); }
    .play-circle svg { width: 22px; height: 22px; fill: #000; margin-left: 2px; }
    .waveform-visualizer {
      flex: 1;
      height: 48px;
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 0 10px;
      background: rgba(0, 0, 0, 0.45);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .wave-bar {
      flex: 1;
      height: 8px;
      background: rgba(255, 154, 60, 0.3);
      border-radius: 4px;
      transition: height 0.15s ease;
    }
    .is-playing .wave-bar { animation: wavePulse 0.9s ease-in-out infinite alternate; }
    .is-playing .wave-bar:nth-child(2n) { animation-delay: 0.12s; }
    .is-playing .wave-bar:nth-child(3n) { animation-delay: 0.24s; }
    .is-playing .wave-bar:nth-child(4n) { animation-delay: 0.36s; }
    @keyframes wavePulse {
      0% { height: 6px; background: rgba(255, 154, 60, 0.4); }
      100% { height: 38px; background: #ff9a3c; }
    }
    .ab-now-playing {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      font-size: 12px;
      color: var(--text-muted);
    }
    .ab-now-playing strong { color: #fff; }

    /* AÇÕES DO HERO */
    .conversion-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      margin-top: 24px;
    }
    .conversion-actions a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 52px;
      padding: 0 26px;
      border-radius: 14px;
      text-decoration: none;
      font-weight: 900;
      font-size: 14px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .conversion-primary {
      background: var(--accent-gradient);
      color: #080808;
      box-shadow: 0 10px 30px rgba(255, 110, 20, 0.35);
    }
    .conversion-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 38px rgba(255, 110, 20, 0.5); }
    .conversion-secondary {
      border: 1px solid rgba(255, 154, 60, 0.4);
      background: rgba(255, 255, 255, 0.045);
      color: #fff;
    }
    .conversion-secondary:hover { background: rgba(255, 255, 255, 0.08); border-color: var(--accent); transform: translateY(-2px); }

    .social-proof {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 22px;
      font-size: 13px;
      color: var(--text-muted);
    }
    .stars { color: #ffb703; font-size: 15px; letter-spacing: 2px; }

    /* GEAR STAGE CARD NO HERO - RANKING TOP 3 */
    .stage-card {
      background: radial-gradient(circle at 50% 30%, rgba(255, 122, 24, 0.16), transparent 70%), var(--bg-card);
      border: 1px solid var(--line);
      border-radius: 28px;
      padding: 24px 22px 18px;
      text-align: center;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7);
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      min-height: 410px;
    }
    .stage-rank-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: linear-gradient(135deg, #ff4500, #ff8c00);
      color: #fff;
      font-weight: 800;
      font-size: 11px;
      padding: 5px 14px;
      border-radius: 999px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 12px rgba(255, 69, 0, 0.4);
      margin-bottom: 8px;
      transition: all 0.25s ease;
    }
    .gear-bass-wrap {
      height: 240px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    .gear-bass {
      max-width: 100%;
      max-height: 220px;
      object-fit: contain;
      filter: drop-shadow(0 18px 38px rgba(0,0,0,0.85));
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .stage-card:hover .gear-bass { transform: scale(1.03); }
    .gear-pedal-badge {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      background: #08080a;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 12px 18px;
      font-size: 13px;
      margin-top: 14px;
    }
    .pedal-led {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #00ff88;
      box-shadow: 0 0 12px #00ff88;
    }
    .stage-indicators {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }
    .stage-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      cursor: pointer;
      padding: 0;
      transition: all 0.25s ease;
    }
    .stage-dot.active {
      width: 22px;
      border-radius: 999px;
      background: var(--accent);
      box-shadow: 0 0 10px var(--accent);
    }

    @media (max-width: 900px) {
      .conversion-shell { grid-template-columns: 1fr; gap: 36px; padding: 40px 18px 20px; }
      .conversion-shell h1 { font-size: clamp(2rem, 8vw, 3rem); }
      .stage-card { max-width: 420px; margin: 0 auto; width: 100%; }
      .gear-bass { height: 230px; }
    }

    /* CONVERSION TRUST */
    .conversion-trust {
      max-width: 1240px;
      margin: 0 auto 30px;
      padding: 0 24px;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .conversion-trust span {
      flex: 1 1 210px;
      padding: 14px 16px;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.025);
      color: rgba(255, 255, 255, 0.85);
      font-size: 13px;
      font-weight: 800;
      text-align: center;
      backdrop-filter: blur(8px);
    }

    /* DEVICES STRIP */
    .devices-strip {
      max-width: 1240px;
      margin: 20px auto 40px;
      padding: 24px 20px;
      border-top: 1px solid var(--line);
      border-bottom: 1px solid var(--line);
      text-align: center;
    }
    .devices-strip span {
      display: block;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 14px;
    }
    .device-tags {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    .device-pill {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--line);
      border-radius: 999px;
      padding: 7px 16px;
      font-size: 12px;
      font-weight: 700;
      color: #ddd;
    }

    /* FEEDBACKS REAIS */
    .tb-feedbacks {
      max-width: 1180px;
      margin: 48px auto 28px;
      padding: 0 18px;
      text-align: center;
    }
    .tb-feedbacks-kicker {
      display: inline-block;
      margin-bottom: 10px;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: .16em;
      text-transform: uppercase;
      color: var(--accent);
    }
    .tb-feedbacks h2 {
      margin: 0;
      font-size: clamp(26px, 4vw, 40px);
      line-height: 1.1;
      font-weight: 900;
      letter-spacing: -0.03em;
      color: #fff;
    }
    .tb-feedbacks-intro {
      max-width: 680px;
      margin: 12px auto 24px;
      color: var(--text-muted);
      line-height: 1.6;
      font-size: 14px;
    }
    .tb-feedback-stack {
      appearance: none;
      display: block;
      position: relative;
      width: min(100%, 420px);
      height: 290px;
      margin: 0 auto 16px;
      padding: 0;
      border: 0;
      background: transparent !important;
      box-shadow: none !important;
      cursor: zoom-in;
    }
    .tb-feedback-stack:hover { transform: translateY(-3px) !important; }
    .tb-feedback-stack-card {
      position: absolute;
      inset: 0;
      margin: auto;
      width: 82%;
      height: 260px;
      padding: 8px;
      box-sizing: border-box;
      border: 1px solid rgba(255, 154, 60, 0.22);
      border-radius: 20px;
      background: #0b0b0c;
      box-shadow: 0 24px 65px rgba(0,0,0,.54);
      overflow: hidden;
      transition: transform .25s ease;
    }
    .tb-feedback-stack-card img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
      border-radius: 13px;
      background: #000;
    }
    .tb-feedback-stack-card:nth-child(1) { z-index: 3; transform: translateY(0) rotate(-1deg); }
    .tb-feedback-stack-card:nth-child(2) { z-index: 2; transform: translate(24px, 10px) rotate(4deg); }
    .tb-feedback-stack-card:nth-child(3) { z-index: 1; transform: translate(-24px, 13px) rotate(-5deg); }
    .tb-feedback-stack:hover .tb-feedback-stack-card:nth-child(1) { transform: translateY(-4px) rotate(-1deg); }
    .tb-feedback-stack:hover .tb-feedback-stack-card:nth-child(2) { transform: translate(32px, 14px) rotate(5deg); }
    .tb-feedback-stack:hover .tb-feedback-stack-card:nth-child(3) { transform: translate(-32px, 17px) rotate(-6deg); }
    .tb-feedback-stack-label {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: 2px;
      color: #ffd1aa;
      font-size: 13px;
      font-weight: 800;
    }
    .tb-feedback-dialog {
      width: min(94vw, 720px);
      max-height: 94vh;
      padding: 0;
      border: 1px solid rgba(255, 154, 60, 0.2);
      border-radius: 20px;
      background: #090909;
      box-shadow: 0 30px 110px rgba(0,0,0,.9);
      overflow: hidden;
    }
    .tb-feedback-dialog::backdrop { background: rgba(0,0,0,.9); backdrop-filter: blur(5px); }
    .tb-feedback-view {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 320px;
      background: #050505;
    }
    .tb-feedback-view img {
      display: block;
      width: 100%;
      height: auto;
      max-height: 82vh;
      object-fit: contain;
      background: #050505;
    }
    .tb-feedback-close, .tb-feedback-nav {
      position: absolute;
      z-index: 3;
      border: 1px solid rgba(255,255,255,.18) !important;
      background: rgba(0,0,0,.72) !important;
      color: #fff !important;
      box-shadow: none !important;
      backdrop-filter: blur(8px);
    }
    .tb-feedback-close { right: 12px; top: 12px; width: 42px; height: 42px; padding: 0 !important; border-radius: 50% !important; font-size: 24px; }
    .tb-feedback-nav { top: 50%; width: 46px; height: 54px; padding: 0 !important; margin: 0 !important; border-radius: 14px !important; transform: translateY(-50%) !important; font-size: 25px; }
    #tbFeedbackPrev { left: 12px; }
    #tbFeedbackNext { right: 12px; }
    .tb-feedback-counter {
      position: absolute;
      left: 50%;
      bottom: 12px;
      transform: translateX(-50%);
      z-index: 3;
      padding: 7px 11px;
      border-radius: 999px;
      background: rgba(0,0,0,.72);
      color: #fff;
      font-size: 12px;
      font-weight: 800;
    }
    @media (max-width: 760px) {
      .tb-feedbacks { margin: 40px auto 20px; padding: 0 14px; }
      .tb-feedback-stack { height: 250px; width: min(92vw, 370px); }
      .tb-feedback-stack-card { height: 225px; width: 80%; }
      .tb-feedback-dialog { width: 96vw; }
      .tb-feedback-view { min-height: 280px; }
    }

    /* VÍDEO PRINCIPAL DE APRESENTAÇÃO */
    .tb-sales-video {
      max-width: 1180px;
      margin: 24px auto 0;
      padding: 36px 24px 12px;
      position: relative;
      text-align: center;
    }
    .tb-sales-video-copy { margin: 0 auto 24px; max-width: 620px; }
    .tb-sales-video-kicker {
      display: inline-block;
      margin: 0 0 10px;
      color: var(--accent);
      font-size: 12px;
      font-weight: 900;
      letter-spacing: .16em;
      text-transform: uppercase;
    }
    .tb-sales-video h2 {
      margin: 0;
      color: #fff;
      font-size: clamp(1.6rem, 3.2vw, 2.4rem);
      font-weight: 900;
      letter-spacing: -.03em;
    }
    .tb-sales-video-stage{width:min(100%,330px);
      margin: 0 auto;
      padding: 10px;
      border: 1px solid rgba(255, 154, 60, .25);
      border-radius: 34px;
      background: linear-gradient(145deg, rgba(24, 18, 14, .85), rgba(5, 5, 6, .95));
      box-shadow: 0 34px 90px rgba(0,0,0,.6), 0 0 42px rgba(255, 122, 24, .1);
      position: relative;
      isolation: isolate;
    }
    .tb-sales-video-stage::before {
      content: "";
      position: absolute;
      inset: 12% -8%;
      z-index: -1;
      border-radius: 40%;
      background: radial-gradient(ellipse, rgba(255,122,24,.13), transparent 66%);
      filter: blur(30px);
      pointer-events: none;
    }
    .tb-sales-video-frame {
      position: relative;
      aspect-ratio: 9/16;
      overflow: hidden;
      border-radius: 25px;
      background: #020202;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.055);
    }
    .tb-sales-video-player {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      background: #020202;
      outline: none;
    }
    .tb-sales-video-play {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) !important;
      width: 76px;
      height: 76px;
      border: 1px solid rgba(255, 255, 255, .28) !important;
      border-radius: 50% !important;
      background: rgba(8, 8, 9, .72) !important;
      color: #fff !important;
      box-shadow: 0 16px 48px rgba(0,0,0,.45), 0 0 28px rgba(255, 122, 24, .25) !important;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: grid;
      place-items: center;
      cursor: pointer;
      z-index: 3;
      transition: opacity .2s ease, transform .2s ease !important;
    }
    .tb-sales-video-play::after {
      content: "";
      width: 0;
      height: 0;
      border-top: 11px solid transparent;
      border-bottom: 11px solid transparent;
      border-left: 17px solid #fff;
      margin-left: 5px;
      filter: drop-shadow(0 0 8px rgba(255,255,255,.24));
    }
    .tb-sales-video-play:hover { transform: translate(-50%, -50%) scale(1.06) !important; }
    .tb-sales-video-frame.is-playing .tb-sales-video-play { opacity: 0; pointer-events: none; }
    @media (max-width: 720px) {
      .tb-sales-video { padding: 30px 14px 8px !important; }
      .tb-sales-video-stage { width: min(100%, 330px); padding: 7px; border-radius: 26px; }
      .tb-sales-video-play { width: 66px; height: 66px; }
    }

    /* TONE NAVIGATOR */
    #toneNavigator {
      max-width: 1240px;
      margin: 40px auto 10px;
      padding: 28px 24px 10px;
      text-align: center;
    }
    .tone-navigator-kicker {
      display: block;
      margin-bottom: 8px;
      color: var(--accent);
      font-size: 11px;
      font-weight: 900;
      letter-spacing: .15em;
      text-transform: uppercase;
    }
    #toneNavigator h2 {
      margin: 0 0 20px;
      font-size: clamp(1.6rem, 3.2vw, 2.5rem);
      font-weight: 900;
      letter-spacing: -0.03em;
      color: #fff;
    }
    .tone-filter-row {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    .tone-filter-row button {
      min-height: 44px;
      margin: 0;
      padding: 10px 22px;
      border: 1px solid rgba(255, 255, 255, .12);
      border-radius: 999px !important;
      background: rgba(255, 255, 255, .04);
      color: #ccc;
      font-weight: 800;
      font-size: 13px;
      cursor: pointer;
      box-shadow: none !important;
      transition: all 0.2s ease;
    }
    .tone-filter-row button:hover {
      background: rgba(255, 154, 60, 0.15);
      border-color: var(--accent);
      color: #fff;
    }
    .tone-filter-row button[aria-pressed="true"] {
      border-color: rgba(255, 154, 60, .6);
      background: var(--accent-gradient);
      color: #080808;
      box-shadow: 0 4px 18px rgba(255, 110, 20, 0.35) !important;
    }
    @media (max-width: 720px) {
      .tone-filter-row {
        justify-content: flex-start;
        overflow-x: auto;
        flex-wrap: nowrap;
        padding: 0 4px 10px;
      }
      .tone-filter-row button { flex: 0 0 auto; }
    }

    /* RACK VITRINE DE PRODUTOS */
    #produtos.grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(285px, 1fr));
      gap: 26px;
      max-width: 1240px;
      margin: 0 auto;
      padding: 24px 20px 60px;
    }
    .card.tb-product-card {
      background: linear-gradient(165deg, rgba(20, 18, 24, 0.94) 0%, rgba(10, 10, 14, 0.98) 100%);
      border: 1px solid rgba(255, 154, 60, 0.2);
      border-radius: 22px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.05);
      transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
    }
    .card.tb-product-card:hover {
      transform: translateY(-6px);
      border-color: rgba(255, 154, 60, 0.55);
      box-shadow: 0 28px 70px rgba(0, 0, 0, 0.75), 0 0 35px rgba(255, 122, 24, 0.2);
    }
    .tb-instrument-photo {
      height: 185px !important;
      margin: -6px -6px 14px !important;
      overflow: hidden !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-radius: 16px !important;
      background: radial-gradient(ellipse at 50% 55%, rgba(255, 130, 35, 0.16) 0%, rgba(255, 130, 35, 0.04) 40%, transparent 70%) !important;
      position: relative !important;
    }
    .tb-instrument-photo img {
      max-height: 170px !important;
      width: 94% !important;
      object-fit: contain !important;
      object-position: center !important;
      filter: drop-shadow(0 14px 20px rgba(0,0,0,0.75)) drop-shadow(0 0 12px rgba(255,125,28,0.15)) !important;
      transition: transform 0.3s ease !important;
    }
    .tb-product-card:hover .tb-instrument-photo img { transform: scale(1.05) !important; }
    .card.tb-product-card h3 {
      font-size: 1.25rem;
      font-weight: 800;
      margin: 4px 0 8px;
      color: #fff;
      line-height: 1.3;
    }
    .card.tb-product-card h3 a {
      color: #fff;
      text-decoration: none;
      transition: color 0.2s;
    }
    .card.tb-product-card h3 a:hover { color: var(--accent); }
    .card.tb-product-card p {
      font-size: 13.5px;
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 14px;
      flex-grow: 1;
    }
    .price-wrap {
      margin: 14px 0;
      padding: 12px 14px;
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      text-align: left;
    }
    .price-line {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
    }
    .price-old {
      color: #777;
      font-size: 13px;
      text-decoration: line-through;
    }
    .badge-off {
      background: rgba(46, 204, 113, 0.15);
      color: #2ecc71;
      border: 1px solid rgba(46, 204, 113, 0.35);
      font-weight: 800;
      font-size: 11px;
      padding: 2px 7px;
      border-radius: 5px;
    }
    .price-new {
      font-size: 1.65rem;
      font-weight: 900;
      color: #fff;
      letter-spacing: -0.02em;
    }
    .buy-btn {
      width: 100%;
      min-height: 50px;
      background: var(--accent-gradient);
      color: #080808;
      font-weight: 900;
      font-size: 14px;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(255, 110, 20, 0.35);
      transition: transform 0.15s, box-shadow 0.15s;
      margin-top: 8px;
    }
    .buy-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255, 110, 20, 0.5);
    }
    .video-btn {
      width: 100%;
      min-height: 40px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #fff;
      font-weight: 700;
      font-size: 13px;
      border-radius: 10px;
      cursor: pointer;
      margin-bottom: 8px;
      transition: background 0.2s;
    }
    .video-btn:hover { background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 154, 60, 0.4); }
    .try-ir-btn {
      width: 100%;
      min-height: 42px;
      background: rgba(255, 154, 60, 0.12);
      border: 1px solid rgba(255, 154, 60, 0.35);
      color: #ffb570;
      font-weight: 800;
      font-size: 13px;
      border-radius: 10px;
      cursor: pointer;
      margin-bottom: 8px;
      transition: all 0.2s;
    }
    .try-ir-btn:hover { background: rgba(255, 154, 60, 0.22); color: #fff; }
    .ir-test-support-note {
      font-size: 11px;
      color: #888;
      line-height: 1.4;
      margin-bottom: 10px;
      text-align: left;
    }

    /* COMBOS VITRINE */
    .tb-combos-section {
      max-width: 1240px;
      margin: 60px auto 40px;
      padding: 0 20px;
      text-align: center;
    }
    .combos-header { margin-bottom: 36px; }
    .combos-tag {
      display: inline-block;
      background: rgba(255, 122, 24, 0.15);
      border: 1px solid rgba(255, 122, 24, 0.4);
      color: var(--accent);
      font-size: 11px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 6px 14px;
      border-radius: 20px;
      margin-bottom: 12px;
    }
    .combos-header h2 {
      font-size: clamp(2rem, 3.8vw, 2.7rem);
      font-weight: 900;
      color: #ffffff;
      margin: 8px 0;
      letter-spacing: -0.03em;
    }
    .combos-header p {
      color: var(--text-muted);
      font-size: 15px;
      max-width: 650px;
      margin: 0 auto;
      line-height: 1.5;
    }
    .combos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
      text-align: left;
    }
    .card.tb-combo-card {
      background: linear-gradient(155deg, rgba(28, 20, 16, 0.94) 0%, rgba(12, 11, 14, 0.98) 100%);
      border: 1px solid rgba(255, 154, 60, 0.32);
      border-radius: 24px;
      padding: 26px;
      position: relative;
      transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.65), 0 0 25px rgba(255, 122, 24, 0.08);
    }
    .card.tb-combo-card:hover {
      transform: translateY(-6px);
      border-color: rgba(255, 154, 60, 0.65);
      box-shadow: 0 28px 70px rgba(0, 0, 0, 0.75), 0 0 35px rgba(255, 122, 24, 0.22);
    }
    .combo-top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      margin-bottom: 14px;
    }
    .badge-combo-highlight {
      background: linear-gradient(135deg, #ff4500, #ff8c00);
      color: #ffffff;
      font-weight: 800;
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .badge-combo-economy {
      background: rgba(46, 204, 113, 0.15);
      color: #2ecc71;
      border: 1px solid rgba(46, 204, 113, 0.35);
      font-weight: 800;
      font-size: 11px;
      padding: 4px 8px;
      border-radius: 6px;
    }
    .card.tb-combo-card h3 {
      font-size: 1.25rem;
      font-weight: 800;
      color: #ffffff;
      margin: 0 0 10px;
      line-height: 1.3;
    }
    .combo-items-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 12px;
    }
    .combo-item-pill {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #e5e5e5;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
    }
    .combo-desc {
      font-size: 13.5px;
      color: var(--text-muted);
      line-height: 1.45;
      margin: 0 0 16px;
      flex-grow: 1;
    }
    .combo-price-subtext {
      font-size: 11px;
      color: #888;
      margin-top: 4px;
    }
    .combo-buy-btn {
      margin-top: 14px;
      background: var(--accent-gradient);
      color: #080808;
      font-weight: 900;
      font-size: 14px;
      padding: 14px;
      border-radius: 12px;
      border: none;
      cursor: pointer;
      width: 100%;
      box-shadow: 0 6px 20px rgba(255, 110, 20, 0.35);
      transition: transform 0.15s, box-shadow 0.15s;
    }
    .combo-buy-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255, 110, 20, 0.5);
    }

    /* FAQ */
    #faq {
      max-width: 900px;
      margin: 70px auto 40px;
      padding: 40px 24px;
      background: rgba(13, 13, 18, 0.7);
      border: 1px solid var(--line);
      border-radius: 26px;
      text-align: left;
    }
    #faq h2 {
      color: var(--accent);
      font-size: clamp(1.8rem, 3.2vw, 2.4rem);
      font-weight: 900;
      margin-bottom: 24px;
      text-align: center;
      letter-spacing: -0.03em;
    }
    details {
      background: rgba(255, 255, 255, 0.025);
      border: 1px solid var(--line);
      border-radius: 14px;
      padding: 16px 20px;
      margin-bottom: 12px;
      transition: background 0.2s;
    }
    details[open] { background: rgba(255, 255, 255, 0.045); border-color: rgba(255, 154, 60, 0.3); }
    summary {
      font-weight: 800;
      font-size: 15px;
      cursor: pointer;
      color: #fff;
      outline: none;
    }
    details p {
      margin-top: 12px;
      color: var(--text-muted);
      font-size: 14px;
      line-height: 1.6;
    }

    /* SELOS DE CONFIANÇA */
    .tb-trust-section {
      max-width: 1100px;
      margin: 40px auto 20px;
      padding: 0 16px;
    }

    /* FOOTER */
    footer {
      opacity: 0.9;
      font-size: 13px;
      max-width: 980px;
      margin: 40px auto 60px;
      line-height: 1.7;
      padding: 0 20px;
      text-align: center;
      color: #999;
    }

    /* WHATSAPP FLOAT */
    #whats-menu-wrap {
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 9999;
    }
    #whats-float {
      width: 62px;
      height: 62px;
      background: #25D366;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 30px rgba(37, 211, 102, 0.6);
      cursor: pointer;
      transition: transform 0.2s;
    }
    #whats-float:hover { transform: scale(1.08); }
    #whats-float img { width: 34px; height: 34px; }
  </style>
</head>

<body>

<div class="bg-layer"></div>

<header class="tb-site-nav" aria-label="Navegação principal">
  <a class="tb-site-brand" href="#conversionHero" aria-label="TB-BASS IR">TB-BASS <span>IR</span></a>
  <nav class="tb-site-links" aria-label="Seções">
    <a href="#conversionHero">Início</a>
    <a href="#feedbacks-reais">Depoimentos</a>
    <a href="#video-demo">Vídeos</a>
    <a href="#toneNavigator">Timbres</a>
    <a href="#combos-vitrine">Combos</a>
    <a href="#faq">Dúvidas</a>
  </nav>
  <a class="tb-site-cta" href="#produtos">Acessar Loja</a>
</header>

<section id="conversionHero" class="conversion-shell">
  <div class="conversion-left">
    <span class="conversion-kicker">⚡ TB-BASS IR • TIMBRES PROFISSIONAIS</span>
    <h1>O timbre de baixos premium direto na sua pedaleira.</h1>
    <p class="conversion-copy">Capturas em WAV 24-bit de alta fidelidade para Tank-B, Cuvave e pedaleiras compatíveis. Toque com o som dos contrabaixos mais lendários do mundo sem trocar de instrumento.</p>

    <!-- LISTA DE DESTAQUES PREMIUM -->
    <div class="hero-feature-list">
      <div class="hero-feature-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff9a3c" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span>WAV 24-bit em 44.1kHz e 48kHz com definição de estúdio</span>
      </div>
      <div class="hero-feature-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff9a3c" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Compatível com Tank-B, Cuvave, Zoom, Mooer, Ampero e Plugins</span>
      </div>
      <div class="hero-feature-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff9a3c" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Download imediato no e-mail após confirmação via PIX ou Cartão</span>
      </div>
    </div>

    <!-- COMPARATIVO A/B AO VIVO (DESATIVADO CONFORME SOLICITADO) -->
    <div class="ab-player-box" style="display:none !important;" aria-hidden="true">
      <div class="ab-player-header">
        <div class="ab-title">
          <span class="ab-dot"></span>
          COMPARATIVO A/B AO VIVO
        </div>
        <div class="ab-toggle-group">
          <button type="button" class="ab-btn active" id="btnModeIR" onclick="setHeroABMode('ir')">A: COM IR (PRO)</button>
          <button type="button" class="ab-btn" id="btnModeRaw" onclick="setHeroABMode('raw')">B: SEM IR (BYPASS)</button>
        </div>
      </div>
      <div class="ab-player-controls">
        <button type="button" class="play-circle" id="heroPlayBtn" onclick="toggleHeroPlay()" aria-label="Ouvir timbre de teste">
          <svg id="heroPlayIcon" viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20 6 4"/></svg>
          <svg id="heroPauseIcon" viewBox="0 0 24 24" style="display:none;"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        </button>
        <div class="waveform-visualizer" id="heroWaveform">
          <div class="wave-bar" style="height:12px;"></div>
          <div class="wave-bar" style="height:24px;"></div>
          <div class="wave-bar" style="height:16px;"></div>
          <div class="wave-bar" style="height:32px;"></div>
          <div class="wave-bar" style="height:28px;"></div>
          <div class="wave-bar" style="height:40px;"></div>
          <div class="wave-bar" style="height:20px;"></div>
          <div class="wave-bar" style="height:36px;"></div>
          <div class="wave-bar" style="height:14px;"></div>
          <div class="wave-bar" style="height:28px;"></div>
          <div class="wave-bar" style="height:38px;"></div>
          <div class="wave-bar" style="height:22px;"></div>
          <div class="wave-bar" style="height:34px;"></div>
          <div class="wave-bar" style="height:18px;"></div>
          <div class="wave-bar" style="height:26px;"></div>
          <div class="wave-bar" style="height:14px;"></div>
        </div>
      </div>
      <div class="ab-now-playing">
        <div>Tocando: <strong id="heroTrackName">Fender Ultra II IR (Estúdio)</strong></div>
        <div id="heroTrackStatus" style="color:var(--accent);font-weight:700;">Toque no Play para ouvir</div>
      </div>
    </div>

    <div class="conversion-actions">
      <a class="conversion-primary" href="#produtos">Ver os timbres</a>
      <a class="conversion-secondary tb-whatsapp-direct" href="https://wa.me/message/3QND546Y75L3M1" target="_blank" rel="noopener" onclick="trackTBBassWhatsappClick('whatsapp_business')" style="display:none !important;" aria-hidden="true">Testar meu baixo grátis</a>
    </div>

    <div class="social-proof">
      <span class="stars">★★★★★</span>
      <span><strong>4.9/5 estrelas</strong> • Mais de 500 baixistas satisfeitos</span>
    </div>
  </div>

  <div class="conversion-right">
    <div class="stage-card" id="heroStageCard">
      <div class="stage-rank-badge" id="heroStageRank">🔥 #1 MAIS VENDIDO</div>
      <div class="gear-bass-wrap">
        <img src="/assets/instruments/isolated-v1/fender-ultra-2.png" alt="Fender Ultra II Jazz Bass" class="gear-bass" id="heroStageImg">
      </div>
      <div class="gear-pedal-badge">
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="pedal-led"></div>
          <span style="font-weight:800;letter-spacing:0.5px;color:#fff;" id="heroStageName">FENDER ULTRA II</span>
        </div>
        <span style="color:var(--accent);font-weight:800;font-size:12px;">WAV 24-BIT • 48kHz</span>
      </div>
      <div class="stage-indicators">
        <button type="button" class="stage-dot active" onclick="switchStage(0)" aria-label="Ver 1º mais vendido"></button>
        <button type="button" class="stage-dot" onclick="switchStage(1)" aria-label="Ver 2º mais vendido"></button>
        <button type="button" class="stage-dot" onclick="switchStage(2)" aria-label="Ver 3º mais vendido"></button>
      </div>
    </div>
  </div>
</section>

<div id="conversionTrust" class="conversion-trust">
  <span style="display:none !important;" aria-hidden="true">Teste grátis com seu próprio baixo</span>
  <span>WAV 24-Bit de Alta Resolução</span>
  <span>Entrega digital</span>
  <span>PIX e Cartão</span>
  <span>Suporte pós-venda</span>
</div>

<div class="devices-strip">
  <span>COMPATÍVEL COM TODOS OS PROCESSADORES E PEDALEIRAS COM SUPORTE A IR</span>
  <div class="device-tags">
    <span class="device-pill">M-Vave Tank-B</span>
    <span class="device-pill">Cuvave Baby Bass</span>
    <span class="device-pill">Zoom B1 Four / B3n</span>
    <span class="device-pill">Mooer GE Series</span>
    <span class="device-pill">Hotone Ampero</span>
    <span class="device-pill">HeadRush Prime</span>
    <span class="device-pill">Line 6 Helix / HX Stomp</span>
    <span class="device-pill">Boss GT Series</span>
    <span class="device-pill">Plugins VST/DAW</span>
  </div>
</div>

<section id="feedbacks-reais" class="tb-feedbacks" aria-labelledby="tbFeedbacksTitle">
  <span class="tb-feedbacks-kicker">Feedbacks reais</span>
  <h2 id="tbFeedbacksTitle">Quem testou, sentiu a diferença.</h2>
  <p class="tb-feedbacks-intro">Relatos reais da comunidade TB-BASS IR. Toque na pilha para abrir todos.</p>
  <button id="tbFeedbackStack" class="tb-feedback-stack" type="button" aria-label="Abrir galeria de feedbacks reais">
    <span class="tb-feedback-stack-card"><img src="/assets/feedbacks/feedback-1.png" alt="Feedback real 1 da comunidade TB-BASS IR" loading="lazy"></span>
    <span class="tb-feedback-stack-card"><img src="/assets/feedbacks/feedback-2.png" alt="Feedback real 2 da comunidade TB-BASS IR" loading="lazy"></span>
    <span class="tb-feedback-stack-card"><img src="/assets/feedbacks/feedback-3.png" alt="Feedback real 3 da comunidade TB-BASS IR" loading="lazy"></span>
  </button>
  <div class="tb-feedback-stack-label" aria-hidden="true">↗ Toque para ver os feedbacks</div>
  <dialog class="tb-feedback-dialog" id="tbFeedbackDialog" aria-label="Galeria de feedbacks reais">
    <div class="tb-feedback-view" id="tbFeedbackView">
      <button type="button" class="tb-feedback-close" aria-label="Fechar galeria">×</button>
      <button type="button" class="tb-feedback-nav" id="tbFeedbackPrev" aria-label="Feedback anterior">‹</button>
      <img id="tbFeedbackImage" alt="Feedback ampliado">
      <button type="button" class="tb-feedback-nav" id="tbFeedbackNext" aria-label="Próximo feedback">›</button>
      <span class="tb-feedback-counter" id="tbFeedbackCounter" aria-live="polite"></span>
    </div>
  </dialog>
  <script>
  (()=>{
    const sources=['/assets/feedbacks/feedback-1.png','/assets/feedbacks/feedback-2.png','/assets/feedbacks/feedback-3.png'];
    const stack=document.getElementById('tbFeedbackStack');
    const dialog=document.getElementById('tbFeedbackDialog');
    const image=document.getElementById('tbFeedbackImage');
    const counter=document.getElementById('tbFeedbackCounter');
    const prev=document.getElementById('tbFeedbackPrev');
    const next=document.getElementById('tbFeedbackNext');
    const view=document.getElementById('tbFeedbackView');
    if(!stack||!dialog||!image||!counter||!prev||!next||!view)return;
    let index=0,touchX=null;
    const render=()=>{image.src=sources[index];counter.textContent=\`\${index+1} / \${sources.length}\`;};
    const move=step=>{index=(index+step+sources.length)%sources.length;render();};
    const open=()=>{index=0;render();if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','');};
    stack.addEventListener('click',open);
    prev.addEventListener('click',()=>move(-1));
    next.addEventListener('click',()=>move(1));
    dialog.querySelector('.tb-feedback-close').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
    dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')move(-1);if(e.key==='ArrowRight')move(1);});
    view.addEventListener('touchstart',e=>{touchX=e.changedTouches[0]?.clientX??null;},{passive:true});
    view.addEventListener('touchend',e=>{if(touchX===null)return;const end=e.changedTouches[0]?.clientX??touchX;const delta=end-touchX;touchX=null;if(Math.abs(delta)>45)move(delta<0?1:-1);},{passive:true});
  })();
  </script>
</section>

<section id="video-demo" class="tb-sales-video" aria-labelledby="tbSalesVideoTitle">
  <div class="tb-sales-video-copy">
    <span class="tb-sales-video-kicker">CONHEÇA A EXPERIÊNCIA</span>
    <h2 id="tbSalesVideoTitle">Escolha pelo caráter. Encontre o timbre certo para o seu baixo.</h2>
  </div>
  <div class="tb-sales-video-stage">
    <div class="tb-sales-video-frame" id="tbSalesVideoFrame">
      <video
        id="tbSalesVideo"
        class="tb-sales-video-player"
        controls
        playsinline
        preload="metadata"
        poster="/videos/premium/tb-bass-ir-store-poster.jpg"
        src="/videos/premium/tb-bass-ir-store-apresentacao.mp4"
        aria-label="Apresentação TB-BASS IR">
      </video>
      <button type="button" class="tb-sales-video-play" id="tbSalesVideoPlay" aria-label="Reproduzir apresentação"></button>
    </div>
  </div>
</section>
<script>
(()=>{
  const video=document.getElementById('tbSalesVideo');
  const frame=document.getElementById('tbSalesVideoFrame');
  const play=document.getElementById('tbSalesVideoPlay');
  if(!video||!frame||!play)return;
  play.addEventListener('click',()=>video.play());
  video.addEventListener('play',()=>frame.classList.add('is-playing'));
  video.addEventListener('pause',()=>frame.classList.remove('is-playing'));
  video.addEventListener('ended',()=>frame.classList.remove('is-playing'));
})();
</script>

<section id="toneNavigator" aria-labelledby="toneNavigatorTitle">
  <span class="tone-navigator-kicker">ENCONTRE MAIS RÁPIDO</span>
  <h2 id="toneNavigatorTitle">Qual caráter de timbre você procura?</h2>
  <div class="tone-filter-row">
    <button type="button" data-tone-filter="all" aria-pressed="true">Todos</button>
    <button type="button" data-tone-filter="vintage" aria-pressed="false">Vintage</button>
    <button type="button" data-tone-filter="modern" aria-pressed="false">Modernos</button>
    <button type="button" data-tone-filter="hifi" aria-pressed="false">Hi-Fi</button>
    <button type="button" data-tone-filter="punch" aria-pressed="false">Punch/Slap</button>
  </div>
</section>

<div id="produtos" class="grid"></div>

<section id="combos-vitrine" class="tb-combos-section">
  <div class="combos-header">
    <span class="combos-tag">⚡ COMBOS EXCLUSIVOS • 2 TIMBRES</span>
    <h2>Combine 2 Timbres e Economize</h2>
    <p>Simulações combinadas com harmonia de timbres para você cobrir qualquer estilo musical com desconto especial de pacote.</p>
  </div>
  <div id="combos-grid" class="combos-grid"></div>
</section>

<section id="faq">
  <h2>Dúvidas Frequentes</h2>

  <details open>
    <summary><b>Teve qualquer dificuldade com o timbre após a compra?</b></summary>
    <p>
      Fique tranquilo. Nosso suporte pós-venda é real, humano e dedicado.
      Se o timbre não ficar como você esperava, nós te ajudamos a ajustar,
      configurar e extrair o máximo do seu instrumento — até ele soar do jeito certo.
      Recomendamos o uso de <b>cordas novas ou semi-novas</b>.
    </p>
  </details>

  <details>
    <summary>O que é um IR?</summary>
    <p>
      É uma captura acústica de alta resolução (Impulse Response em WAV 24-bit)
      que recria na sua pedaleira o timbre exato de contrabaixos e gabinetes consagrados.
    </p>
  </details>

  <details>
    <summary>Funciona em quais pedaleiras?</summary>
    <p>
      Compatível com qualquer equipamento com suporte a carregamento de IR: Mooer, Tank-B, Mk300, Mk20, Cuvave Baby Bass, Headrush, Ampero, Zoom B1 Four / B3n, Line 6, Valeton, Boss e plugins no computador.
    </p>
  </details>

  <details>
    <summary>Como instalar o IR na Tank-B ou Cuvave?</summary>
    <p>
      É simples e rápido: conecte a pedaleira ao celular via Bluetooth pelo app M-EFCS ou ao PC via cabo USB pelo CubeSuite. No aplicativo, abra a aba de IRs e carregue o arquivo .WAV de 24-bit (disponibilizado em 44.1kHz e 48kHz). O som é transferido na hora para a memória da pedaleira. Veja também nosso <a href="/como-instalar-ir-na-tank-b/" style="color:#ff9a3c;text-decoration:underline;">tutorial completo passo a passo com vídeo</a>.
    </p>
  </details>

  <details>
    <summary>Formato dos arquivos?</summary>
    <p>WAV 24-bit 44.1kHz e 48kHz, além de compatibilidade com CubeSuite e M-EFCS.</p>
  </details>

  <details>
    <summary>Como é feita a entrega?</summary>
    <p>Imediata e automática no seu e-mail logo após a confirmação do pagamento via PIX ou Cartão.</p>
  </details>
</section>

<!-- Bloco de Selos e Confiabilidade -->
<div class="tb-trust-section">
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-bottom:30px;">
    <!-- Selo SSL -->
    <div style="background:linear-gradient(145deg,rgba(255,255,255,.04),rgba(255,255,255,.01));border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:18px 16px;display:flex;align-items:center;gap:14px;text-align:left;">
      <div style="width:42px;height:42px;min-width:42px;border-radius:10px;background:rgba(46,204,113,.12);border:1px solid rgba(46,204,113,.3);display:flex;align-items:center;justify-content:center;color:#2ecc71;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      </div>
      <div>
        <div style="font-weight:700;font-size:14px;color:#fff;letter-spacing:-.01em;">Site 100% Seguro</div>
        <div style="font-size:12px;color:#a3a3a3;margin-top:2px;">Criptografia SSL 256-Bit Ativa</div>
      </div>
    </div>

    <!-- Selo Pagamento Cakto -->
    <div style="background:linear-gradient(145deg,rgba(255,255,255,.04),rgba(255,255,255,.01));border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:18px 16px;display:flex;align-items:center;gap:14px;text-align:left;">
      <div style="width:42px;height:42px;min-width:42px;border-radius:10px;background:rgba(255,122,24,.12);border:1px solid rgba(255,122,24,.3);display:flex;align-items:center;justify-content:center;color:#ff7a18;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
      </div>
      <div>
        <div style="font-weight:700;font-size:14px;color:#fff;letter-spacing:-.01em;">Checkout Protegido</div>
        <div style="font-size:12px;color:#a3a3a3;margin-top:2px;">Processamento Seguro via Cakto</div>
      </div>
    </div>

    <!-- Selo Download Imediato -->
    <div style="background:linear-gradient(145deg,rgba(255,255,255,.04),rgba(255,255,255,.01));border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:18px 16px;display:flex;align-items:center;gap:14px;text-align:left;">
      <div style="width:42px;height:42px;min-width:42px;border-radius:10px;background:rgba(52,152,219,.12);border:1px solid rgba(52,152,219,.3);display:flex;align-items:center;justify-content:center;color:#3498db;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      </div>
      <div>
        <div style="font-weight:700;font-size:14px;color:#fff;letter-spacing:-.01em;">Download Imediato</div>
        <div style="font-size:12px;color:#a3a3a3;margin-top:2px;">Liberação Instantânea no E-mail</div>
      </div>
    </div>

    <!-- Selo Suporte Oficial -->
    <div style="background:linear-gradient(145deg,rgba(255,255,255,.04),rgba(255,255,255,.01));border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:18px 16px;display:flex;align-items:center;gap:14px;text-align:left;">
      <div style="width:42px;height:42px;min-width:42px;border-radius:10px;background:rgba(46,204,113,.12);border:1px solid rgba(46,204,113,.3);display:flex;align-items:center;justify-content:center;color:#2ecc71;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      </div>
      <div>
        <div style="font-weight:700;font-size:14px;color:#fff;letter-spacing:-.01em;">Suporte Humanizado</div>
        <div style="font-size:12px;color:#a3a3a3;margin-top:2px;">Atendimento Direto no WhatsApp</div>
      </div>
    </div>
  </div>
</div>

<footer>
  <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:20px; margin-bottom:20px; font-size:13px; font-weight:600;">
    <span style="color:#2ecc71; display:inline-flex; align-items:center; gap:6px;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      Certificado SSL Ativo
    </span>
    <span style="color:#2ecc71; display:inline-flex; align-items:center; gap:6px;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      Domínio Autenticado (.com.br)
    </span>
    <span style="color:#2ecc71; display:inline-flex; align-items:center; gap:6px;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      Pagamento Seguro Antifraude
    </span>
  </div>

  <div style="margin-bottom:14px; color:#bbb;">
    Atendimento e Suporte Oficial: <a href="https://wa.me/message/3QND546Y75L3M1" target="_blank" rel="noopener" style="color:var(--accent); text-decoration:underline;">WhatsApp Oficial</a>
  </div>

  <div style="margin-bottom:14px; display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
    <span>© TB-BASS IR — Todos os direitos reservados.</span>
    <span>•</span>
    <a href="/politica-de-devolucao/" style="color:#ffd0aa; text-decoration:underline;">Política de Devolução e Reembolso</a>
  </div>

  <div style="font-size:12px; color:#777; line-height:1.6; border-top:1px solid rgba(255,255,255,.08); padding-top:16px; margin-top:16px;">
    <b>Aviso Legal:</b> A <b>TB-BASS IR</b> comercializa exclusivamente <b>arquivos e simulações digitais nos formatos IR (.WAV 24-bit 44.1/48kHz), AM4Data (presets para Tank-B) e NAM (Neural Amp Modeler)</b>, destinados a pedaleiras, processadores ou softwares com suporte a carregamento.<br>
    <b>Não comercializamos instrumentos musicais físicos</b> nem modificamos as peças ou a estrutura do seu contrabaixo. Para máxima aproximação sonora dos timbres demonstrados nos vídeos, recomendamos expressamente o uso de <b>cordas novas ou semi-novas</b>.<br>
    Acesso e download entregues imediatamente após a confirmação do pagamento no e-mail cadastrado. A TB-BASS IR comercializa seus produtos exclusivamente pelos canais oficiais informados neste site. Arquivos obtidos de terceiros ou por revendas não autorizadas não possuem direito a suporte técnico ou atualizações.<br>
    É proibida a reprodução, distribuição, revenda, compartilhamento ou qualquer forma de exploração comercial deste conteúdo sem autorização expressa do titular dos direitos.
  </div>
</footer>

<!-- WhatsApp Business Oficial -->
<div id="whats-menu-wrap">
  <a id="whats-float" class="tb-whatsapp-direct" href="https://wa.me/message/3QND546Y75L3M1" target="_blank" rel="noopener"
     aria-label="Abrir atendimento no WhatsApp"
     onclick="trackTBBassWhatsappOpen();trackTBBassWhatsappClick('whatsapp_business');">
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
  </a>
</div>

<script>
function getTBBassWhatsAppPayload(extra = {}){
  const base = typeof window.getTBBassLastGA4ProductPayload === 'function'
    ? window.getTBBassLastGA4ProductPayload({ source: 'floating_whatsapp' })
    : { source: 'floating_whatsapp' };
  return { ...base, ...extra };
}

function trackTBBassWhatsappOpen(){
  if(typeof gtag === 'function'){
    gtag('event','whatsapp_open', getTBBassWhatsAppPayload());
  }
}

function trackTBBassWhatsappClick(contact){
  if(typeof gtag === 'function'){
    gtag('event','whatsapp_click', getTBBassWhatsAppPayload({ contact }));
  }
}
</script>

<!-- STORE SCRIPTS (ORDEM MANDATÓRIA) -->
<script src="js/browser-ir-demo.js?v=all20-browser-demo-20260907"></script>
<script src="js/store.js?v=instrument-refresh-20260819b"></script>

<!-- HERO LIVE A/B AUDIO CONTROLLER -->
<script>
let heroAudio = new Audio('/audio/fender-ultra-II.mp3');
let isHeroPlaying = false;
let isHeroIR = true;

const heroPlayBtn = document.getElementById('heroPlayBtn');
const heroPlayIcon = document.getElementById('heroPlayIcon');
const heroPauseIcon = document.getElementById('heroPauseIcon');
const heroWaveform = document.getElementById('heroWaveform');
const btnModeIR = document.getElementById('btnModeIR');
const btnModeRaw = document.getElementById('btnModeRaw');
const heroTrackName = document.getElementById('heroTrackName');
const heroTrackStatus = document.getElementById('heroTrackStatus');

function toggleHeroPlay() {
  if (isHeroPlaying) {
    heroAudio.pause();
    isHeroPlaying = false;
    heroPlayIcon.style.display = 'block';
    heroPauseIcon.style.display = 'none';
    heroWaveform.classList.remove('is-playing');
    heroTrackStatus.innerText = 'Pausado • Toque no Play';
  } else {
    heroAudio.volume = isHeroIR ? 1.0 : 0.42;
    heroAudio.play().then(() => {
      isHeroPlaying = true;
      heroPlayIcon.style.display = 'none';
      heroPauseIcon.style.display = 'block';
      heroWaveform.classList.add('is-playing');
      heroTrackStatus.innerText = isHeroIR ? 'Tocando • Som de Estúdio com IR' : 'Tocando • Som Direto Sem IR (Bypass)';
    }).catch(err => {
      console.log('Autoplay prevented:', err);
    });
  }
}

function setHeroABMode(mode) {
  if (mode === 'ir') {
    isHeroIR = true;
    btnModeIR.classList.add('active');
    btnModeRaw.classList.remove('active');
    heroAudio.volume = 1.0;
    heroTrackName.innerText = 'Fender Ultra II IR (Estúdio)';
    if (isHeroPlaying) {
      heroTrackStatus.innerText = 'Tocando • Som de Estúdio com IR';
    }
  } else {
    isHeroIR = false;
    btnModeRaw.classList.add('active');
    btnModeIR.classList.remove('active');
    heroAudio.volume = 0.42;
    heroTrackName.innerHTML = '<span style="color:#ff6b6b;">Som Cru Direto (Sem IR)</span>';
    if (isHeroPlaying) {
      heroTrackStatus.innerText = 'Tocando • Som Direto Sem IR (Bypass)';
    }
  }
}

heroAudio.addEventListener('ended', () => {
  isHeroPlaying = false;
  heroPlayIcon.style.display = 'block';
  heroPauseIcon.style.display = 'none';
  heroWaveform.classList.remove('is-playing');
  heroTrackStatus.innerText = 'Finalizado • Toque para repetir';
});
</script>

<!-- HERO TOP 3 STAGE AUTO-SWITCHER -->
<script>
const topBasses = [
  {
    name: "FENDER ULTRA II",
    rank: "🔥 #1 MAIS VENDIDO",
    img: "/assets/instruments/isolated-v1/fender-ultra-2.png",
    alt: "Fender Ultra II Jazz Bass"
  },
  {
    name: "SADOWSKY METROLINE",
    rank: "🔥 #2 MAIS VENDIDO",
    img: "/assets/instruments/isolated-v1/sadowsky-metroline.png",
    alt: "Sadowsky Metroline Bass"
  },
  {
    name: "YAMAHA TRB JP2",
    rank: "🔥 #3 MAIS VENDIDO",
    img: "/assets/instruments/isolated-v1/yamaha-trb-jp2.png",
    alt: "Yamaha TRB JP2 John Patitucci"
  }
];

let currentStageIndex = 0;
let stageInterval = null;

function switchStage(index) {
  currentStageIndex = index;
  const bass = topBasses[index];
  const imgEl = document.getElementById('heroStageImg');
  const nameEl = document.getElementById('heroStageName');
  const rankEl = document.getElementById('heroStageRank');
  const dots = document.querySelectorAll('.stage-dot');

  if (!imgEl || !nameEl || !rankEl) return;

  imgEl.style.opacity = '0';
  imgEl.style.transform = 'scale(0.96)';

  setTimeout(() => {
    imgEl.src = bass.img;
    imgEl.alt = bass.alt;
    nameEl.innerText = bass.name;
    rankEl.innerText = bass.rank;
    imgEl.style.opacity = '1';
    imgEl.style.transform = 'scale(1)';
  }, 180);

  dots.forEach((dot, idx) => {
    if (idx === index) dot.classList.add('active');
    else dot.classList.remove('active');
  });
}

function startStageAutoRotate() {
  if (stageInterval) clearInterval(stageInterval);
  stageInterval = setInterval(() => {
    const next = (currentStageIndex + 1) % topBasses.length;
    switchStage(next);
  }, 4000);
}

startStageAutoRotate();
const stageCard = document.getElementById('heroStageCard');
if (stageCard) {
  stageCard.addEventListener('mouseenter', () => clearInterval(stageInterval));
  stageCard.addEventListener('mouseleave', () => startStageAutoRotate());
}
</script>

<!-- TRACKING PREVIEW & BUY (SEM ALTERAR STORE.JS) -->
<script>
function getGA4CardItem(target){
  const card = target.closest('.card');
  const itemName = card?.dataset?.itemName || card?.querySelector('h3')?.innerText || 'unknown';
  const itemId = card?.dataset?.itemId || itemName.toLowerCase().replace(/[^a-z0-9]+/g,'-');
  const priceRaw = card?.dataset?.price;
  const price = priceRaw ? Number(priceRaw) : null;

  const item = {
    item_id: itemId,
    item_name: itemName,
    currency: 'BRL'
  };

  if(Number.isFinite(price)){
    item.price = price;
  }

  const payload = {
    item_id: item.item_id,
    item_name: item.item_name,
    currency: 'BRL',
    items: [item]
  };

  if(Number.isFinite(price)){
    payload.price = price;
    payload.value = price;
  }

  window.tbBassLastGA4ProductPayload = payload;
  return payload;
}

document.addEventListener('click', function(e){
  if(e.target.closest('.preview-btn')){
    gtag('event','preview_play', getGA4CardItem(e.target));
  }

  if(e.target.closest('.buy-btn')){
    gtag('event','buy_click', getGA4CardItem(e.target));
  }
});
</script>

<!-- Google Customer Reviews (Avaliações de Clientes do Google) Badge Oficial -->
<script id='merchantWidgetScript' src="https://www.gstatic.com/shopping/merchant/merchantwidget.js" defer></script>
<script>
  (function() {
    var s = document.getElementById('merchantWidgetScript');
    if (!s) return;
    function initMerchantWidget() {
      if (window.merchantwidget && typeof window.merchantwidget.start === 'function') {
        window.merchantwidget.start({
          merchant_id: 5884867589,
          position: "BOTTOM_LEFT",
          region: "BR"
        });
      }
    }
    s.addEventListener('load', initMerchantWidget);
  })();
</script>

</body>
</html>
`;

fs.writeFileSync(publicIndex, html, "utf-8");
fs.writeFileSync(rootIndex, html, "utf-8");
console.log("Successfully built public/index.html and index.html!");
