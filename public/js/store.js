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
 }
];

const grid = document.getElementById("produtos");

produtos.forEach(p=>{
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h3>${p.nome}</h3>
    <p>${p.desc}</p>
    <b>R$ ${p.preco.toFixed(2).replace(".",",")}</b><br>
    <button onclick="window.location.href='${p.link}'">Pagar com PIX</button>
  `;
  grid.appendChild(card);
});
