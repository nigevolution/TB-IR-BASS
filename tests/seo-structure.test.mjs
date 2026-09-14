import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const publicDir = path.join(root, 'public');
const read = relative => fs.readFileSync(path.join(publicDir, relative), 'utf8');

const irSlugs = [
  'bass-mods', 'fender-1978', 'fender-ultra-2', 'music-man', 'gl-l2500',
  'sadowsky-m5', 'sadowsky-metroline', 'lakland-ss44-75', 'sadowsky-nyc',
  'fodera', 'swing', 'trb-jp2', 'mayones', 'mtd', 'warwick-corvette',
  'ken-smith', 'kubicki-ex-factor', 'fender-american-elite-2018',
  'fodera-elite-dlx', 'mtd-kingston-zx'
];

test('home exposes core organic SEO metadata', () => {
  const html = read('index.html');
  assert.match(html, /<title>IR para Baixo e Contrabaixo \| TB-BASS IR<\/title>/);
  assert.match(html, /<meta name="description" content="[^"]+">/);
  assert.match(html, /<link rel="canonical" href="https:\/\/tbbassir\.com\.br\/">/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /seoOrganicIntro/);
});

test('robots and sitemap expose the canonical crawl surface', () => {
  const robots = read('robots.txt');
  const sitemap = read('sitemap.xml');
  assert.match(robots, /Sitemap: https:\/\/tbbassir\.com\.br\/sitemap\.xml/);
  assert.match(sitemap, /https:\/\/tbbassir\.com\.br\/ir-para-baixo\//);
  for (const slug of irSlugs) {
    assert.match(sitemap, new RegExp(`https://tbbassir\\.com\\.br/ir/${slug}/`));
  }
});

test('every IR has an indexable product page with Product schema', () => {
  for (const slug of irSlugs) {
    const relative = path.join('ir', slug, 'index.html');
    assert.ok(fs.existsSync(path.join(publicDir, relative)), `${relative} should exist`);
    const html = read(relative);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://tbbassir\\.com\\.br/ir/${slug}/">`));
    assert.match(html, /"@type":"Product"/);
    assert.match(html, /Comprar agora/);
    assert.match(html, /IR para contrabaixo/i);
    assert.doesNotMatch(html, /<video\b/i);
  }
});

test('product SEO stays focused and machine-readable', () => {
  for (const slug of irSlugs) {
    const html = read(path.join('ir', slug, 'index.html'));
    const meta = html.match(/<meta name="description" content="([^"]+)">/);
    assert.ok(meta, `${slug} should expose a meta description`);
    assert.ok(meta[1].length <= 160, `${slug} meta description should stay within 160 chars`);
    assert.match(html, /"seller":\{"@type":"Organization","name":"TB-BASS IR","url":"https:\/\/tbbassir\.com\.br","logo":"https:\/\/tbbassir\.com\.br\/logo\.png"\}/);
    assert.match(html, /Para quem procura .* IR para baixo/i);
    assert.match(html, /Como testar .* IR no seu setup/i);
  }
  const hub = read(path.join('ir-para-baixo', 'index.html'));
  const title = hub.match(/<title>([^<]+)<\/title>/)?.[1] || '';
  assert.ok(title.length <= 60, `hub title should stay within 60 chars, got ${title.length}`);
});

