// function filtrar(){
//     var input,
//     filter,
//     ul,
//     li,
//     a,
//     i,
//     span,
//     txtValue,
//     count = 0

//     input = document.getElementById('pesquisa');
//     ul = document.getElementById('linha');


//     filter = input.value.toUpperCase();

//     li = ul.getElementsByTagName("li");

//     for(i = 0; i <li.length; i++){
//         a = li[i].getElementsByTagName("a")[0];

//         txtValue =a.textContent || a.innerText;

//         if(txtValue.toUpperCase().indexOf(filter));

//         li[i].style.display = "";
//         count++

//         span = li[i].querySelector(".text_tenis");

//         if(span){
//             span.innerHTML = txtValue.replace(new RegExp(filter, "gi"), (match)=>{
//                 return "<strong>" + match + "<strong>";
//             })
//         }else{

//             li[i].style.display = "none";
//     }

//     }

// }


  function filtrarProdutos() {
    // Obtém o valor digitado no campo de entrada
    var filtro = document.getElementById('filtro').value.toUpperCase();
    // Obtém a lista de todos os produtos
    var produtos = document.querySelectorAll('.prod');

    // Itera sobre cada produto na lista
    for (var i = 0; i < produtos.length; i++) {
      var produto = produtos[i];
      // Obtém o texto dentro do elemento span com a classe "text_tenis" (ou o nome da classe que contém o nome do produto)
      var textoProduto = produto.querySelector('.text_tenis').innerText.toUpperCase();
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

