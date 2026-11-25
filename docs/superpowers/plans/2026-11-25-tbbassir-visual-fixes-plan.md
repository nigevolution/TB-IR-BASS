# TB-BASS IR — Visual Redesign & Audit Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (Native) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corrigir todas as falhas técnicas apontadas na auditoria do site `tbbassir.com.br` e aplicar o redesign visual e de cards mantendo o preview antigo de áudio/vídeo desativado, entregando prévia local verificada antes de qualquer publicação.

**Architecture:** Refinar o módulo de dados/renderização em `public/js/store.js` e o markup/CSS de `public/index.html` (espelhando em `index.html` para manter paridade). Toda mudança segue TDD estrito com testes em `tests/site-audit-fixes-and-ui.test.mjs`, atualização pontual do contrato `whatsapp-handoff.test.mjs` para o 3º link `tb-whatsapp-direct` no rodapé, e validação visual via servidor HTTP local + subagente browser em Desktop (`1280x800`) e Mobile (`390x844`).

**Tech Stack:** HTML5 semântico, CSS Grid/Flexbox moderno, Vanilla JS (ES6), Node.js `node:test`.

**Spec:** `docs/superpowers/specs/2026-11-25-tbbassir-visual-fixes-design.md`

## Global Constraints
- Manter `const enableAudioPreview = false;` e vídeos de cards ocultos (IRs atualizados recentemente).
- Manter intactos pixels GA4 (`G-FNRVG1V5MC`), Meta Pixel (`1147738740851849`), UTMify (`6a1f37d4b460776ed0169286`), Google AdSense (`ca-pub-5486668534558112`), Merchant Widget e fluxo `?produto=trackpilot`.
- Manter compatibilidade com `tests/conversion-preview.test.mjs`, `tests/catalog-parity.test.mjs`, `tests/browser-ir-demo.test.mjs`, `tests/security-headers-and-functions.test.mjs`.
- **Proibido publicar:** Não executar `git commit`, `git push` ou deploy no Netlify antes da aprovação explícita do usuário.

## Review Focus
- Os 6 cards que tinham `release` no passado não podem passar `""` para `openTrackedCheckout` nem exibir `⏳ 00d 00h 00m 00s` na renderização inicial.
- A busca textual `#catalogSearch` deve trabalhar em conjunto com os filtros de timbre (`#toneNavigator`) e esconder/mostrar o aviso vazio corretamente sem quebrar a página `/trackpilot/`.
- O menu gaveta mobile (`#tbMobileDrawer`) não pode vazar altura/overflow nem permanecer preso aberto ao clicar em âncora ou redimensionar para desktop.
- `public/index.html` e `index.html` devem permanecer idênticos byte a byte.
- Os chips de filtro em `390px` de largura devem permanecer totalmente visíveis dentro da viewport (`x >= 0` e `x + width <= 390`).

---

### Task 1: Testes TDD para dados de combos, tracking de checkout e busca combinada com filtros

**Files:**
- Create: `tests/site-audit-fixes-and-ui.test.mjs`
- Modify: `public/js/store.js:248-268`, `public/js/store.js:1718-1745`, `public/js/store.js:1822-1835`, `public/js/store.js:1997-2051`

**Interfaces:**
- Produces: `filterCatalogCards()` / wiring entre `#catalogSearch`, `[data-tone-filter]`, `#catalogCount`, `#catalogEmptyState` em `public/js/store.js` e slugs preservados via `data-item-id` em `.countdown`.

- [ ] **Step 1: Escrever teste que falha cobrindo combos 3/4, `data-item-id` no countdown, inicialização síncrona sem flash, e busca textual integrada**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const store = fs.readFileSync(path.join(root, 'public/js/store.js'), 'utf8');

test('Combo Black Friday 3 e 4 possuem soma e nomenclatura consistentes com o catálogo', () => {
  assert.match(store, /combo-bf-3-mtd-fodera-mayones[\s\S]*?precoDe:\s*287(?:\.00)?[\s\S]*?precoPor:\s*195\.79[\s\S]*?economia:\s*91\.21/);
  assert.doesNotMatch(store, /Sadowsky NYC M5/);
});

