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

let carrinho = JSON.parse(localStorage.getItem("cart") || "[]");

const count = document.getElementById("count");
const grid = document.getElementById("produtos");
const modal = document.getElementById("cartModal");
const lista = document.getElementById("cartItems");
const total = document.getElementById("cartTotal");

function atualizar() {
  count.innerText = carrinho.length;
  lista.innerHTML = "";
  let soma = 0;

  carrinho.forEach((p,i)=>{
    soma += p.preco;
    const li = document.createElement("li");
    li.innerHTML = `${p.nome} — R$ ${p.preco.toFixed(2).replace(".",",")}
      <button onclick="remover(${i})">✖</button>`;
    lista.appendChild(li);
  });

  total.innerText = "R$ " + soma.toFixed(2).replace(".",",");
}

produtos.forEach(p=>{
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <h3>${p.nome}</h3>
    <div class="price">R$ ${p.preco.toFixed(2).replace(".",",")}</div>
    <button onclick="add('${p.id}')">Adicionar ao carrinho</button>
  `;
  grid.appendChild(div);
});

function add(id){
  const p = produtos.find(x=>x.id===id);
  carrinho.push(p);
  salvar();
  alert("Produto adicionado ao carrinho");
}

function remover(i){
  carrinho.splice(i,1);
  salvar();
}

function salvar(){
  localStorage.setItem("cart",JSON.stringify(carrinho));
  atualizar();
}

function abrirCarrinho(){
  modal.style.display="flex";
}

function fecharCarrinho(){
  modal.style.display="none";
}

function finalizar(){
  if(!carrinho.length) return alert("Carrinho vazio");
  let msg = "🧾 Pedido TB-BASS IR:%0A%0A";
  carrinho.forEach(p=>{
    msg += `• ${p.nome} — R$ ${p.preco.toFixed(2).replace(".",",")}%0A`;
  });
  const soma = carrinho.reduce((t,p)=>t+p.preco,0);
  msg += `%0A💰 Total: R$ ${soma.toFixed(2).replace(".",",")}%0A`;
  msg += `%0AForma de pagamento: PIX ou Cartão`;
  window.open("https://wa.me/5565996716895?text="+msg,"_blank");
}

atualizar();
