(() => {
  const measurementId = 'G-FNRVG1V5MC';
  const ga = {};

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
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
