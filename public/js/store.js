const produtos = [
 {id:"bassmods",nome:"Bass Mods IR",preco:49},
 {id:"fender",nome:"Fender Ultra IR",preco:49},
 {id:"musicman",nome:"Music Man IR",preco:49},
 {id:"sadowskym5",nome:"Sadowsky M5 IR",preco:49},
 {id:"metro",nome:"Sadowsky Metroline IR",preco:39},
 {id:"kensmith",nome:"Ken Smith IR",preco:69},
 {id:"warwick",nome:"Warwick Corvette IR",preco:69},
 {id:"mayones",nome:"Mayones Jabba 5 IR",preco:89}
];

let carrinho = JSON.parse(localStorage.getItem("cart")||"[]");
document.getElementById("count").innerText = carrinho.length;

const grid = document.getElementById("produtos");

produtos.forEach(p=>{
  const div = document.createElement("div");
  div.className="card";
  div.innerHTML = `
    <h3>${p.nome}</h3>
    <div class="price">R$ ${p.preco.toFixed(2).replace(".",",")}</div>
    <button class="btn" onclick="add('${p.id}')">Adicionar ao carrinho</button>
  `;
  grid.appendChild(div);
});

function add(id){
 const p = produtos.find(x=>x.id==id);
 carrinho.push(p);
 localStorage.setItem("cart",JSON.stringify(carrinho));
 document.getElementById("count").innerText = carrinho.length;
 alert("Produto adicionado ao carrinho");
}
