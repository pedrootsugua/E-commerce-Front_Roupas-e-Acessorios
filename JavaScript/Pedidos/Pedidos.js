document.addEventListener('DOMContentLoaded', function () {
    // Recuperar a string da URL
    var params = new URLSearchParams(window.location.search);
    var userId = params.get('userId');
    let idCart = localStorage.getItem("idPedido");
    let autenticadoPedido = localStorage.getItem("autenticado");
    const isAutenticado = (autenticadoPedido && autenticadoPedido.toLowerCase() === "true");
    console.log(isAutenticado);
  
    if (isAutenticado === true) {
        acessarCarrinhoProduto(idCart);
    } else {
        let pedidoVazio = document.getElementById("empty-cart");
        if (pedidoVazio) {
            pedidoVazio.style.display = "flex";
        }
        let btnFazerLogin = document.getElementById("btn-fazer-login");
        if (btnFazerLogin) {
            btnFazerLogin.style.display = "flex";
        }
    }

    document.querySelector('.botao-cont').addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        // Enviar a string para a outra tela como parâmetro na URL
        window.location.href = 'TelaCheckout.html?userId=' + userId;
    });
});

function inserirPedidos(item, listPedidos, data) {
    const novoPedido = document.createElement('tr');
  
    const produtoHtml = `
      <div class="produto">
        <img src="${item.produtoUrl}" alt="${item.produtoNome}">
        <div class="infos">
          <div class="nomeProd">${item.produtoNome}</div>
          <div class="categoria">${item.categoria}</div>
        </div>
      </div>
    `;
  
    novoPedido.innerHTML = `
      <td>${produtoHtml}</td>
      <td>${item.numeroPedido}</td>
      <td>R$${item.precoUnitario.toFixed(2)}</td>
      <td>${item.formaPagamento}</td>
      <td>R$${item.totalPedido.toFixed(2)}</td>
    `;
  
    // Adiciona o novo pedido à lista de pedidos
    listPedidos.appendChild(novoPedido);
}
