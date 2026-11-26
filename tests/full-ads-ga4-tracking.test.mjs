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

// ─── Task 4: Tag Google Ads (AW-18480330357) e conversão Checkout Iniciado ───
describe('Task 4: Google Ads tag AW-18480330357 em todo o site', () => {
  const pagesWithTag = [
    'public/index.html',
    'index.html',
    'public/obrigado/index.html',
    'public/politica-de-devolucao/index.html',
    'public/como-instalar-ir-na-tank-b/index.html',
    'public/avaliar/index.html',
    'public/video.html',
    'public/video2.html',
    'public/videos-ir-para-baixo/15-opcoes-ir-silas-marinho/index.html',
    'public/videos-ir-para-baixo/garanta-seu-ir-silas-marinho/index.html',
    'public/videos-ir-para-baixo/sadowsky-ir-silas-marinho/index.html',
    'public/ir-para-baixo/index.html',
    'public/ir/fender-ultra-2/index.html',
  ];

  for (const page of pagesWithTag) {
    test(`${page} configura gtag AW-18480330357`, () => {
      const src = read(page);
      assert.match(src, /gtag\s*\(\s*['"]config['"]\s*,\s*['"]AW-18480330357['"]\s*\)/,
        `gtag('config', 'AW-18480330357') ausente em ${page}`);
    });
  }

  test('seo-checkout-tracking.js dispara conversão AW-18480330357/mrlxCK6h3b8dEPXsjexE', () => {
    const src = read('public/js/seo-checkout-tracking.js');
    assert.match(src, /AW-18480330357\/mrlxCK6h3b8dEPXsjexE/);
  });

  test('seo-checkout-tracking.js dispara eventos no evento click (evitando falso positivo no scroll)', () => {
    const src = read('public/js/seo-checkout-tracking.js');
    assert.match(src, /addEventListener\(\s*['"]click['"]/);
  });
});

// ─── Task 5: Home (store.js e index.html) persiste GCLID e dispara begin_checkout / generate_lead ───
describe('Task 5: Rastreamento completo na Home (store.js e index.html)', () => {
  const store = read('public/js/store.js');
  const html = read('public/index.html');

  test('store.js persiste gclid, gbraid e wbraid em sessionStorage', () => {
    assert.match(store, /['"]gclid['"]/);
    assert.match(store, /['"]gbraid['"]/);
    assert.match(store, /['"]wbraid['"]/);
    assert.match(store, /sessionStorage\.setItem/);
    assert.match(store, /sessionStorage\.getItem/);
  });

  test('openTrackedCheckout dispara begin_checkout e conversão AW-18480330357/mrlxCK6h3b8dEPXsjexE', () => {
    assert.match(store, /begin_checkout/);
    assert.match(store, /AW-18480330357\/mrlxCK6h3b8dEPXsjexE/);
  });

  test('cliques em WhatsApp disparam generate_lead no GA4', () => {
    assert.match(html, /gtag\s*\(\s*['"]event['"]\s*,\s*['"]generate_lead['"]/);
    assert.match(store, /trackGA4ProductEvent\(\s*['"]generate_lead['"]/);
  });

  test('runtime sandbox: buildTrackedCheckoutUrl preserva gclid e UTMs do sessionStorage', async () => {
    const vm = await import('node:vm');
    const fnStart = store.indexOf('function getStoredTrackingParam(');
    const fnEnd = store.indexOf('function sendTrackPilotClickRecord(');
    assert.ok(fnStart !== -1 && fnEnd !== -1, 'helpers getStoredTrackingParam/buildTrackedCheckoutUrl devem existir');
    const storageMap = new Map([
      ['tb_gclid', 'EAIaIQobChMI_TEST_GCLID'],
      ['tb_gbraid', 'GBRAID_TEST'],
      ['tb_utm_source', 'google'],
      ['tb_utm_medium', 'cpc'],
      ['tb_utm_campaign', '24544740459'],
    ]);
    const ctx = {
      URL,
      URLSearchParams,
      window: { location: { href: 'https://tbbassir.com.br/', search: '' }, __tbBassGA4Ids: { client_id: '11.22', session_id: '9988' } },
      sessionStorage: { getItem: k => storageMap.get(k) ?? null, setItem: (k, v) => storageMap.set(k, v) },
      getAnalyticsItemId: () => 'fender-ultra-2',
    };
    vm.runInNewContext(`${store.slice(fnStart, fnEnd)}\nthis.build = buildTrackedCheckoutUrl;`, ctx);
    const out = new URL(ctx.build('https://pay.cakto.com.br/checkout/w3x2i3r_700686', { irId: 'fender-ultra-2' }, 'tpc_1', 'tps_1'));
    assert.equal(out.searchParams.get('gclid'), 'EAIaIQobChMI_TEST_GCLID');
    assert.equal(out.searchParams.get('gbraid'), 'GBRAID_TEST');
    assert.equal(out.searchParams.get('utm_source'), 'google');
    assert.equal(out.searchParams.get('utm_medium'), 'cpc');
    assert.equal(out.searchParams.get('utm_campaign'), '24544740459');
    assert.equal(out.searchParams.get('ga_client_id'), '11.22');
    assert.equal(out.searchParams.get('ga_session_id'), '9988');
  });
});
