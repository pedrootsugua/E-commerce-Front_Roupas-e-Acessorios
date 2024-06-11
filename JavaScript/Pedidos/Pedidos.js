document.addEventListener('DOMContentLoaded', function () {
  let idUsuario = localStorage.getItem("IdUsuario");
  let autenticadoPedido = localStorage.getItem("autenticado");
  const isAutenticado = (autenticadoPedido && autenticadoPedido.toLowerCase() === "true");
  console.log(isAutenticado);

  if (isAutenticado) {
    acessarpedidos(idUsuario);
  } else {
    let pedidoVazio = document.getElementById("empty-order");
    pedidoVazio.style.display = "flex";
    let btnFazerLogin = document.getElementById("btn-fazer-login");
    btnFazerLogin.style.display = "flex";
  }

  let botaoCont = document.querySelector('.botao-cont');
  if (botaoCont) {
    botaoCont.addEventListener('click', function (event) {
      event.preventDefault(); // Evita o comportamento padrão do formulário
      // Enviar a string para a outra tela como parâmetro na URL
      let userId = localStorage.getItem("IdUsuario"); // Supondo que você esteja armazenando o userId no localStorage
      window.location.href = 'TelaCheckout.html?userId=' + userId;
    });
  }
});

// Exemplo de dados de pedidos (substituir com dados reais)
function acessarpedidos(idUsuario) {
  fetch(`http://localhost:8080/api/pedido/` + idUsuario, {
    method: 'GET'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao acessar a API: " + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      let semPedidos = document.getElementById("empty-order");
      let comPedidos = document.querySelector(".content");
      let Titulo = document.querySelector(".Titulo");

      let listaPedidos = data.length;
      console.log("Quantidade de pedidos: " + listaPedidos);
      const tipo = data.tipoEnvio;
      let listProduto = document.querySelector("#tabela-pedidos");
      if (listaPedidos !== 0) {
        Titulo.style.display = "block"
        comPedidos.style.display = "flex"; 
        listProduto.innerHTML = "";

        data.forEach((pedido) => {
          // Pegar apenas o primeiro item de cada pedido
          const primeiroItem = pedido.pedidoProdutoModel[0];
          inserirPedido(primeiroItem, listProduto, pedido);
        });
      } else {
        semPedidos.style.display = "flex";
        let btnVoltarInicio = document.getElementById("btn-voltar-inicio");
        btnVoltarInicio.style.display = "flex";
      }
    })
    .catch(error => {
      console.log("Erro: " + error);
    });
}


function inserirPedido(item, listProduto, pedido) {
  const novoPedido = document.createElement('tr');
  let dataFormatada = pedido.dataPedido.substring(0, 10);
  novoPedido.innerHTML = `
    <td class="pedido-item" data-pedido-id="${pedido.id}">
      <div class="produto">
        <img src="${item.id.produtoId.urlImagensModels[0].url}" alt="${item.id.produtoId.nome}">
        <div class="infos">
          <div>${item.id.produtoId.nome}</div>
          <div class="categoria">${item.id.produtoId.categoria}</div>
        </div>
      </div>
    </td>
    <td>${pedido.id}</td>
    <td>${dataFormatada}</td>
    <td>${pedido.formaPagamento}</td>
    <td><span id="total-pedido">R$ ${pedido.totalPedido}</span></td>
  `;
  listProduto.appendChild(novoPedido);
}

