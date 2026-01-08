const produtos = [
 {
  nome:"Bass Mods IR",
  preco:49,
  link:"https://mpago.la/1cvainu",
  desc:"Grave definido, ataque rápido e presença moderna."
 },
 {
  nome:"Fender Ultra 2 IR",
  preco:49,
  link:"https://mpago.la/1pqvu5J",
  desc:"Timbre limpo, quente e equilibrado para grooves e slap."
 },
 {
  nome:"Sadowsky M5 IR",
  preco:49,
  link:"https://mpago.la/2nGQqmt",
  desc:"Grave cheio, médios polidos e definição premium."
 },
 {
  nome:"Sadowsky Metroline IR",
  preco:39,
  link:"https://pagamento.sejaefi.com.br/42719b9c-8306-46ab-af6a-b8fac28e5c79",
  desc:"Timbre clássico, suave e musical."
 },
 {
  nome:"Warwick Pro Series Corvette IR",
  preco:69,
  link:"https://mpago.la/234okPL",
  desc:"Timbre pesado, médio encorpado e ataque metálico."
 },
 {
  nome:"Ken Smith IR",
  preco:69,
  link:"https://mpago.la/1WpXcYY",
  desc:"Resposta hi-fi, ultra definição e sustain perfeito."
 },
 {
  nome:"Mayones Jabba 5 IR",
  preco:89,
  link:null,
  desc:"Flagship: profundo, cristalino e profissional.",
  status:"LANÇAMENTO EM BREVE"
 }
];

const grid = document.getElementById("produtos");

produtos.forEach(p=>{
  const card = document.createElement("div");
  card.className = "card";

  let botao = p.link
    ? `<button onclick="window.location.href='${p.link}'">Comprar agora</button>`
    : `<div style="margin-top:10px;font-weight:bold;color:#ffb300">${p.status}</div>`;

  card.innerHTML = `
    <h3>${p.nome}</h3>
    <p>${p.desc}</p>
    <b>R$ ${p.preco.toFixed(2).replace(".",",")}</b><br>
    ${botao}
  `;
  grid.appendChild(card);
});
