import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const demoPath = path.join(root, 'public/js/browser-ir-demo.js');
const storePath = path.join(root, 'public/js/store.js');
const expectedIds = [
  'bass-mods','fender-ultra-2','fender-1978','music-man','gl-l2500',
  'kubicki-ex-factor','fender-american-elite-2018','fodera-elite-dlx','mtd-kingston-zx','sadowsky-m5',
  'sadowsky-metroline','lakland-ss44-75','sadowsky-nyc','fodera','swing',
  'trb-jp2','mayones','mtd','warwick-corvette','ken-smith'
];

function readDemo(){
  assert.equal(fs.existsSync(demoPath), true, 'browser demo module missing');
  return fs.readFileSync(demoPath, 'utf8');
}

test('browser IR demo resolve exatamente os 20 assets do catálogo', () => {
  const demo = readDemo();
  for(const id of expectedIds){
    assert.match(demo, new RegExp(`['"]${id}['"]\\s*:\\s*['"]/assets/ir-demo/${id}-demo\\.wav['"]`));
  }
  assert.doesNotMatch(demo, /DMARK/i);
  assert.doesNotMatch(demo, /const PRODUCT_ID\s*=|const DEMO_IR_URL\s*=/);
});

test('mapa de DEMOs coincide com os 20 irId do catálogo', () => {
  const store = fs.readFileSync(storePath, 'utf8');
  const ids = [...store.matchAll(/irId:"([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual([...new Set(ids)].sort(), [...expectedIds].sort());
});

test('browser IR demo mantém processamento local privado de 10 segundos', () => {
  const demo = readDemo();
  assert.match(demo, /browser-ir-demo/);
  assert.match(demo, /20\s*\*\s*1024\s*\*\s*1024/);
  assert.match(demo, /Math\.min\(10,/);
  assert.match(demo, /OfflineAudioContext/);
  assert.match(demo, /createConvolver/);
  assert.match(demo, /normalize\s*=\s*false/);
  assert.doesNotMatch(demo, /TB_BASS_PREVIEW_API|\/api\/preview|fetchIRPreviewWithTimeout/);
  assert.doesNotMatch(demo, /FormData|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|indexedDB/);
  assert.match(demo, /Seu áudio não é enviado para o servidor/);
  assert.match(demo, /URL\.revokeObjectURL/);
});

test('modal e checkout são atualizados pelo produto aberto', () => {
  const demo = readDemo();
  assert.match(demo, /DEMO_ASSETS\[product\?\.irId\]/);
  assert.match(demo, /product\.nome/);
  assert.match(demo, /product\.link/);
  assert.match(demo, /Original/);
  assert.match(demo, /TB-BASS Demo/);
  assert.doesNotMatch(demo, /product\?\.irId\s*!==\s*["']fender-ultra-2["']/);
});

test('módulo continua carregado antes da store e preserva o teste público', () => {
  const html = fs.readFileSync(path.join(root, 'public/index.html'), 'utf8');
  const store = fs.readFileSync(storePath, 'utf8');
  const demoScript = html.indexOf('js/browser-ir-demo.js');
  const storeScript = html.indexOf('js/store.js');
  assert.ok(demoScript >= 0, 'index deve carregar browser-ir-demo.js');
  assert.ok(demoScript < storeScript, 'browser demo deve carregar antes da store');
  assert.match(html, /browser-ir-demo\.js\?v=all20-browser-demo-20260907/);
  assert.match(store, /TBBrowserIRDemo\.attachToCard\(\{\s*card,\s*product:\s*p\s*\}\)/);
  assert.match(store, /openIRTestSupport\(tryBtn\.dataset\.irId, tryBtn\.dataset\.irName\)/);
});

test('todos os 20 assets DEMO existem fisicamente', () => {
  for(const id of expectedIds){
    assert.equal(fs.existsSync(path.join(root, `public/assets/ir-demo/${id}-demo.wav`)), true, id);
  }
});
