  function filtrarProdutos() {
    // Obtém o valor digitado no campo de entrada
    var filtro = document.getElementById('filtro').value.toUpperCase();
    // Obtém a lista de todos os produtos
    var produtos = document.querySelectorAll('.prod');

    // Itera sobre cada produto na lista
    for (var i = 0; i < produtos.length; i++) {
      var produto = produtos[i];
      // Obtém o texto dentro do elemento span com a classe "text_tenis" (ou o nome da classe que contém o nome do produto)
      var textoProduto = produto.querySelector('.text_produto').innerText.toUpperCase();
      // Verifica se o texto do produto corresponde ao filtro digitado
      if (textoProduto.indexOf(filtro) > -1) {
        // Se corresponder, mostra o produto
        produto.style.display = "";
      } else {
        // Caso contrário, esconde o produto
        produto.style.display = "none";
      }
    }
  }

