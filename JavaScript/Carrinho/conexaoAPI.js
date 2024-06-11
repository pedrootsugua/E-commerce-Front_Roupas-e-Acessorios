document.addEventListener('DOMContentLoaded', function () {

  let idCart = localStorage.getItem("idCarrinho");
  let autenticadoCarrinho = localStorage.getItem("autenticado");
  const isAutenticado = (autenticadoCarrinho.toLowerCase() === "true")

  if (isAutenticado === true) {
    acessarCarrinhoProduto(idCart);
  } else {
    let carrinhoVazio = document.getElementById("empty-cart");
    carrinhoVazio.style.display = "flex";
    let btnFazerLogin = document.getElementById("btn-fazer-login");
    btnFazerLogin.style.display = "flex";
  }
});

function acessarCarrinhoProduto(idCart) {
  fetch(`http://localhost:8080/api/carrinho/` + idCart, {
    method: 'GET'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao acessar a API: " + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      let carrinhoVazio = document.getElementById("empty-cart");
      let carrinhoComProduto = document.getElementById("product-cart");

      let listaProdutos = data.quantidadeItens;
      console.log("qtd itens" + listaProdutos);
      if (listaProdutos != 0) {
        carrinhoComProduto.style.display = "flex";
        let listProduto = document.querySelector(".produtos-carrinho");
        listProduto.innerHTML = "";
        data.carrinhoProdutoModel.forEach((item) => {
          inserirProdutosCarrinho(item, listProduto, data);
        });
      } else {
        carrinhoVazio.style.display = "flex";
        let btnVoltarInicio = document.getElementById("btn-voltar-inicio");
        btnVoltarInicio.style.display = "flex";
      }
    })
    .catch(error => {
      console.log("Erro: " + error);
    })
}

let valorTotalCarrinho = 0;
function inserirProdutosCarrinho(item, listProduto, data) {
  const urls = item.id.produtoId.urlImagensModels; // Array de URLs
  const novoProduto = document.createElement('div');
  novoProduto.classList.add('produto');

  // novoProduto.setAttribute("prod-id", item.id.produtoId.id);
  // novoProduto.setAttribute("tamanho-prod", item.tamanho);

  let valorTotal = item.id.produtoId.preco * item.qtd;
  let valorTotalFormatado = valorTotal.toFixed(2); //formatando valor total do pedido
  valorTotalCarrinho += valorTotal;

  novoProduto.innerHTML = `
    <div class="descricao-produto">
          <img src="${urls[0].url}" alt="Imagem-produto">
          <section class="info-protuto">
            <p>${item.id.produtoId.nome}</p>
            <p>Tamanho: ${item.tamanho}</p>
          </section>
        </div>
        <div class="quantidade">
          <button class="btn-remove-item">-</button>
          <p id="num-qtd">${item.qtd}</p>
          <button class="btn-add-item">+</button>
        </div>
        <div class="valor-unitario">
          <p id="vl-unitario">R$ ${item.id.produtoId.preco}</p>
        </div>
        <div class="valor-total">
          <p id="vl-total">R$ ${valorTotalFormatado}</p>
        </div>
        <div class="delete">
          <button class="button-delete">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 14" class="svgIcon bin-top">
              <g clip-path="url(#clip0_35_24)">
                <path fill="black"
                  d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z">
                </path>
              </g>
              <defs>
                <clipPath id="clip0_35_24">
                  <rect fill="white" height="14" width="69"></rect>
                </clipPath>
              </defs>
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 57" class="svgIcon bin-bottom">
              <g clip-path="url(#clip0_35_22)">
                <path fill="black"
                  d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z">
                </path>
              </g>
              <defs>
                <clipPath id="clip0_35_22">
                  <rect fill="white" height="57" width="69"></rect>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
                `;
  
  // Adiciona o novo produto à lista de produtos
  listProduto.appendChild(novoProduto);

  let valorTotalCarrinhoFormatado = valorTotalCarrinho.toFixed(2); //formata o valor total do carrinho
  document.getElementById('valor-produtos').textContent = "R$ " + valorTotalCarrinhoFormatado;
  document.getElementById('valor-total-pedido').textContent = "R$ " + valorTotalCarrinhoFormatado;

  //remover produto do carrinho
  novoProduto.querySelector(".button-delete").addEventListener("click", function () {
    const produto = {
      idCarrinho: data.id,
      idProduto: item.id.produtoId.id,
      tamanho: item.tamanho
    }
    console.log(produto);
    deleteProdutoCarrinho(produto);
  });

  //aumentar quantidade produto
  novoProduto.querySelector(".btn-add-item").addEventListener("click", function () {
    let stringNumero = novoProduto.querySelector("#num-qtd").textContent;
    let numero = parseInt(stringNumero);
    let novaQuantidadeProduto = numero + 1;
    console.log(novaQuantidadeProduto);
    novoProduto.querySelector("#num-qtd").textContent = "" + novaQuantidadeProduto;

    const novaQuantidade = {
      idCarrinho: data.id,
      idProduto: item.id.produtoId.id,
      tamanho: item.tamanho,
      quantidadeProduto: novaQuantidadeProduto
    }

    alterarQuantidadeProduto(novaQuantidade);
  });

  //diminuir quantidade produto
  novoProduto.querySelector(".btn-remove-item").addEventListener("click", function () {
    let stringNumero = novoProduto.querySelector("#num-qtd").textContent;
    let numero = parseInt(stringNumero);
    let novaQuantidadeProduto = numero - 1;
    console.log(novaQuantidadeProduto);
    novoProduto.querySelector("#num-qtd").textContent = "" + novaQuantidadeProduto;

    
    const novaQuantidade = {
      idCarrinho: data.id,
      idProduto: item.id.produtoId.id,
      tamanho: item.tamanho,
      quantidadeProduto: novaQuantidadeProduto
    }

    alterarQuantidadeProduto(novaQuantidade);
  });
}

function deleteProdutoCarrinho(produto) {
  fetch(`http://localhost:8080/api/carrinho`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(produto)
  })
    .then(response => {
      alert("Excluido!")
      location.reload();
    })
    .catch(error => {
      console.log("Erro: " + error);
    })
}

function alterarQuantidadeProduto(novaQuantidade) {
  fetch(`http://localhost:8080/api/carrinho`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(novaQuantidade)
  })
    .then(response => {
      alert("Alterado!")
      location.reload();
    })
    .catch(error => {
      console.log("Erro: " + error);
    })
}