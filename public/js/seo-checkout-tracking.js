(() => {
  const measurementId = 'G-FNRVG1V5MC';
  const ga = {};

  // Persiste parâmetros de rastreamento de anúncios da URL para sessionStorage
  // gclid/gbraid/wbraid: identificadores de clique do Google Ads
  // UTMs: parâmetros de campanha para repasse ao checkout Cakto
  (function persistClickIds() {
    const p = new URLSearchParams(location.search);
    for (const k of ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      const v = p.get(k);
      if (v) sessionStorage.setItem('tb_' + k, v);
    }
  })();

  const makeClickId = productId => {
    const safe = String(productId || 'item').replace(/[^a-z0-9-]+/gi, '-').toLowerCase();
    return `tpc_${safe}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  };

  const updateLink = link => {
    let url;
    try { url = new URL(link.href); } catch { return; }
    const productId = link.dataset.productId || location.pathname.split('/').filter(Boolean).at(-1) || '';
    if (!url.searchParams.get('sck')) url.searchParams.set('sck', makeClickId(productId));
    if (productId) url.searchParams.set('tp_product_id', productId);
    if (ga.client_id) url.searchParams.set('ga_client_id', ga.client_id);
    if (ga.session_id) url.searchParams.set('ga_session_id', ga.session_id);
    // Repassa parâmetros de anúncio persistidos em sessionStorage
    for (const k of ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      const v = sessionStorage.getItem('tb_' + k);
      if (v && !url.searchParams.has(k)) url.searchParams.set(k, v);
    }
    link.href = url.toString();
  };

  const refresh = () => document.querySelectorAll('[data-tb-checkout]').forEach(updateLink);

  const cacheGaIds = () => {
    if (typeof gtag !== 'function') return;
    gtag('get', measurementId, 'client_id', value => {
      if (value) ga.client_id = String(value);
      refresh();
    });
    gtag('get', measurementId, 'session_id', value => {
      if (value) ga.session_id = String(value);
      refresh();
    });
  };

  const init = () => {
    refresh();
    cacheGaIds();
    document.addEventListener('pointerdown', event => {
      const link = event.target.closest?.('[data-tb-checkout]');
      if (link) updateLink(link);
    }, { capture: true });
    document.addEventListener('click', event => {
      const link = event.target.closest?.('[data-tb-checkout]');
      if (link) {
        updateLink(link);
        // Dispara begin_checkout no GA4 e conversão no Google Ads ao clicar no checkout
        if (typeof gtag === 'function') {
          gtag('event', 'begin_checkout', {
            currency: 'BRL',
            ...(ga.session_id ? { session_id: ga.session_id } : {})
          });
          gtag('event', 'conversion', {
            send_to: 'AW-18480330357/mrlxCK6h3b8dEPXsjexE',
            value: 1.0,
            currency: 'BRL'
          });
        }
      }
    }, { capture: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
