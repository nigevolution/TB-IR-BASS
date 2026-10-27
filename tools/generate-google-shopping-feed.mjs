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

const xmlEscape = str => String(str ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const top5Map = {
  'fender-ultra-2': 'Mais Vendido #1',
  'sadowsky-metroline': 'Mais Vendido #2',
  'trb-jp2': 'Mais Vendido #3',
  'sadowsky-m5': 'Mais Vendido #4',
  'bass-mods': 'Mais Vendido #5'
};

const itemsXml = produtos.map(p => {
  const priceNum = Number(precos[p.nome] ?? p.preco).toFixed(2);
  const imgPath = images[p.irId] || '/logo.png';
  const customLabel = top5Map[p.irId] ? `\n      <g:custom_label_0>${top5Map[p.irId]}</g:custom_label_0>` : '';
  const desc = `${p.desc} Impulse Response (IR) para contrabaixo e baixo em áudio WAV 24-bit de alta definição. 100% compatível com pedaleiras Tank-B (M-Vave), Cuvave Baby Bass, Zoom, Ampero, Boss e simuladores de gabinete com IR Loader.`;
  const title = `${p.nome} para Baixo - IR Tank-B e Cuvave`;

  return `    <item>
      <g:id>${xmlEscape(p.irId)}</g:id>
      <g:title>${xmlEscape(title)}</g:title>
      <g:description>${xmlEscape(desc)}</g:description>
      <g:link>${canonicalBase}/ir/${xmlEscape(p.irId)}/</g:link>
      <g:image_link>${canonicalBase}${xmlEscape(imgPath)}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:price>${priceNum} BRL</g:price>
      <g:brand>TB-BASS IR</g:brand>
      <g:google_product_category>Media &gt; Audio &gt; Sound Effects</g:google_product_category>${customLabel}
      <g:shipping>
        <g:country>BR</g:country>
        <g:service>Download Digital Imediato</g:service>
        <g:price>0.00 BRL</g:price>
      </g:shipping>
    </item>`;
}).join('\n');

const feedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>TB-BASS IR</title>
    <link>${canonicalBase}</link>
    <description>Catálogo de Impulse Responses (IR) e simulações para contrabaixo em WAV 24-bit</description>
${itemsXml}
  </channel>
</rss>
`;

const outputPath = path.join(publicDir, 'google-shopping-feed.xml');
fs.writeFileSync(outputPath, feedXml, 'utf8');
console.log(`Feed do Google Shopping gerado com sucesso em: ${outputPath}`);
