import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const publicDir = path.join(root, 'public');
const storePath = path.join(publicDir, 'js', 'store.js');
const source = fs.readFileSync(storePath, 'utf8');
const prefixEnd = source.indexOf('const grid =');
if (prefixEnd < 0) throw new Error('Não foi possível localizar o catálogo em store.js');

const sandbox = {};
vm.runInNewContext(
  `${source.slice(0, prefixEnd)}\nthis.__produtos = produtos; this.__precos = precosCakto;`,
  sandbox
);
const produtos = Array.from(sandbox.__produtos || []).filter(p => p && p.irId);
const precos = sandbox.__precos || {};

const images = {
  'bass-mods':'/assets/instruments/isolated-v1/bass-mods.png',
  'fender-1978':'/assets/instruments/isolated-v1/fender-1978.png',
  'fender-ultra-2':'/assets/instruments/isolated-v1/fender-ultra-2.png',
  'music-man':'/assets/instruments/isolated-v1/music-man.png',
  'gl-l2500':'/assets/instruments/isolated-v1/gl-l2500.png',
  'sadowsky-m5':'/assets/instruments/isolated-v1/sadowsky-m5.png',
  'sadowsky-metroline':'/assets/instruments/isolated-v1/sadowsky-metroline.png',
  'lakland-ss44-75':'/assets/instruments/isolated-v1/lakland-ss44-75.png',
  'sadowsky-nyc':'/assets/instruments/isolated-v1/sadowsky-nyc.png',
  'fodera':'/assets/instruments/isolated-v1/fodera.png',
  'swing':'/assets/instruments/isolated-v1/swing-jazz-deluxe.png',
  'trb-jp2':'/assets/instruments/isolated-v1/yamaha-trb-jp2.png',
  'mayones':'/assets/instruments/isolated-v1/mayones-jabba-5.png',
  'mtd':'/assets/instruments/isolated-v1/mtd-535-24.png',
  'warwick-corvette':'/assets/instruments/isolated-v1/warwick-corvette.png',
  'ken-smith':'/assets/instruments/isolated-v1/ken-smith.png',
  'kubicki-ex-factor':'/assets/instruments/isolated-v1/kubicki-ex-factor.png',
  'fender-american-elite-2018':'/assets/instruments/isolated-v1/fender-american-elite-2018.png',
  'fodera-elite-dlx':'/assets/instruments/isolated-v1/fodera-elite-dlx.png',
  'mtd-kingston-zx':'/assets/instruments/isolated-v1/mtd-kingston-zx.png'
};

