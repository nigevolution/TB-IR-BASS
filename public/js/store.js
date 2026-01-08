const produtos = [
 {id:"bassmods",nome:"Bass Mods IR",preco:49,desc:"Grave definido, ataque rápido e presença moderna."},
 {id:"fender",nome:"Fender Ultra IR",preco:49,desc:"Timbre limpo, quente e equilibrado para grooves e slap."},
 {id:"musicman",nome:"Music Man IR",preco:49,desc:"Médio agressivo, punch moderno e resposta dinâmica."},
 {id:"sadowskym5",nome:"Sadowsky M5 IR",preco:49,desc:"Grave cheio, médios polidos e definição premium."},
 {id:"metro",nome:"Sadowsky Metroline IR",preco:39,desc:"Timbre clássico, suave e musical."},
 {id:"kensmith",nome:"Ken Smith IR",preco:69,desc:"Resposta hi-fi, ultra definição e sustain perfeito."},
 {id:"warwick",nome:"Warwick Corvette IR",preco:69,desc:"Timbre pesado, médio encorpado e ataque metálico."},
 {id:"mayones",nome:"Mayones Jabba 5 IR",preco:89,desc:"Flagship: profundo, cristalino e profissional."}
];

let carrinho = JSON.parse(localStorage.getItem("cart")||"[]");
const grid = document.getElementById("produtos");
const count = document.getElementById("count");

function render(){
  grid.innerHTML="";
  count.innerText=carrinho.length;

  produtos.forEach(p=>{
    const div=document.createElement("div");
    div.className="card";
    div.innerHTML=`
      <h3>${p.nome}</h3>
      <p class="desc">${p.desc}</p>
      <div class="price">R$ ${p.preco.toFixed(2).replace(".",",")}</div>
      <button onclick="add('${p.id}')">Adicionar ao carrinho</button>
    `;
    grid.appendChild(div);
  });
}

function add(id){
 const p=produtos.find(x=>x.id==id);
 carrinho.push(p);
 localStorage.setItem("cart",JSON.stringify(carrinho));
 render();
}

render();
