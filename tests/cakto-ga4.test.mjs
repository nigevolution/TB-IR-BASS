import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const helperPath = path.join(root, 'netlify', 'functions', 'lib', 'ga4-purchase.mjs');

async function loadHelper() {
  assert.ok(fs.existsSync(helperPath), 'GA4 purchase helper should exist');
  return import(`${pathToFileURL(helperPath).href}?t=${Date.now()}`);
}

const trackedOrder = {
  id: 'order-123',
  refId: '85FJQir',
  status: 'paid',
  baseAmount: '35.00',
  discount: '3.00',
  amount: '33.35',
  paymentMethod: 'pix',
  paidAt: '2026-09-15T17:35:00-04:00',
  product: { id: 'product-1', name: 'Sadowsky Metroline IR' },
};
trackedOrder.utm_source = 'google';
trackedOrder.utm_medium = 'organic';
trackedOrder.utm_campaign = 'seo_ir_pages';
trackedOrder.utm_content = 'sadowsky-metroline';
trackedOrder.sck = 'tpc_sadowsky-metroline_abc';
trackedOrder.checkoutUrl = [
  'https://pay.cakto.com.br/checkout/yaueq45_665688',
  '?ga_client_id=111.222',
  '&ga_session_id=1789511700',
  '&tp_product_id=sadowsky-metroline'
].join('');

test('builds a GA4 purchase tied to the original web session', async () => {
  const { buildGa4PurchasePayload } = await loadHelper();
  const payload = buildGa4PurchasePayload(trackedOrder);
  assert.equal(payload.client_id, '111.222');
  assert.equal(payload.events[0].name, 'campaign_details');
  assert.equal(payload.events[0].params.source, 'google');
  assert.equal(payload.events[0].params.medium, 'organic');
  const purchase = payload.events.at(-1);
  assert.equal(purchase.name, 'purchase');
  assert.equal(purchase.params.transaction_id, 'order-123');
  assert.equal(purchase.params.session_id, 1789511700);
  assert.equal(purchase.params.value, 32);
});

test('falls back to a non-PII client id and keeps purchase data private', async () => {
  const { buildGa4PurchasePayload } = await loadHelper();
  const order = {
    ...trackedOrder,
    customer: { email: 'buyer@example.com', name: 'Buyer Name' },
    checkoutUrl: 'https://pay.cakto.com.br/checkout/yaueq45_665688',
    utm_source: 'ig',
    utm_medium: 'social'
  };
  const first = buildGa4PurchasePayload(order);
  const second = buildGa4PurchasePayload(order);
  assert.match(first.client_id, /^\d+\.\d+$/);
  assert.equal(first.client_id, second.client_id);
  const serialized = JSON.stringify(first);
  assert.doesNotMatch(serialized, /buyer@example\.com|Buyer Name/);
  assert.match(serialized, /Sadowsky Metroline IR/);
});

test('store checkout bridge forwards GA client and session identifiers', () => {
  const source = fs.readFileSync(path.join(root, 'public', 'js', 'store.js'), 'utf8');
  assert.match(source, /ga_client_id/);
  assert.match(source, /ga_session_id/);
  assert.match(source, /gtag\(["']get["']/);
});

test('Cakto webhook sends paid orders to GA4 and supports current OAuth env names', () => {
  const source = fs.readFileSync(path.join(root, 'netlify', 'functions', 'cakto-webhook.js'), 'utf8');
  assert.match(source, /sendGa4Purchase\(order\)/);
  assert.match(source, /CACKTO_CLIENT_ID/);
  assert.match(source, /CACKTO_CLIENT_SECRET/);
  assert.match(source, /oauth\/token/);
});
