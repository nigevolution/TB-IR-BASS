<style>
body{
  margin:0;
  font-family:Arial;
  background:#000;
  color:#fff;
}

/* fundo com logo gigante */
#bg-logo{
  position:fixed;
  top:0; left:0;
  width:100%;
  height:100%;
  background:url("logo.png") center/contain no-repeat;
  opacity:0.15;
  z-index:0;
  pointer-events:none;
}

/* conteúdo por cima */
#conteudo{
  position:relative;
  z-index:1;
  padding:40px;
  text-align:center;
}

/* cards */
.grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
  gap:25px;
  max-width:1100px;
  margin:40px auto;
}

.card{
  background:rgba(0,0,0,0.85);
  border:1px solid #ff7a00;
  border-radius:18px;
  padding:25px;
  box-shadow:0 0 20px rgba(255,120,0,0.3);
}

.card h3{color:#ff7a00}
.price{font-size:22px;margin:10px 0}
.card button{
  background:#ff7a00;
  color:#000;
  border:none;
  border-radius:10px;
  padding:10px 22px;
  cursor:pointer;
}

.topbar{
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.cart{
  background:#ff7a00;
  padding:10px 18px;
  border-radius:14px;
  font-weight:bold;
}
</style>