const canonicalBase = 'https://tbbassir.com.br';
const instagramProfile = 'https://www.instagram.com/silasmarinhobx/';
const silasEntityId = `${canonicalBase}/#silas-marinho`;
const organizationEntityId = `${canonicalBase}/#organization`;
const irVideos = [
  {
    slug:'sadowsky-ir-silas-marinho', code:'DRSvmm3j6Lj', uploadDate:'2025-11-20',
    title:'Sadowsky IR para baixo com Silas Marinho',
    description:'Silas Marinho demonstra uma simulação de Sadowsky em vídeo e apresenta o IR para baixistas que querem comparar esse perfil de timbre.',
    summary:'Uma demonstração do universo Sadowsky com Silas Marinho, ligada às opções Sadowsky do catálogo TB-BASS IR.',
    relatedSlugs:['sadowsky-m5','sadowsky-metroline','sadowsky-nyc']
  },
  {
    slug:'ir-para-baixo-silas-marinho', code:'DYfoRa5OejJ', uploadDate:'2026-05-18',
    title:'IR para baixo em vídeo com Silas Marinho',
    description:'Silas Marinho apresenta IR para baixo em Reel próprio e convida baixistas a conhecerem as opções disponíveis.',
    summary:'Reel do próprio Silas Marinho sobre IR para baixo, conectado ao catálogo e ao guia técnico da TB-BASS IR.',
    relatedSlugs:[]
  },
  {
    slug:'15-opcoes-ir-silas-marinho', code:'DXPyY3JDssa', uploadDate:'2026-04-17',
    title:'15 opções de IR com Silas Marinho',
    description:'Silas Marinho apresenta em vídeo a disponibilidade de mais de 15 opções de IR para baixistas.',
    summary:'Conteúdo do perfil @silasmarinhobx mostrando a variedade de IRs e direcionando para comparação antes da escolha.',
    relatedSlugs:[]
  },
  {
    slug:'garanta-seu-ir-silas-marinho', code:'DWKTNcejpNj', uploadDate:'2026-03-21',
    title:'IR para baixo com Silas Marinho',
    description:'Reel de Silas Marinho apresentando IR para baixo e destacando a variedade de opções disponíveis para baixistas.',
    summary:'Vídeo comercial do próprio Silas Marinho sobre IR para baixo, conectado ao ecossistema TB-BASS IR.',
    relatedSlugs:[]
  }
].map(v => ({
  ...v,
  canonical:`${canonicalBase}/videos-ir-para-baixo/${v.slug}/`,
  reelUrl:`https://www.instagram.com/reel/${v.code}/`,
  embedUrl:`https://www.instagram.com/reel/${v.code}/embed/`,
  thumbnailUrl:`https://www.instagram.com/p/${v.code}/media/?size=l`
}));
const html = value => String(value ?? '')
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const xml = value => html(value);
const money = value => Number(value).toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
const currentPrice = p => Number(precos[p.nome] ?? p.preco);
const displayName = p => String(p.nome || '').replace(/\s+IR$/i, '');
const existsPublic = urlPath => Boolean(urlPath) && fs.existsSync(path.join(publicDir, String(urlPath).replace(/^\/+/, '')));
const descriptionFor = p => `${p.desc} Impulse Response (IR) para contrabaixo em WAV 24-bit, pronto para pedaleiras e IR loaders compatíveis.`;
const compactMeta = (value, max = 158) => {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1).replace(/\s+\S*$/, '').replace(/[.,;:!?-]+$/, '');
  return `${cut}.`;
};
const metaDescriptionFor = p => compactMeta(`${displayName(p)} IR para baixo em WAV 24-bit. ${p.desc} Compatível com pedaleiras e IR loaders que aceitam Impulse Response.`);
const productTitleFor = p => {
  const full = `${displayName(p)} IR para Baixo | TB-BASS IR`;
  return full.length <= 60 ? full : `${displayName(p)} IR | TB-BASS IR`;
};

const baseCss = `
:root{color-scheme:dark;--bg:#050505;--panel:#101010;--text:#f7f7f7;--muted:#b4b4b4;--accent:#ff8a24;--line:#2b2b2b}
*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at 50% 0,#211208 0,transparent 28%),var(--bg);color:var(--text);font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
a{color:inherit}.wrap{width:min(1120px,calc(100% - 32px));margin:auto}.top{padding:24px 0}.brand{font-weight:900;text-decoration:none;letter-spacing:.03em}.crumbs{font-size:14px;color:var(--muted);margin:12px 0 28px}.crumbs a{color:#ffd0aa}
.hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,.78fr);gap:44px;align-items:center;padding:44px 0 30px}.eyebrow{color:var(--accent);font-size:12px;font-weight:900;letter-spacing:.15em;text-transform:uppercase}
h1{font-size:clamp(2.45rem,6vw,5.3rem);line-height:.98;margin:12px 0 18px;letter-spacing:-.045em}h2{font-size:clamp(1.7rem,3vw,2.5rem);margin:0 0 14px}p{color:var(--muted);line-height:1.7}.lead{font-size:1.08rem;max-width:720px}.price{font-size:1.65rem;font-weight:900;margin:20px 0 16px}
.actions{display:flex;gap:12px;flex-wrap:wrap}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:0 20px;border-radius:12px;text-decoration:none;font-weight:900}.primary{background:linear-gradient(135deg,#ff9a3c,#ff6810);color:#090909}.secondary{border:1px solid #5a3a24;background:#15100d}
.visual{border:1px solid var(--line);border-radius:24px;background:linear-gradient(145deg,#17110d,#090909);padding:26px;min-height:330px;display:grid;place-items:center}.visual img{max-width:100%;max-height:300px;object-fit:contain;filter:drop-shadow(0 20px 20px #000)}
.section{margin:34px 0;padding:28px;border:1px solid var(--line);border-radius:20px;background:linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.018))}.facts{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.fact{padding:16px;border-radius:14px;background:#0b0b0b;border:1px solid #222}.fact b{display:block;margin-bottom:7px;color:#fff}
.media{width:100%;margin-top:14px;border-radius:12px;background:#000}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px}.card{padding:18px;border:1px solid var(--line);border-radius:16px;background:#0d0d0d;text-decoration:none}.card:hover{border-color:#6e4227}.card b{display:block;margin-bottom:7px}.card span{font-size:13px;color:var(--muted)}
footer{padding:46px 0 58px;color:#858585;font-size:13px;line-height:1.6}.legal{font-size:12px;color:#858585;margin-top:18px}
@media(max-width:760px){.hero{grid-template-columns:1fr;gap:24px;padding-top:20px}.visual{min-height:240px}.facts{grid-template-columns:1fr}.actions{flex-direction:column}.btn{width:100%}}
`;

