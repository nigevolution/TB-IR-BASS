const MP_LINK = "https://link.mercadopago.com.br/tbbassir";

const produtos = [
  { nome:"Bass Mods IR", preco:49, desc:"Grave definido, ataque rápido e presença moderna."},
  { nome:"Fender Ultra IR", preco:49, desc:"Timbre limpo, quente e equilibrado para grooves e slap."},
  { nome:"Music Man IR", preco:49, desc:"Médio agressivo, punch moderno e resposta dinâmica."},
  { nome:"Sadowsky M5 IR", preco:49, desc:"Grave cheio, médios polidos e definição premium."},
  { nome:"Sadowsky Metroline IR", preco:39, desc:"Timbre clássico, suave e musical."},
  { nome:"Ken Smith IR", preco:69, desc:"Resposta hi-fi, ultra definição e sustain perfeito."},
  { nome:"Warwick Corvette IR", preco:69, desc:"Timbre pesado, médio encorpado e ataque metálico."},
  { nome:"Mayones Jabba 5 IR", preco:89, desc:"Flagship: profundo, cristalino e profissional."}
];

const grid = document.getElementById("produtos");

produtos.forEach(p=>{
  const d=document.createElement("div");
  d.className="card";
  d.innerHTML=`
    <h3>${p.nome}</h3>
    <p>${p.desc}</p>
    <b>R$ ${p.preco.toFixed(2).replace(".",",")}</b><br>
    <button onclick="pagar('${p.nome}',${p.preco})">Pagar com PIX</button>
  `;
  grid.appendChild(d);
});

function pagar(nome,valor){
  const url = MP_LINK +
    "?amount=" + valor.toFixed(2) +
    "&description=" + encodeURIComponent(nome) +
    "&external_reference=" + encodeURIComponent(nome+"-"+Date.now());

  window.open(url,"_blank");
}