test('countdown preserva data-item-id e executa imediatamente sem flash de 00d', () => {
  assert.match(store, /class="countdown"[\s\S]*?data-item-id="\$\{analyticsItem\.item_id\}"/);
  assert.match(store, /function updateCountdownEl\(|const tick = \(\)\s*=>/);
});

test('audio preview permanece desativado e busca textual filtra em conjunto com perfil de timbre', () => {
  assert.match(store, /const enableAudioPreview = false;/);
  assert.match(store, /catalogSearch/);
  assert.match(store, /applyCatalogFilters/);
});
```

- [ ] **Step 2: Rodar o novo teste e confirmar que falha (RED)**

Run: `node --test tests/site-audit-fixes-and-ui.test.mjs`
Expected: FAIL (Combo BF 3 still `279.70`, `Sadowsky NYC M5` still present, `data-item-id` missing on `.countdown`, `catalogSearch` / `applyCatalogFilters` not defined).

- [ ] **Step 3: Implementar as correções e filtro combinado em `public/js/store.js`**
  - Atualizar Combo BF 3 (`precoDe: 287.00`, `precoPor: 195.79`, `economia: 91.21`, badge `"👑 32% OFF • PACK BOUTIQUE"`) e Combo BF 4 (`"Sadowsky M5"` em `desc` e `itens`).
  - Adicionar `data-item-id="${analyticsItem.item_id}"` na tag `<div class="countdown">`.
  - Refatorar `startCountdown()` para rodar um `tick()` síncrono imediato por `.countdown` e só criar `setInterval` se `diff > 0` (mantendo a estrutura `if(diff <= 0){ ... el.outerHTML = out ... }` exigida em `conversion-preview.test.mjs`).
  - Adicionar especificação técnica sutil `.tb-card-specs` (`WAV 24-bit · 44.1/48kHz`) e wrapper consistente `.tb-card-footer` nos cards de produto para nivelamento horizontal com a base.
  - Implementar `applyCatalogFilters()` unindo `[data-tone-filter]`, `#catalogSearch`, `#catalogCount` e `#catalogEmptyState` em `wireToneNavigator()`.

- [ ] **Step 4: Rodar os testes para verificar que passam (GREEN)**

Run: `node --test tests/site-audit-fixes-and-ui.test.mjs tests/conversion-preview.test.mjs tests/catalog-parity.test.mjs`
Expected: PASS

---

### Task 2: Testes TDD para layout, cards, menu mobile, acessibilidade, WhatsApp e limpeza de HTML

**Files:**
- Modify: `tests/site-audit-fixes-and-ui.test.mjs`
- Modify: `tests/whatsapp-handoff.test.mjs:27-31`
- Modify: `public/index.html`
- Sync: `index.html`

**Interfaces:**
- Consumes: `#catalogSearch`, `#catalogCount`, `#catalogEmptyState`, `.tb-card-footer`, `.tb-card-specs` de Task 1.

- [ ] **Step 1: Expandir `tests/site-audit-fixes-and-ui.test.mjs` com verificações de HTML/CSS/A11y/Mobile (RED)**

```js
test('HTML possui menu mobile, busca textual, filtros sem nowrap e footer WhatsApp protegido', () => {
  const html = fs.readFileSync(path.join(root, 'public/index.html'), 'utf8');
  const rootHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.equal(html, rootHtml, 'index.html deve estar sincronizado com public/index.html');
  assert.match(html, /id="tbMobileDrawer"/);
  assert.match(html, /id="tbMobileMenuBtn"[^>]*aria-expanded="false"/);
  assert.match(html, /id="catalogSearch"/);
  assert.doesNotMatch(html, /\.tone-filter-row\s*\{[^}]*flex-wrap:\s*nowrap/);
  assert.match(html, /\.tb-sales-video-frame\.is-playing\s+\.tb-sales-video-play\s*\{[^}]*visibility:\s*hidden/);
  assert.doesNotMatch(html, /upload\.wikimedia\.org\/wikipedia\/commons\/6\/6b\/WhatsApp\.svg/);
  assert.doesNotMatch(html, /let heroAudio = new Audio\(/);
  assert.match(html, /<img id="tbFeedbackImage" src="\/assets\/feedbacks\/feedback-1\.png"/);
  assert.match(html, /aria-expanded/);
});
```

- [ ] **Step 2: Rodar o teste expandido e confirmar que falha (RED)**

Run: `node --test tests/site-audit-fixes-and-ui.test.mjs`
Expected: FAIL nos asserts de menu mobile, busca, `flex-wrap`, `visibility: hidden`, Wikimedia SVG, lazy `heroAudio`, `tbFeedbackImage` src e `aria-expanded`.

- [ ] **Step 3: Aplicar redesign visual, cards aprimorados, menu mobile, correções de vídeo/FAQ/WhatsApp em `public/index.html`, atualizar `tests/whatsapp-handoff.test.mjs` (3 links diretos) e sincronizar `index.html`**
  - Compactar `#tbBfBar` para 1 linha enxuta em desktop e layout compacto em mobile (`<= 768px`).
  - Adicionar botão `.tb-mobile-menu-btn` e gaveta `#tbMobileDrawer` em `.tb-site-nav` com script de abertura/fechamento (Esc, clique em âncora, resize > 768px).
  - Modernizar tokens e superfícies dos cards (`.tb-product-card`, `.tb-combo-card`, `.stage-card`, `.tb-trust-section`) com elevação visual, melhor contraste, footer de preço alinhado na base e badges refinados.
  - Remover `flex-wrap: nowrap` de `.tone-filter-row` no mobile e estilizar `#catalogSearch` + `#catalogCount` + `#catalogEmptyState`.
  - Tornar `heroAudio` lazy dentro de `toggleHeroPlay()`, esconder `#tbSalesVideoPlay` com `visibility: hidden` quando `.is-playing`, sincronizar `aria-expanded` no `#faq`, adicionar `class="tb-whatsapp-direct"` ao WhatsApp Oficial do footer, trocar SVG da Wikimedia por `<svg>` inline no `#whats-float`, e dar `src` inicial ao `#tbFeedbackImage`.
  - Sincronizar `public/index.html` para `index.html`.

- [ ] **Step 4: Rodar suíte completa Node e confirmar sucesso**

Run: `node --test tests/site-audit-fixes-and-ui.test.mjs tests/whatsapp-handoff.test.mjs tests/conversion-preview.test.mjs tests/catalog-parity.test.mjs tests/browser-ir-demo.test.mjs tests/cakto-ga4.test.mjs tests/google-customer-reviews.test.mjs tests/google-shopping-feed.test.mjs tests/security-headers-and-functions.test.mjs`
Expected: PASS (todos os testes dessas 9 suítes passam; documentar separadamente as 2 suítes legadas preexistentes).

---

### Task 3: Servidor local de prévia + auditoria visual/funcional em Desktop e Mobile via subagente browser

**Files:**
- Read-only / runtime server check on `public/`

- [ ] **Step 1: Subir servidor HTTP local na pasta `public/` (daemon) em porta livre (ex.: `http://127.0.0.1:4173`)**

Run: `python3 -m http.server 4173 --directory /Users/elbsferreiranobre/Documents/TB-IR-BASS-git/public` (background daemon)
Expected: Servidor escutando em `127.0.0.1:4173`.

- [ ] **Step 2: Despachar subagente `browser` (`flash`) para inspecionar `http://127.0.0.1:4173/` em `1280x800` e `390x844`**
  - Validar ausência de erros 404/console internos, slug preenchido nos 20 checkouts, preço e itens dos Combos 3 e 4, menu mobile funcional, busca + filtros visíveis sem corte no mobile, botão de play do vídeo escondendo ao iniciar, FAQ com `aria-expanded`, e inspecionar visualmente screenshots desktop e mobile para entregar a prévia ao usuário antes de publicar.
