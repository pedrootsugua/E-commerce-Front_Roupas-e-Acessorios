document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const pedidoId = urlParams.get('pedidoId');
    if (pedidoId) {
        acessarpedidos(pedidoId);
        console.log("1");
    }
})
function acessarpedidos(pedidoId) {
    fetch('http://localhost:8080/api/pedido/'+pedidoId, {
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
            // Para cada pedido, iterar sobre os produtos
            pedido.pedidoProdutoModel.forEach((item) => {
              inserirPedido(item, listProduto, pedido);
            });
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
      <td>
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