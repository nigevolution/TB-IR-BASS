# Spec de Design e Correções — Vitrine TB-BASS IR (`tbbassir.com.br`)

**Data:** 2026-11-25  
**Escopo:** Correções técnicas da auditoria do site + modernização visual e de cards em ambiente local para pré-visualização antes de qualquer publicação.

---

## 1. Objetivo e Restrições Críticas
- Corrigir todos os defeitos funcionais, de tracking, responsividade mobile e consistência comercial identificados na auditoria de `https://tbbassir.com.br/`.
- Modernizar a direção visual da loja e padronizar os cards de **IRs** e **Combos Black Friday** mantendo a identidade dark-studio + âmbar (`#ff9a3c`) da marca TB-BASS IR.
- **Restrição absoluta:** Manter `enableAudioPreview = false` e vídeos de cards ocultos (os IRs foram atualizados e os previews antigos estão defasados por decisão do produtor). Evitar qualquer requisição automática a arquivos MP3 antigos no carregamento.
- **Não publicar em produção:** Todas as alterações permanecem locais (working tree + servidor local para prévia) até autorização explícita do usuário.

---

## 2. Abordagens Avaliadas e Escolha
- **Abordagem escolhida (Atualização integrada na vitrine principal + sincronização de `index.html`):** Evoluir diretamente [public/index.html](../../../public/index.html) e [public/js/store.js](../../../public/js/store.js) (espelhando `public/index.html` em `index.html`), preservando todas as landing pages `/ir/*`, pixels (GA4, Meta, UTMify, AdSense, Merchant Widget), fluxo `?produto=trackpilot` e contratos de testes existentes.
- **Alternativa descartada:** Substituir pelo protótipo estático `preview-redesign.html`, pois reativaria previews de áudio/vídeo obsoletos e quebraria o catálogo dinâmico de 20 IRs, 4 Combos Black Friday, TrackPilot e tracking Cakto/GA4.

---

## 3. Correções Técnicas Obrigatórias
1. **Slugs de checkout (`openTrackedCheckout`) e flash de cronômetro:** Incluir `data-item-id="${analyticsItem.item_id}"` nos blocos `.countdown` em `store.js` e executar uma avaliação síncrona inicial no `startCountdown()` antes do `setInterval` para liberar imediatamente os 6 IRs já lançados (`MTD 535-24 IR`, `Fender 1978 IR`, `Lakland SS44-75 IR`, `Sadowsky NYC IR`, `Swing Guitars Jazz Deluxe IR`, `Mayones Jabba 5 IR`) sem enviar slug vazio `""`.
2. **Preços e nomenclatura dos Combos:**
   - **Combo Black Friday 3:** Manter `precoPor: 195.79` (preço real validado na oferta `6ijutsd` da Cakto), corrigir `precoDe: 287.00` (`99 + 89 + 99`), `economia: 91.21` e badge `👑 32% OFF • PACK BOUTIQUE`.
   - **Combo Black Friday 4:** Corrigir `"Sadowsky NYC M5"` para `"Sadowsky M5"` em `desc` e `itens`.
3. **Carregamento ocioso de áudio:** Remover criação imediata de `new Audio('/audio/fender-ultra-II.mp3')` no load enquanto `.ab-player-box` estiver oculto.
4. **Link WhatsApp do rodapé:** Adicionar `class="tb-whatsapp-direct"` ao link `WhatsApp Oficial` do rodapé para que o script da UTMify o ignore como faz com os demais links oficiais (evitando caracteres Unicode invisíveis em `?text=`).
5. **Acessibilidade e vídeo:** Sincronizar `aria-expanded` nos `<summary>` do FAQ e esconder o botão `#tbSalesVideoPlay` com `visibility: hidden` quando `.is-playing`.
6. **Ícone local do WhatsApp e DOM limpo:** Usar SVG inline no `#whats-float` (sem depender de `upload.wikimedia.org`) e definir `src` inicial em `#tbFeedbackImage`.

---

## 4. Direção Visual, Cards e UX Mobile
- **Sistema visual:** Superfícies em camadas dark-studio (`#07070a`, cards `#101017` com bordas `1px solid rgba(255,255,255,0.09)` e realce especular sutil no topo), foco de leitura nítido e botões CTA com alto contraste.
- **Topo compacto e Menu Mobile:** Compactar `#tbBfBar` em `<= 768px` e adicionar botão + gaveta móvel (`#tbMobileDrawer`) com acesso às 6 seções em telas pequenas.
- **Filtros + Busca textual no catálogo:** Permitir quebra de linha (`flex-wrap: wrap`) em `#toneNavigator` no mobile para exibir todos os 5 chips sem corte lateral, além de campo `<input id="catalogSearch" type="search">` com contador de resultados e estado vazio amigável.
- **Padronização de altura e hierarquia dos Cards:** Ancorar rodapé de preço + CTA (`.tb-card-footer` / `.price-wrap` + `.buy-btn`) na base dos cards de produto e combo com `flex` para alinhamento uniforme em todas as linhas da grade.
