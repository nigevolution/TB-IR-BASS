import { createHash } from 'node:crypto';

const asNumber = value => {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};

const nonEmpty = value => {
  const text = String(value ?? '').trim();
  return text || null;
};

function checkoutParams(order) {
  const raw = order?.checkoutUrl || order?.checkout_url || '';
  try {
    return new URL(raw).searchParams;
  } catch {
    return new URLSearchParams();
  }
}

function first(order, params, ...keys) {
  for (const key of keys) {
    const direct = nonEmpty(order?.[key]);
    if (direct) return direct;
    const fromUrl = nonEmpty(params.get(key));
    if (fromUrl) return fromUrl;
  }
  return null;
}

function syntheticClientId(orderId) {
  const digest = createHash('sha256').update(String(orderId || 'cakto')).digest();
  const left = digest.readUInt32BE(0) || 1;
  const right = digest.readUInt32BE(4) || 1;
  return `${left}.${right}`;
}

function purchaseValue(order) {
  const base = asNumber(order?.baseAmount ?? order?.base_amount);
  const discount = asNumber(order?.discount) ?? 0;
  if (base != null) return Math.max(0, Number((base - discount).toFixed(2)));
  const amount = asNumber(order?.amount);
  return amount == null ? 0 : Math.max(0, Number(amount.toFixed(2)));
}

function productInfo(order, params, value) {
  const product = order?.product || order?.items?.[0] || {};
  const itemId = first(order, params, 'tp_product_id') || nonEmpty(product.id) || 'tb-bass-ir';
  const itemName = nonEmpty(product.name || product.title) || 'TB-BASS IR';
  return {
    item_id: itemId,
    item_name: itemName,
    price: value,
    quantity: 1
  };
}

export function buildGa4PurchasePayload(order = {}) {
  const params = checkoutParams(order);
  const clientId = first(order, params, 'ga_client_id') || syntheticClientId(order.id || order.refId);
  const sessionRaw = first(order, params, 'ga_session_id');
  const sessionId = /^\d+$/.test(sessionRaw || '') ? Number(sessionRaw) : undefined;
  const value = purchaseValue(order);
  const item = productInfo(order, params, value);

  const campaign = {
    source: first(order, params, 'utm_source'),
    medium: first(order, params, 'utm_medium'),
    campaign: first(order, params, 'utm_campaign'),
    term: first(order, params, 'utm_term'),
    content: first(order, params, 'utm_content')
  };
  const campaignParams = Object.fromEntries(
    Object.entries(campaign).filter(([, value]) => value)
  );

  const purchaseParams = {
    transaction_id: String(order.id || order.refId || 'cakto-order'),
    currency: 'BRL',
    value,
    items: [item],
    engagement_time_msec: 1
  };
  if (sessionId) purchaseParams.session_id = sessionId;
  const coupon = nonEmpty(order.couponCode || order.coupon_code);
  if (coupon) purchaseParams.coupon = coupon;

  const events = [];
  if (Object.keys(campaignParams).length) {
    events.push({
      name: 'campaign_details',
      params: {
        ...campaignParams,
        ...(sessionId ? { session_id: sessionId } : {}),
        engagement_time_msec: 1
      }
    });
  }
  events.push({ name: 'purchase', params: purchaseParams });
  return { client_id: clientId, events };
}

export function buildGa4CollectUrl(measurementId, apiSecret, debug = false) {
  const host = debug ? 'https://www.google-analytics.com/debug/mp/collect' : 'https://www.google-analytics.com/mp/collect';
  const query = new URLSearchParams({ measurement_id: measurementId, api_secret: apiSecret });
  return `${host}?${query}`;
}

export async function sendGa4Purchase(order, options = {}) {
  const measurementId = options.measurementId || process.env.GA4_MEASUREMENT_ID;
  const apiSecret = options.apiSecret || process.env.GA4_API_SECRET;
  if (!measurementId || !apiSecret) return { skipped: true, reason: 'ga4_not_configured' };
  const fetchImpl = options.fetchImpl || fetch;
  const response = await fetchImpl(buildGa4CollectUrl(measurementId, apiSecret, options.debug), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(buildGa4PurchasePayload(order))
  });
  return { skipped: false, ok: response.ok, status: response.status, response };
}