const videoCss = `.video-frame{width:min(100%,520px);margin:22px auto;border:1px solid var(--line);border-radius:20px;overflow:hidden;background:#000;aspect-ratio:9/16}.video-frame iframe{display:block;width:100%;height:100%;border:0}`;

const videoForProduct = slug => irVideos.find(v => v.relatedSlugs.includes(slug));

function productPage(p) {
  const slug = p.irId;
  const name = displayName(p);
  const canonical = `${canonicalBase}/ir/${slug}/`;
  const mappedImage = images[slug];
  const imagePath = mappedImage && existsPublic(mappedImage) ? mappedImage : '/logo.png';
  const imageUrl = `${canonicalBase}${imagePath}`;
  const desc = descriptionFor(p);
  const metaDesc = metaDescriptionFor(p);
  const seoTitle = productTitleFor(p);
  const price = currentPrice(p);
  const schema = {
    '@context':'https://schema.org',
    '@type':'Product',
    name:`${name} IR`,
    description:desc,
    image:[imageUrl],
    sku:`tb-bass-ir-${slug}`,
    brand:{'@type':'Brand',name:'TB-BASS IR'},
    url:canonical,
    category:'Impulse Response para contrabaixo',
    offers:{
      '@type':'Offer',
      url:canonical,
      priceCurrency:'BRL',
      price:price.toFixed(2),
      availability:'https://schema.org/InStock',
      itemCondition:'https://schema.org/NewCondition',
      seller:{'@type':'Organization',name:'TB-BASS IR',url:canonicalBase,logo:`${canonicalBase}/logo.png`}
    }
  };
  const breadcrumb = {
    '@context':'https://schema.org','@type':'BreadcrumbList',
    itemListElement:[
      {'@type':'ListItem',position:1,name:'TB-BASS IR',item:`${canonicalBase}/`},
      {'@type':'ListItem',position:2,name:'IR para baixo',item:`${canonicalBase}/ir-para-baixo/`},
      {'@type':'ListItem',position:3,name:`${name} IR`,item:canonical}
    ]
  };
  const audio = existsPublic(p.audio)
    ? `<h2>Ouça o timbre</h2><audio class="media" controls preload="metadata" src="${html(p.audio)}">Seu navegador não suporta áudio HTML5.</audio>`
    : '';
  const relatedVideo = videoForProduct(slug);
  return `<!doctype html>
<html lang="pt-BR"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${html(seoTitle)}</title>
<meta name="description" content="${html(metaDesc)}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="product"><meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="TB-BASS IR"><meta property="og:title" content="${html(seoTitle)}">
<meta property="og:description" content="${html(metaDesc)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${imageUrl}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/logo.png">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
<style>${baseCss}</style>
</head><body>
<div class="wrap">
<header class="top"><a class="brand" href="/">TB-BASS IR</a></header>
<nav class="crumbs" aria-label="Navegação"><a href="/">Início</a> / <a href="/ir-para-baixo/">IR para baixo</a> / ${html(name)}</nav>
<main>
<section class="hero">
<div><span class="eyebrow">IR PARA CONTRABAIXO • DOWNLOAD DIGITAL</span>
<h1>${html(name)} IR</h1>
<p class="lead">${html(p.desc)}</p>
<p>Impulse Response (IR) para contrabaixo criado para levar o caráter deste timbre à sua pedaleira ou IR loader compatível.</p>
<div class="price">${money(price)}</div>
<div class="actions"><a class="btn primary" href="${html(p.link)}" target="_blank" rel="noopener nofollow">Comprar agora</a><a class="btn secondary" href="/">Ver todos os timbres</a></div>
</div>
<div class="visual"><img src="${imagePath}" alt="${html(name)} usado como referência visual do ${html(name)} IR" width="760" height="520"></div>
</section>
<section class="section"><h2>IR para baixo pronto para pedaleiras compatíveis</h2>
<p>${html(desc)}</p>
<div class="facts"><div class="fact"><b>Formato</b><span>WAV 24-bit, 44,1 kHz e 48 kHz.</span></div><div class="fact"><b>Uso</b><span>Palco, estúdio, gravação e estudo.</span></div><div class="fact"><b>Entrega</b><span>Produto digital com entrega após a compra.</span></div></div>
</section>
<section class="section"><h2>Compatibilidade</h2><p>Compatível com pedaleiras e equipamentos que aceitam carregamento de Impulse Response em WAV, incluindo linhas da Mooer, Tank-B, MK300, MK20, Cuvave, Headrush, Ampero, Zoom, Line 6, Valeton e Hotone. Confirme no manual do seu equipamento se ele possui IR Loader.</p></section>
<section class="section"><h2>Para quem procura ${html(name)} IR para baixo</h2><p>Esta opção é voltada a baixistas que querem comparar o perfil descrito no catálogo — ${html(p.desc)} — com o próprio instrumento e com a cadeia que já usam. O resultado de um IR depende também do baixo, captadores, cordas, técnica, ganho, equalização e sistema de monitoração, por isso vale ouvir e comparar antes da compra.</p><p>O ${html(name)} IR é entregue como arquivo WAV 24-bit em 44,1 kHz e 48 kHz. Use a versão exigida pelo seu equipamento e mantenha o arquivo original guardado para poder testar ajustes diferentes sem perder a referência.</p></section>
<section class="section"><h2>Como testar ${html(name)} IR no seu setup</h2><p>Comece com o EQ da pedaleira o mais neutro possível e ajuste o ganho para não clipar a entrada ou a saída. Carregue o IR, compare com o bypass no mesmo volume e ouça principalmente definição do grave, presença dos médios, ataque e brilho. Essa comparação em volume semelhante evita escolher apenas porque uma opção ficou mais alta.</p><p>Para palco ou gravação, teste também no sistema que você realmente usa: fones, interface, monitor ou PA. Se o grave ficar excessivo ou o ataque sumir, faça pequenos ajustes de EQ depois de escolher o IR. A compatibilidade final sempre deve ser confirmada no manual do seu IR Loader.</p></section>
${audio ? `<section class="section">${audio}</section>` : ''}${relatedVideo ? `
<section class="section"><h2>Veja este IR em vídeo com Silas Marinho</h2><p>${html(relatedVideo.summary)}</p><div class="actions"><a class="btn secondary" href="/videos-ir-para-baixo/${relatedVideo.slug}/">Assistir à demonstração</a></div></section>` : ''}
<section class="section"><h2>Como escolher seu IR de contrabaixo</h2><p>Compare o caráter de grave, médios, ataque e brilho com o som que você procura. Na TB-BASS IR você também pode testar opções usando o áudio do seu próprio baixo antes de decidir.</p><div class="actions"><a class="btn secondary" href="/ir-para-baixo/">Entender como funciona o IR para baixo</a><a class="btn primary" href="/#produtos">Comparar todos os IRs</a><a class="btn secondary" href="${instagramProfile}" target="_blank" rel="noopener">Ver @silasmarinhobx no Instagram</a></div></section>
<p class="legal">Os nomes e marcas de instrumentos citados identificam referências de timbre. TB-BASS IR é uma operação independente e não declara afiliação com fabricantes de instrumentos, salvo indicação expressa.</p>
</main><footer>© TB-BASS IR — Todos os direitos reservados.</footer>
</div></body></html>`;
}


