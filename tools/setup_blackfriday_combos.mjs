import fs from 'fs';

const CLIENT_ID = 'sWwTp5YDTnhvfYLnEAJhmknUZk7lwvlMulO0VnGm';
const CLIENT_SECRET = 'DpY6U7hcsNyhWOnQ1mmEEwhk65QofpzUs0g9iFGACGIOQrxLUMoyCR4HmgsPZKbsrWGgXzxccOSLxyT6c6KS5P64p76kWoanTG2cTzhTGPQ2yqEV06W5RSKPc38QUwhO';

async function getToken() {
  const res = await fetch('https://api.cakto.com.br/public_api/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET })
  });
  if (!res.ok) throw new Error(`Token error: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.access_token;
}

async function api(endpoint, method = 'GET', body = null, token) {
  const opts = {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`https://api.cakto.com.br/public_api/${endpoint}`, opts);
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API ${method} ${endpoint} failed (${res.status}): ${errText}`);
  }
  return await res.json();
}

async function run() {
  console.log('1. Obtendo token...');
  const token = await getToken();
  console.log('Token obtido com sucesso!');

  console.log('2. Baixando template de checkout do Combo Bass Mods + Fender Ultra II...');
  const templateCheckout = await api('products/ebf69e08-f719-4cf1-8ad9-079d5d76d03b/checkouts/797265/', 'GET', null, token);
  const baseConfig = templateCheckout.config;

  const combosDef = [
    {
      num: 1,
      id: '712d427f-dffc-4013-99a6-5b12b53aaa54',
      shortId: 'Bbq59af',
      name: 'Combo Black Friday 1 - Fender Ultra + Sadowsky',
      subtitle: 'Fender American Ultra Jazz Bass + Sadowsky Metroline Jazz Bass',
      cardPrice: 68.60,
      pixPrice: 58.80,
      defaultOfferId: 'wv2cwb2',
      pixOfferId: 'j4u72kk',
      checkoutId: 1306867,
      items: [
        'TB-BASS IR — Combo Black Friday 1 (Fender Ultra + Sadowsky)',
        'Formatos Inclusos: IR (.WAV 24-bit 44.1/48kHz), AM4Data (Tank-B) e NAM',
        'Fender American Ultra Jazz Bass (Pacote Completo)',
        'Sadowsky Metroline Jazz Bass (Pacote Completo)',
        'Aviso Legal: Arquivos digitais para uso pessoal em pedaleiras e plugins. Envio imediato no e-mail.',
        'Acesso imediato no e-mail cadastrado + Suporte pós-venda TB-BASS'
      ]
    },
    {
      num: 2,
      name: 'Combo Black Friday 2 - Music Man + TRB + Ken Smith',
      subtitle: 'Music Man StingRay + Yamaha TRB JP2 + Ken Smith',
      cardPrice: 165.60,
      pixPrice: 144.90,
      items: [
        'TB-BASS IR — Combo Black Friday 2 (Music Man + TRB + Ken Smith)',
        'Formatos Inclusos: IR (.WAV 24-bit 44.1/48kHz), AM4Data (Tank-B) e NAM',
        'Simulação Music Man StingRay (Pacote Completo)',
        'Simulação Yamaha TRB JP2 John Patitucci (Pacote Completo)',
        'Simulação Ken Smith (Pacote Completo)',
        'Aviso Legal: Arquivos digitais para uso pessoal em pedaleiras e plugins. Envio imediato no e-mail.',
        'Acesso imediato no e-mail cadastrado + Suporte pós-venda TB-BASS'
      ]
    },
    {
      num: 3,
      name: 'Combo Black Friday 3 - MTD + Fodera + Mayones',
      subtitle: 'MTD 535-24 + Fodera Custom + Mayones Jabba Custom',
      cardPrice: 223.76,
      pixPrice: 195.79,
      items: [
        'TB-BASS IR — Combo Black Friday 3 (MTD + Fodera + Mayones)',
        'Formatos Inclusos: IR (.WAV 24-bit 44.1/48kHz), AM4Data (Tank-B) e NAM',
        'Simulação MTD 535-24 (Pacote Completo)',
        'Simulação Fodera Custom (Pacote Completo)',
        'Simulação Mayones Jabba Custom (Pacote Completo)',
        'Aviso Legal: Arquivos digitais para uso pessoal em pedaleiras e plugins. Envio imediato no e-mail.',
        'Acesso imediato no e-mail cadastrado + Suporte pós-venda TB-BASS'
      ]
    },
    {
      num: 4,
      name: 'Combo Black Friday 4 - Bass Mods + Sadowsky M5 + Swing',
      subtitle: 'Bass Mods + Sadowsky NYC M5 + Swing Guitars',
      cardPrice: 173.60,
      pixPrice: 151.90,
      items: [
        'TB-BASS IR — Combo Black Friday 4 (Bass Mods + Sadowsky M5 + Swing)',
        'Formatos Inclusos: IR (.WAV 24-bit 44.1/48kHz), AM4Data (Tank-B) e NAM',
        'Simulação Bass Mods (Pacote Completo)',
        'Simulação Sadowsky NYC M5 (Pacote Completo)',
        'Simulação Swing Guitars (Pacote Completo)',
        'Aviso Legal: Arquivos digitais para uso pessoal em pedaleiras e plugins. Envio imediato no e-mail.',
        'Acesso imediato no e-mail cadastrado + Suporte pós-venda TB-BASS'
      ]
    }
  ];

  const results = [];

  for (const combo of combosDef) {
    console.log(`\n=== PROCESSANDO COMBO ${combo.num}: ${combo.name} ===`);
    let prodId = combo.id;
    let shortId = combo.shortId;
    let defaultOfferId = combo.defaultOfferId;
    let pixOfferId = combo.pixOfferId;
    let checkoutId = combo.checkoutId;

    if (!prodId) {
      console.log(`Criando produto ${combo.name}...`);
      const prodRes = await api('products/', 'POST', {
        name: combo.name,
        description: 'Arquivos digitais: IR (WAV 24-bit), AM4Data (Tank-B) e NAM. Promoção exclusiva Black Friday TB-BASS.',
        price: combo.cardPrice.toFixed(2),
        currency: 'BRL',
        type: 'unique',
        status: 'active',
        salesPage: 'https://tbbassir.com.br',
        paymentMethods: ['pix', 'credit_card', 'picpay', 'applepay', 'googlepay', 'pagaleve', 'multi_card', 'card_pix'],
        contentDeliveries: ['cakto']
      }, token);

      prodId = prodRes.id;
      shortId = prodRes.short_id;
      defaultOfferId = prodRes.offers[0].id;
      checkoutId = prodRes.offers[0].checkout;
      console.log(`Produto criado! ID: ${prodId}, Short ID: ${shortId}, Default Offer: ${defaultOfferId}`);

      console.log(`Criando oferta Pix por R$ ${combo.pixPrice.toFixed(2)}...`);
      const pixOfferRes = await api('offers/', 'POST', {
        name: `${combo.name} (Pix à Vista)`,
        price: combo.pixPrice,
        product: prodId,
        currency: 'BRL',
        units: 1,
        status: 'active',
        type: 'unique',
        intervalType: 'lifetime'
      }, token);

      pixOfferId = pixOfferRes.id;
      console.log(`Oferta Pix criada! ID: ${pixOfferId}`);
    }

    console.log(`Configurando checkout profissional para Combo ${combo.num}...`);
    // Clonar e adaptar config
    const configStr = JSON.stringify(baseConfig);
    const config = JSON.parse(configStr);

    // Ajustar título e subtítulo no mobile e desktop
    const updateComponents = (rows) => {
      for (const row of rows || []) {
        for (const col of row.columns || []) {
          for (const comp of col.components || []) {
            if (comp.type === 'header') {
              comp.attributes.titleText = `${combo.name} — TB-BASS IR`;
              comp.attributes.subtitleText = `${combo.subtitle}. Conteúdo Digital: IR (.WAV), AM4Data (Tank-B) e NAM. Envio imediato.`;
              if (typeof comp.attributes.productImage === 'object' && comp.attributes.productImage !== null) {
                comp.attributes.productImage = comp.attributes.productImage.preview || '';
              }
            }
            if (comp.type === 'list') {
              comp.attributes.items = combo.items.map((it, idx) => ({
                id: `bf-item-${combo.num}-${idx}`,
                text: it
              }));
              comp.attributes.title = 'O que você recebe & Aviso Legal';
            }
          }
        }
      }
    };

    if (config.mobile && config.mobile.rows) updateComponents(config.mobile.rows);
    if (config.desktop && config.desktop.rows) updateComponents(config.desktop.rows);

    await api(`products/${prodId}/checkouts/${checkoutId}/`, 'PUT', {
      name: 'Checkout Black Friday',
      config: config,
      default: true,
      offers: [defaultOfferId, pixOfferId]
    }, token);

    console.log(`Checkout ${checkoutId} configurado com sucesso!`);

    results.push({
      combo: `Combo ${combo.num}`,
      name: combo.name,
      productId: prodId,
      checkoutUrl: `https://pay.cakto.com.br/${shortId}`,
      cartaoLink: `https://pay.cakto.com.br/${defaultOfferId}`,
      cartaoPrice: `R$ ${combo.cardPrice.toFixed(2)}`,
      pixLink: `https://pay.cakto.com.br/${pixOfferId}`,
      pixPrice: `R$ ${combo.pixPrice.toFixed(2)}`
    });
  }

  console.log('\n========================================');
  console.log('TODOS OS COMBOS CRIADOS E CONFIGURADOS:');
  console.log('========================================');
  console.log(JSON.stringify(results, null, 2));

  fs.writeFileSync(
    '/Users/elbsferreiranobre/Documents/TB-IR-BASS-git/tools/blackfriday_combos_created.json',
    JSON.stringify(results, null, 2)
  );
}

run().catch(err => {
  console.error('ERRO FATAL:', err);
  process.exit(1);
});
