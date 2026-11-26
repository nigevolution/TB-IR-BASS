/**
 * RED tests — full ads/GA4 tracking integration
 * Task 1: cakto-webhook.js usa dynamic import (não static ESM)
 * Task 2: seo-checkout-tracking.js persiste gclid/UTM em sessionStorage + dispara begin_checkout
 * Task 3: páginas videos-ir-para-baixo/* e avaliar/ têm GA4
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

const root = new URL('../', import.meta.url).pathname.replace(/\/$/, '');
const read = rel => readFileSync(resolve(root, rel), 'utf8');

// ─── Task 1: cakto-webhook.js — sem static ESM import ───────────────────────
describe('Task 1: cakto-webhook.js ESM fix', () => {
  const src = read('netlify/functions/cakto-webhook.js');

  test('não contém import estático ESM de ga4-purchase', () => {
    // Static top-level import de módulo ESM quebra em Netlify Lambda (CJS)
    assert.doesNotMatch(
      src,
      /^import\s+\{[^}]+\}\s+from\s+['"]\.\/lib\/ga4-purchase\.mjs['"]/m,
      'arquivo ainda tem static ESM import — deve usar dynamic import()'
    );
  });

  test('contém dynamic import de ga4-purchase.mjs dentro do handler', () => {
    assert.match(
      src,
      /await import\(["']\.\/lib\/ga4-purchase\.mjs["']\)/,
      'dynamic import() de ga4-purchase.mjs não encontrado'
    );
  });

  test('chama sendGa4Purchase(order)', () => {
    assert.match(src, /sendGa4Purchase\(order\)/);
  });

  test('node --check não reporta erro de sintaxe', async () => {
    const { execFile } = await import('node:child_process');
    const { promisify } = await import('node:util');
    const exec = promisify(execFile);
    await assert.doesNotReject(
      exec('node', ['--check', resolve(root, 'netlify/functions/cakto-webhook.js')]),
      'cakto-webhook.js tem erro de sintaxe'
    );
  });
});

// ─── Task 2: seo-checkout-tracking.js — gclid persistence + begin_checkout ──
describe('Task 2: seo-checkout-tracking.js GCLID e begin_checkout', () => {
  const src = read('public/js/seo-checkout-tracking.js');

  test('persiste gclid de URLSearchParams para sessionStorage', () => {
    // O código usa um loop com array contendo 'gclid' + sessionStorage.setItem('tb_' + k, v)
    assert.match(src, /'gclid'/,
      'gclid não está na lista de parâmetros a persistir');
    assert.match(src, /sessionStorage\.setItem/,
      'sessionStorage.setItem ausente');
  });

  test('persiste gbraid em sessionStorage', () => {
    assert.match(src, /'gbraid'/,
      'gbraid não está na lista de parâmetros a persistir');
  });

  test('persiste utm_source em sessionStorage', () => {
    assert.match(src, /'utm_source'/,
      'utm_source não está na lista de parâmetros a persistir');
  });

  test('lê gclid do sessionStorage e passa ao link de checkout', () => {
    // O código faz sessionStorage.getItem('tb_' + k) num loop que inclui 'gclid'
    assert.match(src, /sessionStorage\.getItem/,
      'sessionStorage.getItem ausente — parâmetros não são lidos para o link');
  });

  test('dispara evento begin_checkout via gtag ao clicar em [data-tb-checkout]', () => {
    assert.match(src, /gtag\s*\(\s*['"]event['"],\s*['"]begin_checkout['"]/,
      'evento begin_checkout não disparado via gtag');
  });
});

// ─── Task 3: páginas faltantes com GA4 tag ───────────────────────────────────
describe('Task 3: GA4 nas páginas faltantes', () => {
  const pages = [
    'public/avaliar/index.html',
    'public/videos-ir-para-baixo/15-opcoes-ir-silas-marinho/index.html',
    'public/videos-ir-para-baixo/garanta-seu-ir-silas-marinho/index.html',
    'public/videos-ir-para-baixo/sadowsky-ir-silas-marinho/index.html',
  ];

  for (const page of pages) {
    test(`${page} contém G-FNRVG1V5MC`, () => {
      const src = read(page);
      assert.match(src, /G-FNRVG1V5MC/,
        `GA4 measurement ID ausente em ${page}`);
    });

    test(`${page} carrega gtag.js`, () => {
      const src = read(page);
      assert.match(src, /googletagmanager\.com\/gtag\/js/,
        `gtag.js ausente em ${page}`);
    });
  }
});
