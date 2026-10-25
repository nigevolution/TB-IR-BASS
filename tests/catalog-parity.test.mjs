import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const storePath = path.join(root, 'public/js/store.js');
const store = fs.readFileSync(storePath, 'utf8');
const productBlock = store.match(/const produtos = \[([\s\S]*?)\n\];\n\nconst grid/);
assert.ok(productBlock, 'array produtos deve existir');
const names = [...productBlock[1].matchAll(/nome:\s*"([^"]+)"/g)].map(m => m[1]);
const trackPilot = 'TrackPilot by TB-BASS IR';
const expectedIRs = [
  'Bass Mods IR','Fender Ultra 2 IR','Fender 1978 IR','Music Man IR',
  'G&L L-2500 Americano IR','Kubicki Ex Factor IR','Fender American Elite Jazz Bass 2018 IR',
  'Fodera Elite DLX IR','MTD Kingston ZX IR','Sadowsky M5 IR','Sadowsky Metroline IR',
  'Lakland SS44-75 IR','Sadowsky NYC IR','Fodera IR','Swing Guitars Jazz Deluxe IR',
  'TRB JP2 IR','Mayones Jabba 5 IR','MTD 535-24 IR','Warwick Corvette IR','Ken Smith IR'
];

test('catálogo contém exatamente 20 IRs e TrackPilot separado', () => {
  assert.equal(names.length, 21);
  assert.equal(names.filter(n => n === trackPilot).length, 1);
  const irNames = names.filter(n => n !== trackPilot).sort();
  assert.deepEqual(irNames, [...expectedIRs].sort());
  assert.equal(names.some(n => /sire|combo/i.test(n)), false);
});

test('assets dos quatro IRs restaurados existem localmente', () => {
  const assets = [
    'kubicki-ex-factor.png',
    'fender-american-elite-2018.png',
    'fodera-elite-dlx.png',
    'mtd-kingston-zx.png'
  ];
  for (const file of assets) {
    assert.equal(
      fs.existsSync(path.join(root, 'public/assets/instruments/isolated-v1', file)),
      true,
      `${file} deve existir`
    );
  }
});

test('catálogo preserva isolamento da campanha TrackPilot', () => {
  assert.match(store, /if\(isTrackPilotCampaignPage\(\)\) return produtos\.filter\(p => isTrackPilotName\(p\.nome\)\)/);
  assert.match(store, /return produtos\.filter\(p => !isTrackPilotName\(p\.nome\)\)/);
});

test('Fender Ultra 2 usa R$55 como preço atual e preserva R$59 de referência', () => {
  const current = store.match(/"Fender Ultra 2 IR":\s*(\d+)/);
  const reference = productBlock[1].match(/nome:"Fender Ultra 2 IR",[\s\S]*?preco:(\d+)/);
  assert.ok(current);
  assert.ok(reference);
  assert.equal(Number(current[1]), 55);
  assert.equal(Number(reference[1]), 59);
});


test('todo video cadastrado aponta para um arquivo local existente', () => {
  const videos = [...productBlock[1].matchAll(/video:\s*"([^"]+)"/g)].map(m => m[1]);
  assert.ok(videos.length > 0);
  for (const url of videos) {
    const relative = url.replace(/^\/+/, '');
    const file = path.join(root, 'public', relative);
    assert.equal(fs.existsSync(file), true, `${url} deve existir`);
    assert.ok(fs.statSync(file).size > 0, `${url} nao pode estar vazio`);
  }
});
