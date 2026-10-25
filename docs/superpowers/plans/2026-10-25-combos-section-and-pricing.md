# Combos Section & Pricing Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

Integrate the 10 dual IR combos into `tbbassir.com.br` with a dedicated, high-converting section, and update their prices in Cakto to prevent excessive cumulative discounts.

---

### Proposed Changes

#### 1. Cakto Bridge Automation
- File: `tools/cakto_bridge.py`
- Add `update_offer_price(offer_id: str, new_price: float)`
- Execute update across all 10 combos in Cakto to match approved margins.

#### 2. Combos Catalog & Store Integration
- File: `public/js/store.js`
- Define `combos` array with 10 combo objects:
  - `id`, `nome`, `badge`, `descricao`, `itens` (the 2 instruments included), `precoDe` (original sum), `precoPor` (adjusted combo price), `economia`, `link` (Cakto checkout).
- Render a dedicated `#combos-section` with:
  - Header: "⚡ Combos Exclusivos (2 Timbres)"
  - Subtitle: "Leve 2 timbres consagrados com desconto especial de pacote"
  - Premium cards with dual instrument visual tags, sound profile highlights, transparent savings badge, and direct tracked checkout CTA (`openTrackedCheckout`).

#### 3. Home HTML Section & Styling
- File: `index.html`
- Insert `<section id="combos-vitrine" class="tb-combos-section">` right after the Best Sellers or between Products and FAQ.
- Add CSS styling matching the dark glassmorphism design system of TB-BASS IR:
  - Glowing accent border, gradient badges, savings highlights (`Economize R$ XX,XX`), and mobile responsive layout.

#### 4. Automated Tests
- File: `tests/combos-integration.test.mjs`
- Assert that all 10 combos are properly configured.
- Assert that every combo link matches a live Cakto checkout URL.
- Assert that combo price is lower than individual sum, maintaining correct margin.
- Assert that all existing 45 tests in `tests/*.test.mjs` continue passing.

---

### Task List

- [ ] **Task 1: Add automated offer price updater and adjust combo prices in Cakto**
  - Add `update_offer_price` in `tools/cakto_bridge.py`.
  - Run update for all 10 combos in Cakto.
  - Verify via Cakto API that all 10 combos have the updated prices.

- [ ] **Task 2: Create automated tests for combos integration**
  - Create `tests/combos-integration.test.mjs`.
  - Run `node --test tests/combos-integration.test.mjs` (initially failing).

- [ ] **Task 3: Implement dedicated Combos data and rendering in store.js & index.html**
  - Add `combos` dataset and rendering logic in `public/js/store.js`.
  - Add container and professional styling in `index.html`.
  - Run tests until passing.

- [ ] **Task 4: Production verification and deployment**
  - Verify visual rendering via Safari DOM.
  - Sync changes to `TB-IR-BASS-git`.
  - Commit and push to `origin main`.
  - Verify Netlify build and deployment.
