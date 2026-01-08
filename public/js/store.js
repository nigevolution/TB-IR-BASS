const produtos = [
 {nome:"Bass Mods IR",preco:49,desc:"Grave definido, ataque rápido e presença moderna.",
  pix:"PIX1",cartao:"CARD1",mix:"MIX1"},

 {nome:"Fender Ultra IR",preco:49,desc:"Timbre limpo, quente e equilibrado para grooves e slap.",
  pix:"PIX2",cartao:"CARD2",mix:"MIX2"},

 {nome:"Music Man IR",preco:49,desc:"Médio agressivo, punch moderno e resposta dinâmica.",
  pix:"PIX3",cartao:"CARD3",mix:"MIX3"},

 {nome:"Sadowsky M5 IR",preco:49,desc:"Grave cheio, médios polidos e definição premium.",
  pix:"PIX4",cartao:"CARD4",mix:"MIX4"},

 {nome:"Sadowsky Metroline IR",preco:39,desc:"Timbre clássico, suave e musical.",
  pix:"PIX5",cartao:"CARD5",mix:"MIX5"},

 {nome:"Ken Smith IR",preco:69,desc:"Resposta hi-fi, ultra definição e sustain perfeito.",
  pix:"PIX6",cartao:"CARD6",mix:"MIX6"},

 {nome:"Warwick Corvette IR",preco:69,desc:"Timbre pesado, médio encorpado e ataque metálico.",
  pix:"PIX7",cartao:"CARD7",mix:"MIX7"},

 {nome:"Mayones Jabba 5 IR",preco:89,desc:"Flagship: profundo, cristalino e profissional.",
  pix:"PIX8",cartao:"CARD8",mix:"MIX8"}
];

const grid = document.getElementById("produtos");

produtos.forEach(p=>{
  const div = document.createElement("div");
  div.className="card";
  div.innerHTML = `
    <h3>${p.nome}</h3>
    <p class="desc">${p.desc}</p>
    <div class="price">R$ ${p.preco.toFixed(2).replace(".",",")}</div>
    <div class="paybtns">
      <button class="pix" onclick="window.open('${p.pix}','_blank')">PIX</button>
      <button class="cardbtn" onclick="window.open('${p.cartao}','_blank')">Cartão</button>
      <button class="mix" onclick="window.open('${p.mix}','_blank')">Mix</button>
    </div>
  `;
  grid.appendChild(div);
});
