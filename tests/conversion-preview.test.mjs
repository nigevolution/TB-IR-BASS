import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(root, 'public/index.html'), 'utf8');
const store = fs.readFileSync(path.join(root, 'public/js/store.js'), 'utf8');

function pos(text, token){
  const i = text.indexOf(token);
  assert.notEqual(i, -1, `deve conter ${token}`);
  return i;
}

test('hero comunica resultado e oferece dois caminhos claros', () => {
  assert.match(html, /id="conversionHero"/);
  assert.match(html, /O timbre de baixos premium direto na sua pedaleira\./);
  assert.match(html, />Ver os timbres</);
  assert.match(html, />Testar meu baixo grátis</);
});

test('prova social aparece antes do catálogo completo', () => {
  assert.ok(pos(html, 'id="feedbacks-reais"') < pos(html, 'id="produtos"'));
});
test('navegação por perfil de timbre está disponível', () => {
  assert.match(html, /id="toneNavigator"/);
  for (const label of ['Todos','Vintage','Modernos','Hi-Fi','Punch\/Slap']) {
    assert.match(html, new RegExp(`>${label}<`));
  }
  assert.match(store, /data-tone-profile/);
  assert.match(store, /data-tone-filter/);
});

test('cards priorizam preço, CTA de teste e vídeos reativados', () => {
  assert.match(store, /if\(p\.video\)\{/);
  assert.match(store, /<button class="video-btn" data-video="\$\{p\.video\}">/);
  assert.match(store, /openVideo\(videoBtn\.getAttribute\("data-video"\)\)/);
  assert.match(store, /🎸 Testar meu baixo grátis/);
  assert.ok(pos(store, 'html += priceHtml') < pos(store, '🎸 Testar meu baixo grátis'));
});

test('vídeo principal fica mais compacto no desktop', () => {
  assert.match(html, /\.tb-sales-video-stage\{[^}]*width:min\(100%,330px\)/s);
});

test('faixa de confiança destaca teste, entrega e pagamento', () => {
  assert.match(html, /id="conversionTrust"/);
  assert.match(html, /Teste grátis com seu próprio baixo/);
  assert.match(html, /Entrega digital/);
  assert.match(html, /PIX e Cartão/);
  assert.match(html, /Suporte pós-venda/);
});
test('cards liberados por cronômetro mostram preço antes da compra', () => {
  const countdownBlock = store.match(/if\(diff <= 0\)\{([\s\S]*?)el\.outerHTML = out/);
  assert.ok(countdownBlock, 'bloco do cronômetro deve existir');
  assert.ok(pos(countdownBlock[1], 'price-wrap') < pos(countdownBlock[1], 'buy-btn'));
});

test('hero de conversão não usa classe capturada pelo seletor legado class*=hero', () => {
  const hero = html.match(/<section id="conversionHero"([^>]*)>/);
  assert.ok(hero);
  assert.doesNotMatch(hero[1], /class="[^"]*hero/i);
});

test('campanha TrackPilot adapta o novo hero sem texto de IR', () => {
  assert.match(store, /conversionHero/);
  assert.match(store, /Automação inteligente para REAPER/);
});

test('campanha TrackPilot oculta blocos exclusivos de IR', () => {
  assert.match(store, /conversionTrust/);
  assert.match(store, /toneNavigator/);
  assert.match(store, /style\.display\s*=\s*"none"/);
});

test('campanha TrackPilot não exibe o vídeo de apresentação exclusivo dos IRs', () => {
  assert.match(store, /tb-sales-video/);
});

test('pixels existentes permanecem preservados', () => {
  assert.match(html, /1147738740851849/);
  assert.match(html, /6a1f37d4b460776ed0169286/);
});

test('feedbacks empilhados aparecem antes do vídeo e dos filtros', () => {
  const feedbacks = pos(html, 'id="feedbacks-reais"');
  const video = pos(html, 'class="tb-sales-video"');
  const tones = pos(html, 'id="toneNavigator"');
  assert.ok(feedbacks < video && video < tones);
});

test('feedbacks usam uma pilha única clicável com as três capturas reais', () => {
  assert.match(html, /id="tbFeedbackStack"/);
  const cards = html.match(/class="tb-feedback-stack-card/g) || [];
  assert.equal(cards.length, 3);
  for (const n of [1,2,3]) assert.match(html, new RegExp(`/assets/feedbacks/feedback-${n}\\.png`));
});

test('galeria de feedbacks oferece navegação e gesto móvel', () => {
  assert.match(html, /id="tbFeedbackPrev"/);
  assert.match(html, /id="tbFeedbackNext"/);
  assert.match(html, /id="tbFeedbackCounter"/);
  assert.match(html, /touchstart/);
  assert.match(html, /touchend/);
});
