import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const storePath = path.join(root, 'public/js/store.js');
const publicHtmlPath = path.join(root, 'public/index.html');
const rootHtmlPath = path.join(root, 'index.html');

test('Combo Black Friday 3 possui soma original real (R$ 287,00) e Combo 4 corrige nome Sadowsky M5', () => {
  const store = fs.readFileSync(storePath, 'utf8');
  assert.match(
    store,
    /combo-bf-3-mtd-fodera-mayones[\s\S]*?precoDe:\s*287(?:\.00)?[\s\S]*?precoPor:\s*195\.79[\s\S]*?economia:\s*91\.21/
  );
  assert.doesNotMatch(store, /Sadowsky NYC M5/);
});

test('cards de cronômetro preservam data-item-id e iniciam de forma síncrona sem flash 00d', () => {
  const store = fs.readFileSync(storePath, 'utf8');
  assert.match(store, /class="countdown"[\s\S]*?data-item-id="\$\{analyticsItem\.item_id\}"/);
  assert.match(store, /const updateCountdownItem\s*=\s*\(\)\s*=>|function updateCountdownItem\(/);
  assert.match(store, /if\s*\(\s*!updateCountdownItem\(\)\s*\)\s*\{?\s*\n?\s*const timer = setInterval/);
});

test('preview antigo de áudio permanece desativado e busca textual integra com filtros de timbre', () => {
  const store = fs.readFileSync(storePath, 'utf8');
  assert.match(store, /const enableAudioPreview = false;/);
  assert.match(store, /catalogSearch/);
  assert.match(store, /function applyCatalogFilters\(/);
  assert.match(store, /catalogEmptyState/);
  assert.match(store, /catalogCount/);
});

test('cards de produto incluem faixa técnica e footer alinhado para altura uniforme', () => {
  const store = fs.readFileSync(storePath, 'utf8');
  assert.match(store, /tb-card-specs/);
  assert.match(store, /tb-card-footer/);
});

test('HTML possui menu mobile acessível, barra BF compacta, busca e chips com wrap no mobile', () => {
  const html = fs.readFileSync(publicHtmlPath, 'utf8');
  const rootHtml = fs.readFileSync(rootHtmlPath, 'utf8');
  assert.equal(html, rootHtml, 'index.html deve estar sincronizado com public/index.html');

  assert.match(html, /id="tbMobileMenuBtn"[^>]*aria-expanded="false"[^>]*aria-controls="tbMobileDrawer"/);
  assert.match(html, /id="tbMobileDrawer"/);
  assert.match(html, /id="catalogSearch"/);
  assert.match(html, /id="catalogCount"/);
  assert.match(html, /id="catalogEmptyState"/);

  const mobileFilterCss = html.match(/@media\s*\(max-width:\s*720px\)[\s\S]*?\.tone-filter-row\s*\{([^}]*)\}/);
  assert.ok(mobileFilterCss, 'Regra mobile .tone-filter-row deve existir');
  assert.doesNotMatch(mobileFilterCss[1], /flex-wrap:\s*nowrap/);
  assert.match(mobileFilterCss[1], /flex-wrap:\s*wrap/);
});

test('acessibilidade do FAQ, botão de vídeo, WhatsApp local/UTMify e áudio lazy estão corrigidos', () => {
  const html = fs.readFileSync(publicHtmlPath, 'utf8');

  assert.match(
    html,
    /\.tb-sales-video-frame\.is-playing\s+\.tb-sales-video-play\s*\{[^}]*visibility:\s*hidden/
  );
  assert.doesNotMatch(html, /upload\.wikimedia\.org\/wikipedia\/commons\/6\/6b\/WhatsApp\.svg/);
  assert.doesNotMatch(html, /let heroAudio = new Audio\(/);
  assert.match(html, /<img id="tbFeedbackImage" src="\/assets\/feedbacks\/feedback-1\.png"/);
  assert.match(html, /class="tb-whatsapp-direct"[^>]*>WhatsApp Oficial<\/a>|href="https:\/\/wa\.me\/message\/3QND546Y75L3M1"[^>]*class="tb-whatsapp-direct"[^>]*>WhatsApp Oficial<\/a>/);
  assert.match(html, /aria-expanded/);
});

test('HTML carrega sistema tipográfico editorial (Outfit, Plus Jakarta Sans, JetBrains Mono) e paleta multi-acento de estúdio', () => {
  const html = fs.readFileSync(publicHtmlPath, 'utf8');
  assert.match(html, /fonts\.googleapis\.com\/css2\?[^"]*Outfit[^"]*Plus\+Jakarta\+Sans[^"]*JetBrains\+Mono/);
  assert.match(html, /--font-display:/);
  assert.match(html, /--font-mono:/);
  assert.match(html, /--cyan:/);
  assert.match(html, /--emerald:/);
  assert.match(html, /\.bg-layer[\s\S]*background-size:/);
});

test('seções de toda a página usam painéis estruturados Studio Rack e FAQ com indicador visual', () => {
  const html = fs.readFileSync(publicHtmlPath, 'utf8');
  assert.match(html, /class="tb-catalog-panel"/);
  assert.match(html, /class="tb-trust-grid"/);
  assert.match(html, /class="tb-trust-card"/);
  assert.match(html, /class="tb-footer-inner"/);
  assert.match(html, /#faq\s+summary::after/);
});

test('cards de produto exibem tag de perfil de timbre e cabeçalho alinhado', () => {
  const store = fs.readFileSync(storePath, 'utf8');
  assert.match(store, /TONE_PROFILE_LABELS/);
  assert.match(store, /tb-card-top-row/);
  assert.match(store, /tb-tone-tag/);
});