function videoPage(v) {
  const schema = {
    '@context':'https://schema.org','@type':'VideoObject','@id':`${v.canonical}#video`,
    name:v.title,description:v.description,thumbnailUrl:[v.thumbnailUrl],uploadDate:v.uploadDate,
    embedUrl:v.embedUrl,url:v.reelUrl,
    creator:{'@type':'Person','@id':silasEntityId,name:'Silas Marinho',sameAs:[instagramProfile]},
    publisher:{'@type':'Organization','@id':organizationEntityId,name:'TB-BASS IR',url:canonicalBase,logo:{'@type':'ImageObject',url:`${canonicalBase}/logo.png`}}
  };
  const breadcrumb = {
    '@context':'https://schema.org','@type':'BreadcrumbList',
    itemListElement:[
      {'@type':'ListItem',position:1,name:'TB-BASS IR',item:`${canonicalBase}/`},
      {'@type':'ListItem',position:2,name:'IR para baixo',item:`${canonicalBase}/ir-para-baixo/`},
      {'@type':'ListItem',position:3,name:v.title,item:v.canonical}
    ]
  };
  const relatedProducts = v.relatedSlugs
    .map(slug => produtos.find(p => p.irId === slug)).filter(Boolean)
    .map(p => `<a class="card" href="/ir/${p.irId}/"><b>${html(displayName(p))} IR</b><span>${html(p.desc)}</span></a>`).join('\n');
  const relatedSection = relatedProducts
    ? `<section class="section"><h2>IRs relacionados ao vídeo</h2><p>Compare as opções Sadowsky do catálogo e escolha o perfil que mais combina com o seu baixo e seu setup.</p><div class="grid">${relatedProducts}</div></section>`
    : '';
  return `<!doctype html>
<html lang="pt-BR"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${html(v.title)} | TB-BASS IR</title>
<meta name="description" content="${html(compactMeta(v.description, 158))}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
<link rel="canonical" href="${v.canonical}">
<meta property="og:type" content="video.other"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="TB-BASS IR">
<meta property="og:title" content="${html(v.title)}"><meta property="og:description" content="${html(v.description)}"><meta property="og:url" content="${v.canonical}">
<meta property="og:image" content="${v.thumbnailUrl}"><meta property="og:video" content="${v.embedUrl}"><meta property="og:video:type" content="text/html">
<meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/logo.png">
<script type="application/ld+json">${JSON.stringify(schema)}</script><script type="application/ld+json">${JSON.stringify(breadcrumb)}</script><style>${baseCss}${videoCss}</style>
</head><body><div class="wrap"><header class="top"><a class="brand" href="/">TB-BASS IR</a></header>
<nav class="crumbs" aria-label="Navegação"><a href="/">Início</a> / <a href="/ir-para-baixo/">IR para baixo</a> / Vídeo</nav>
<main>
<section><span class="eyebrow">VÍDEO • SILAS MARINHO • IR PARA BAIXO</span><h1>${html(v.title)}</h1><p class="lead">${html(v.description)}</p></section>
<div class="video-frame"><iframe src="${v.embedUrl}" title="${html(v.title)}" loading="eager" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>
<section class="section"><h2>Sobre esta demonstração</h2><p>${html(v.summary)}</p><p>Este vídeo foi publicado por Silas Marinho no perfil <a href="${instagramProfile}" target="_blank" rel="noopener">@silasmarinhobx</a> em ${html(v.uploadDate)}. A página existe para conectar a demonstração ao guia de IR para baixo e às opções disponíveis na TB-BASS IR.</p><div class="actions"><a class="btn primary" href="${v.reelUrl}" target="_blank" rel="noopener">Ver Reel original</a><a class="btn secondary" href="/ir-para-baixo/">Comparar IRs para baixo</a><a class="btn secondary" href="/#produtos">Ir para a loja</a></div></section>
${relatedSection}
<section class="section"><h2>Como comparar o timbre</h2><p>Use a demonstração como referência e depois compare no seu próprio baixo. O resultado de um IR varia com captadores, cordas, técnica, ganho, equalização, pedaleira e sistema de monitoração. Para uma escolha mais confiável, mantenha volumes semelhantes ao alternar entre opções e confirme a compatibilidade do arquivo WAV com o seu IR Loader.</p></section>
<p class="legal">O Reel é incorporado diretamente do Instagram e permanece hospedado na plataforma de origem. Os nomes de instrumentos citados identificam referências de timbre; TB-BASS IR não declara afiliação com fabricantes salvo indicação expressa.</p>
</main><footer>© TB-BASS IR — Todos os direitos reservados.</footer></div></body></html>`;
}

