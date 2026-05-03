/* ================== PREÇOS DINÂMICOS ==================
   ✅ MUDA AQUI e o site inteiro atualiza os valores
   (fallback: se não tiver aqui, usa p.preco do produto)
*/
const precosCakto = {
  "TrackPilot by TB-BASS IR": 49,

  "Bass Mods IR": 49,
  "Fender Ultra 2 IR": 45,
  "Fender 1978 IR": 78,
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
    preco:59,
    link:"https://pay.cakto.com.br/p8ufknn_866145",
    desc:"Importação inteligente para REAPER. Organize, adicione e importe seus áudios nas tracks certas em segundos.",
    video:"/videos/trackpilot.mp4"
  },

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
    preco:88,
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
    video:"/videos/gl-l2500.mp4",
    showBuy:false
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
