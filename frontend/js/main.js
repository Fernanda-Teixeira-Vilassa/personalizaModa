/* ===== Produtos disponíveis ===== */
const produtos = [
  { id: 1, nome: "Camisas Personalizadas", preco: 79.90, imagem: "images/camisa-personalizada.png", link: "camiseta.html", categoria: "camisas" },
  { id: 2, nome: "Vestidos Personalizados", preco: 149.90, imagem: "images/vestido-personalizado.png", link: "vestido.html", categoria: "vestidos" },
  { id: 3, nome: "Tapetes de Crochê", preco: 129.90, imagem: "images/tapete-croche.png", link: "tapete.html", categoria: "croche" },
  { id: 4, nome: "Bolsas de Crochê", preco: 99.90, imagem: "images/bolsa-croche.png", link: "bolsa.html", categoria: "croche" },
  { id: 5, nome: "Roupas de Crochê", preco: 159.90, imagem: "images/roupa-croche.png", link: "roupa.html", categoria: "croche" },
  { id: 6, nome: "Toalhas de banho Bordadas", preco: 89.90, imagem: "images/toalha-bordada.png", link: "toalha.html", categoria: "bordado" },
  { id: 7, nome: "Panos de Prato Bordados", preco: 49.90, imagem: "images/pano-prato-bordado.jpg", link: "pano-prato.html", categoria: "bordado" },
  { id: 8, nome: "Toalhas de Mesa Bordadas", preco: 179.90, imagem: "images/toalha-mesa-bordada.png", link: "toalha-mesa.html", categoria: "bordado" },
  { id: 9, nome: "Bijuterias", preco: 9.90, imagem: "images/bijuterias.png", link: "bijuterias.html", categoria: "bijuterias" }
];

/* ===== Carregar produtos no index.html ===== */
const produtosGrid = document.getElementById('produtos-grid');
if(produtosGrid){
  produtos.forEach(produto => {
    const card = document.createElement('div');
    card.className = 'card';
    card.addEventListener('click', () => { window.location.href = produto.link; });

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button onclick="addToCart(${produto.id}, event)">Adicionar ao Carrinho</button>
    `;
    produtosGrid.appendChild(card);
  });
}

/* ===== Adicionar ao carrinho ===== */
function addToCart(id, event) {
  event.stopPropagation();
  const produto = produtos.find(p => p.id === id);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Verifica se produto já existe no carrinho (sem customizações)
  const indexExistente = cart.findIndex(item => item.id === produto.id && Object.keys(item.customizations).length === 0);

  if(indexExistente > -1){
    cart[indexExistente].quantity += 1;
  } else {
    cart.push({ ...produto, quantity: 1, customizations: {} });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${produto.nome} adicionado ao carrinho!`);
}