const irDir = path.join(publicDir, 'ir');
fs.mkdirSync(irDir, {recursive:true});
for (const p of produtos) {
  const dir = path.join(irDir, p.irId);
  fs.mkdirSync(dir, {recursive:true});
  fs.writeFileSync(path.join(dir, 'index.html'), productPage(p));
}

const videoRoot = path.join(publicDir, 'videos-ir-para-baixo');
fs.mkdirSync(videoRoot, {recursive:true});
for (const v of irVideos) {
  const dir = path.join(videoRoot, v.slug);
  fs.mkdirSync(dir, {recursive:true});
  fs.writeFileSync(path.join(dir, 'index.html'), videoPage(v));
}

const hubCanonical = `${canonicalBase}/ir-para-baixo/`;
const hubTitle = 'IR para Baixo (Impulse Response) | TB-BASS IR';
const itemList = {
  '@context':'https://schema.org','@type':'ItemList',
  itemListElement:produtos.map((p,index)=>({
    '@type':'ListItem',position:index+1,name:`${displayName(p)} IR`,
    url:`${canonicalBase}/ir/${p.irId}/`
  }))
};
const faq = {
  '@context':'https://schema.org','@type':'FAQPage',
  mainEntity:[
    {'@type':'Question',name:'O que é IR para baixo?',acceptedAnswer:{'@type':'Answer',text:'É um Impulse Response usado em pedaleiras e IR loaders compatíveis para reproduzir características de timbre em um arquivo de resposta ao impulso.'}},
    {'@type':'Question',name:'Qual formato dos IRs da TB-BASS IR?',acceptedAnswer:{'@type':'Answer',text:'Os arquivos são fornecidos em WAV 24-bit, com opções em 44,1 kHz e 48 kHz.'}},
    {'@type':'Question',name:'Como saber se minha pedaleira aceita IR?',acceptedAnswer:{'@type':'Answer',text:'Confira no manual se o equipamento possui IR Loader ou suporte a carregamento de Impulse Response em WAV.'}}
  ]
};

