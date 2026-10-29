import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const obrigadoHtml = fs.readFileSync(path.join(root, 'public', 'obrigado', 'index.html'), 'utf8');

test('página de obrigado contém o módulo opt-in oficial do Google Customer Reviews', () => {
  assert.match(obrigadoHtml, /apis\.google\.com\/js\/platform\.js\?onload=renderOptIn/);
  assert.match(obrigadoHtml, /"merchant_id":\s*5884867589/);
  assert.match(obrigadoHtml, /"delivery_country":\s*"BR"/);
  assert.match(obrigadoHtml, /estimated_delivery_date/);
  assert.match(obrigadoHtml, /surveyoptin\.render/);
});

test('página de obrigado preserva privacidade e rastreamento de conversão', () => {
  assert.match(obrigadoHtml, /<meta name="robots" content="noindex,nofollow">/);
  assert.match(obrigadoHtml, /googletagmanager\.com\/gtag\/js\?id=G-FNRVG1V5MC/);
  assert.match(obrigadoHtml, /1147738740851849/);
  assert.match(obrigadoHtml, /'track',\s*'Purchase'/);
});
