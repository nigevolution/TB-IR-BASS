import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const publicDir = path.join(root, 'public');
const feedPath = path.join(publicDir, 'google-shopping-feed.xml');

test('google shopping feed exists and is valid RSS 2.0 with g namespace', () => {
  assert.equal(fs.existsSync(feedPath), true, 'Feed XML deve existir em public/');
  const xml = fs.readFileSync(feedPath, 'utf8');
  assert.match(xml, /<rss version="2\.0" xmlns:g="http:\/\/base\.google\.com\/ns\/1\.0">/);
  assert.match(xml, /<title>TB-BASS IR<\/title>/);
  assert.match(xml, /<link>https:\/\/tbbassir\.com\.br<\/link>/);
});

test('google shopping feed contains the top 5 best sellers with correct labels and prices', () => {
  const xml = fs.readFileSync(feedPath, 'utf8');
  
  // Best seller #1: Fender Ultra 2
  assert.match(xml, /<g:id>fender-ultra-2<\/g:id>/);
  assert.match(xml, /<g:custom_label_0>Mais Vendido #1<\/g:custom_label_0>/);
  assert.match(xml, /<g:price>55\.00 BRL<\/g:price>/);
  
  // Best seller #2: Sadowsky Metroline
  assert.match(xml, /<g:id>sadowsky-metroline<\/g:id>/);
  assert.match(xml, /<g:custom_label_0>Mais Vendido #2<\/g:custom_label_0>/);
  assert.match(xml, /<g:price>35\.00 BRL<\/g:price>/);
  
  // Best seller #3: TRB JP2
  assert.match(xml, /<g:id>trb-jp2<\/g:id>/);
  assert.match(xml, /<g:custom_label_0>Mais Vendido #3<\/g:custom_label_0>/);
  assert.match(xml, /<g:price>59\.00 BRL<\/g:price>/);
  
  // Best seller #4: Sadowsky M5
  assert.match(xml, /<g:id>sadowsky-m5<\/g:id>/);
  assert.match(xml, /<g:custom_label_0>Mais Vendido #4<\/g:custom_label_0>/);
  assert.match(xml, /<g:price>59\.00 BRL<\/g:price>/);
  
  // Best seller #5: Bass Mods
  assert.match(xml, /<g:id>bass-mods<\/g:id>/);
  assert.match(xml, /<g:custom_label_0>Mais Vendido #5<\/g:custom_label_0>/);
  assert.match(xml, /<g:price>49\.00 BRL<\/g:price>/);
});

test('all feed items contain required Google Merchant tags', () => {
  const xml = fs.readFileSync(feedPath, 'utf8');
  assert.match(xml, /<g:brand>TB-BASS IR<\/g:brand>/);
  assert.match(xml, /<g:condition>new<\/g:condition>/);
  assert.match(xml, /<g:availability>in_stock<\/g:availability>/);
  assert.match(xml, /<g:shipping>/);
  assert.match(xml, /<g:country>BR<\/g:country>/);
  assert.match(xml, /<g:price>0\.00 BRL<\/g:price>/);
});
