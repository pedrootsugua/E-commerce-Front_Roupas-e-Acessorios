document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const pedidoId = urlParams.get('pedidoId');
  if (pedidoId) {
      acessarpedidos(pedidoId);
      console.log(pedidoId);
  }
});

function acessarpedidos(pedidoId) {
  fetch(`http://localhost:8080/api/pedido/listar?id=${pedidoId}`, {
      method: 'GET'
  })
  .then(response => {
      if (!response.ok) {
          throw new Error("Erro ao acessar a API: " + response.statusText);
      }
      return response.json();
  })
  .then(data => {
      let listProduto = document.querySelector("#tabela-pedidos tbody");

      if (!listProduto) {
          throw new Error("Elemento tbody não encontrado.");
      }

      console.log("Dados recebidos da API:", data);

      // Verifique se data é um array e possui elementos
      if (Array.isArray(data) && data.length > 0) {
          listProduto.innerHTML = "";

          data.forEach(pedido => {
              inserirPedido(pedido, listProduto);
          });
      } else {
          console.log("Nenhum pedido encontrado.");
      }
  })
  .catch(error => {
      console.log("Erro: " + error);
  });
}

function inserirPedido(pedido, listProduto) {
  const produto = pedido.id.produtoId;
  const novoPedido = document.createElement('tr');
  novoPedido.innerHTML = `
      <td><img src="${produto.urlImagensModels[0].url}" alt="${produto.nome}" width="50"> ${produto.nome}</td>
      <td>${produto.id}</td>
      <td>${pedido.qtd}</td>
      <td>${pedido.tamanho}</td>
      <td>${produto.marca}</td>
  `;
  listProduto.appendChild(novoPedido);
}
