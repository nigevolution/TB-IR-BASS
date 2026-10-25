import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync('public/index.html','utf8');
const store = fs.readFileSync('public/js/store.js','utf8');
const official = 'https://wa.me/message/3QND546Y75L3M1';

test('site não carrega mais a IA local própria', () => {
  assert.doesNotMatch(html, /tb-ai-chat-shell|tb-ai-chat-launcher|site-ai-local\.js|site-ai-chat\.js/);
});

test('CTAs principais usam o link oficial do WhatsApp Business', () => {
  assert.match(html, new RegExp(official.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
  assert.doesNotMatch(html, /wa\.me\/5575988674964/);
});

test('suporte de teste IR abre o link oficial do WhatsApp Business', () => {
  assert.match(store, new RegExp(official.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
  assert.doesNotMatch(store, /wa\.me\/5575988674964/);
});

test('botão flutuante abre o WhatsApp oficial em um toque', () => {
  assert.match(html, /<a[^>]*id="whats-float"[^>]*href="https:\/\/wa\.me\/message\/3QND546Y75L3M1"/);
});

test('UTMify ignora somente os links oficiais do WhatsApp', () => {
  assert.match(html, /data-utmify-ignore-classes="tb-whatsapp-direct"/);
  const directLinks = html.match(/class="[^"]*tb-whatsapp-direct[^"]*"[^>]*href="https:\/\/wa\.me\/message\/3QND546Y75L3M1"/g) || [];
  assert.equal(directLinks.length, 2);
});