test('TB-BASS points organic social traffic to Silas Instagram without changing home body', () => {
  const instagram = 'https://www.instagram.com/silasmarinhobx/';
  const home = read('index.html');
  assert.match(home, /"@type":"Person"/);
  assert.match(home, /"name":"Silas Marinho"/);
  assert.match(home, /"sameAs":\["https:\/\/www\.instagram\.com\/silasmarinhobx\/"\]/);
  assert.doesNotMatch(home, />Ver @silasmarinhobx no Instagram</);

  const hub = read(path.join('ir-para-baixo', 'index.html'));
  assert.match(hub, new RegExp(instagram.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(hub, /Ver @silasmarinhobx no Instagram/);

  for (const slug of irSlugs) {
    const html = read(path.join('ir', slug, 'index.html'));
    assert.match(html, /https:\/\/www\.instagram\.com\/silasmarinhobx\//);
    assert.match(html, /Ver @silasmarinhobx no Instagram/);
  }
});

test('store cards link to indexable IR detail pages', () => {
  const store = read('js/store.js');
  assert.match(store, /productSeoHref/);
  assert.match(store, /\/ir\/\$\{p\.irId\}\//);
});


test('home exposes a static crawlable path to the IR hub without hidden-link techniques', () => {
  const home = read('index.html');
  const anchor = home.match(/<a\s+href="\/ir-para-baixo\/"[^>]*>IR premium direto na pedaleira • PIX e Cartão<\/a>/)?.[0] || '';
  assert.ok(anchor, 'home should expose a static HTML link to the IR hub');
  assert.doesNotMatch(anchor, /\bhidden\b|aria-hidden=|display\s*:\s*none|visibility\s*:\s*hidden|opacity\s*:\s*0/i);

  const hub = read(path.join('ir-para-baixo', 'index.html'));
  for (const slug of irSlugs) {
    assert.match(hub, new RegExp(`href="/ir/${slug}/"`), `hub should link to ${slug}`);
  }
});


test('Silas IR videos have dedicated indexable watch pages with VideoObject', () => {
  const videos = [
    ['sadowsky-ir-silas-marinho', 'DRSvmm3j6Lj', '2025-11-20'],
    ['ir-para-baixo-silas-marinho', 'DYfoRa5OejJ', '2026-05-18'],
    ['15-opcoes-ir-silas-marinho', 'DXPyY3JDssa', '2026-04-17'],
    ['garanta-seu-ir-silas-marinho', 'DWKTNcejpNj', '2026-03-21']
  ];
  for (const [slug, code, date] of videos) {
    const relative = path.join('videos-ir-para-baixo', slug, 'index.html');
    assert.ok(fs.existsSync(path.join(publicDir, relative)), `${relative} should exist`);
    const page = read(relative);
    assert.match(page, new RegExp(`<link rel="canonical" href="https://tbbassir\\.com\\.br/videos-ir-para-baixo/${slug}/">`));
    assert.match(page, /"@type":"VideoObject"/);
    const title = page.match(/<title>([^<]+)<\/title>/)?.[1] || '';
    assert.ok(title.length <= 60, `${slug} title should stay within 60 chars, got ${title.length}`);
    assert.match(page, /"@id":"https:\/\/tbbassir\.com\.br\/#silas-marinho"/);
    assert.match(page, new RegExp(`https://www\\.instagram\\.com/reel/${code}/embed/`));
    assert.match(page, new RegExp(`https://www\\.instagram\\.com/p/${code}/media/\\?size=l`));
    assert.match(page, new RegExp(`"uploadDate":"${date}"`));
    assert.match(page, new RegExp(`<iframe[^>]+src="https://www\\.instagram\\.com/reel/${code}/embed/"`));
  }
});

test('video discovery is wired through hub, product cluster and video sitemap', () => {
  const hub = read(path.join('ir-para-baixo', 'index.html'));
  assert.match(hub, /Vídeos de IR com Silas Marinho/);
  for (const slug of ['sadowsky-ir-silas-marinho','ir-para-baixo-silas-marinho','15-opcoes-ir-silas-marinho','garanta-seu-ir-silas-marinho']) {
    assert.match(hub, new RegExp(`href="/videos-ir-para-baixo/${slug}/"`));
  }
  for (const slug of ['sadowsky-m5','sadowsky-metroline','sadowsky-nyc']) {
    const page = read(path.join('ir', slug, 'index.html'));
    assert.match(page, /href="\/videos-ir-para-baixo\/sadowsky-ir-silas-marinho\/"/);
  }
  const robots = read('robots.txt');
  assert.match(robots, /Sitemap: https:\/\/tbbassir\.com\.br\/video-sitemap\.xml/);
  const videoSitemap = read('video-sitemap.xml');
  assert.match(videoSitemap, /xmlns:video="http:\/\/www\.google\.com\/schemas\/sitemap-video\/1\.1"/);
  assert.equal((videoSitemap.match(/<video:video>/g) || []).length, 4);
  assert.match(videoSitemap, /https:\/\/tbbassir\.com\.br\/videos-ir-para-baixo\/sadowsky-ir-silas-marinho\//);
  assert.match(videoSitemap, /https:\/\/www\.instagram\.com\/reel\/DRSvmm3j6Lj\/embed\//);
  assert.match(videoSitemap, /https:\/\/www\.instagram\.com\/p\/DRSvmm3j6Lj\/media\/\?size=l/);
  const sitemap = read('sitemap.xml');
  assert.equal((sitemap.match(/videos-ir-para-baixo\//g) || []).length, 4);
});