const cards = produtos.map(p => `<a class="card" href="/ir/${p.irId}/"><b>${html(displayName(p))} IR</b><span>${html(p.desc)} • ${money(currentPrice(p))}</span></a>`).join('\n');
const videoCards = irVideos.map(v => `<a class="card" href="/videos-ir-para-baixo/${v.slug}/"><b>${html(v.title)}</b><span>${html(v.summary)}</span></a>`).join('\n');
const hub = `<!doctype html>
<html lang="pt-BR"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${hubTitle}</title>
<meta name="description" content="IR para baixo e contrabaixo em WAV 24-bit. Entenda como funciona o Impulse Response, confira compatibilidade e compare timbres TB-BASS IR.">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
<link rel="canonical" href="${hubCanonical}">
<meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="TB-BASS IR">
<meta property="og:title" content="${hubTitle}"><meta property="og:url" content="${hubCanonical}">
<meta property="og:image" content="${canonicalBase}/bg-hero.jpg"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/logo.png">
<script type="application/ld+json">${JSON.stringify(itemList)}</script><script type="application/ld+json">${JSON.stringify(faq)}</script><style>${baseCss}</style>
</head><body><div class="wrap"><header class="top"><a class="brand" href="/">TB-BASS IR</a></header><main>
<section class="hero"><div><span class="eyebrow">GUIA • IR PARA BAIXO</span><h1>IR para baixo: timbre de contrabaixo direto na pedaleira</h1><p class="lead">Impulse Response para contrabaixo é uma forma prática de levar características de timbre para equipamentos que aceitam IR Loader, sem depender de uma cadeia física completa em cada uso.</p><div class="actions"><a class="btn primary" href="#catalogo">Ver IRs disponíveis</a><a class="btn secondary" href="/#produtos">Ir para a loja</a></div></div><div class="visual"><img src="/bg-hero.jpg" alt="TB-BASS IR para baixo e contrabaixo" width="900" height="600"></div></section>
<section class="section"><h2>O que é um Impulse Response para contrabaixo?</h2><p>Um IR, abreviação de Impulse Response, é um arquivo que registra uma resposta sonora e pode ser carregado em equipamentos compatíveis. No universo do baixo, ele pode ser usado para aproximar características de um timbre de referência dentro de uma pedaleira, processador ou software que tenha suporte a IR.</p><p>Na prática, o objetivo não é transformar fisicamente um instrumento em outro. O IR trabalha como parte da cadeia de processamento e o resultado final também depende do seu baixo, captadores, cordas, técnica, ganho, equalização e restante do equipamento.</p></section>
<section class="section"><h2>Como usar IR no baixo</h2><p>Primeiro, confirme se sua pedaleira ou processador possui IR Loader. Depois, carregue o arquivo WAV na frequência de amostragem indicada pelo fabricante. Ajuste o nível de entrada e saída para evitar saturação indesejada e compare o resultado com o IR ligado e desligado. Pequenos ajustes de EQ podem ser necessários para casar o arquivo com seu instrumento e sistema.</p><p>Os IRs da TB-BASS IR são disponibilizados em WAV 24-bit, com versões em 44,1 kHz e 48 kHz. Entre os equipamentos que podem oferecer suporte a IR, dependendo do modelo, estão Mooer, Tank-B, MK300, MK20, Cuvave, Headrush, Ampero, Zoom, Line 6, Valeton e Hotone.</p></section>
<section class="section"><h2>Como escolher o IR certo</h2><p>Escolha pelo caráter que você quer acrescentar à cadeia: grave mais redondo, médios mais presentes, ataque rápido, brilho controlado, resposta hi-fi ou uma assinatura mais vintage. O catálogo abaixo separa cada IR em uma página própria, com descrição e acesso ao checkout. Na loja principal, você também encontra o recurso de teste com o áudio do seu próprio baixo para comparar opções.</p><div class="actions"><a class="btn secondary" href="${instagramProfile}" target="_blank" rel="noopener">Ver @silasmarinhobx no Instagram</a></div></section>
<section class="section"><h2>Vídeos de IR com Silas Marinho</h2><p>Veja demonstrações publicadas pelo próprio Silas Marinho sobre IR para baixo. Cada vídeo abre em uma página de exibição própria, ligada ao catálogo e ao Reel original.</p><div class="grid">${videoCards}</div></section>
<section class="section" id="catalogo"><h2>Catálogo de IR para baixo</h2><div class="grid">${cards}</div></section>
<section class="section"><h2>Dúvidas sobre IR para contrabaixo</h2><h3>O que é IR para baixo?</h3><p>É um Impulse Response usado em pedaleiras e IR loaders compatíveis para reproduzir características de timbre por meio de um arquivo de resposta ao impulso.</p><h3>Qual é o formato?</h3><p>WAV 24-bit, com opções em 44,1 kHz e 48 kHz.</p><h3>Minha pedaleira funciona?</h3><p>Procure no manual do equipamento por “IR Loader”, “Impulse Response” ou “carregamento de IR em WAV”. A compatibilidade depende do modelo e do formato aceito pelo fabricante.</p></section>
</main><footer>© TB-BASS IR — Todos os direitos reservados.</footer></div></body></html>`;
const hubDir = path.join(publicDir, 'ir-para-baixo');
fs.mkdirSync(hubDir, {recursive:true});
fs.writeFileSync(path.join(hubDir, 'index.html'), hub);

fs.writeFileSync(path.join(publicDir, 'robots.txt'),
`User-agent: *
Allow: /
Disallow: /L/
Disallow: /vault/
Disallow: /client.html
Sitemap: ${canonicalBase}/sitemap.xml
Sitemap: ${canonicalBase}/video-sitemap.xml
`);

const date = new Date().toISOString().slice(0,10);
const urls = [
  `${canonicalBase}/`,
  hubCanonical,
  ...produtos.map(p => `${canonicalBase}/ir/${p.irId}/`),
  ...irVideos.map(v => v.canonical)
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${url}</loc><lastmod>${date}</lastmod></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
const videoSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${irVideos.map(v => `  <url>
    <loc>${xml(v.canonical)}</loc>
    <video:video>
      <video:thumbnail_loc>${xml(v.thumbnailUrl)}</video:thumbnail_loc>
      <video:title>${xml(v.title)}</video:title>
      <video:description>${xml(v.description)}</video:description>
      <video:player_loc>${xml(v.embedUrl)}</video:player_loc>
      <video:publication_date>${xml(v.uploadDate)}</video:publication_date>
    </video:video>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(publicDir, 'video-sitemap.xml'), videoSitemap);
console.log(`SEO gerado: ${produtos.length} páginas de IR + ${irVideos.length} páginas de vídeo + hub + sitemaps`);
