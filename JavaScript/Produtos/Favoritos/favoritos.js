// document.addEventListener('DOMContentLoaded', function () {
//     // Recuperar a string da URL
//     var params = new URLSearchParams(window.location.search);
//     var mensagem = params.get('mensagem');
//     acessarApiFavoritos(mensagem);

// });
// // URL da API que você deseja acessar
// function acessarApiFavoritos(categoria) {
//     let apiUrl = 'http://localhost:8080/api/produtos?category=' + categoria;
//     const request1 = fetch(apiUrl, {
//         method: 'GET'
//     })
//         .then(response => {
//             // Verifique se a solicitação foi bem-sucedida (status 200)
//             if (!response.ok) {
//                 throw new Error('Erro ao acessar a API: ' + response.statusText);
//             }
//             // Parseie os dados da resposta JSON
//             return response.json();
//         })
//         .then(data => {
//             // Seleciona a lista de produtos
//             var listaProdutos = document.querySelector(".linha");
//             var listaProdutos2 = document.querySelector(".linha2");
//             var listaProdutos3 = document.querySelector(".linha3");
//             var listaProdutos4 = document.querySelector(".linha4");
//             // Limpa a lista de produtos antes de adicionar os novos
//             listaProdutos.innerHTML = "";
//             listaProdutos2.innerHTML = "";
//             listaProdutos3.innerHTML = "";
//             listaProdutos4.innerHTML = "";

//             console.log(data.urlImagensModels);

//             // Itere sobre cada item na lista
//             data.forEach((item, index) => {
//                 if (index <= 2) { // Apenas os primeiros 3 itens
//                     exibirProdutosFavoritos(item, listaProdutos);
//                 } else if (index <= 5) {
//                     exibirProdutosFavoritos(item, listaProdutos2);
//                 } else if (index <= 8) {
//                     exibirProdutosFavoritos(item, listaProdutos3);
//                 } else {
//                     exibirProdutosFavoritos(item, listaProdutos4);
//                 }
//             });

//             novoProduto.innerHTML = `
//             <div class="carrinho-vazio" id="empty-cart">
//             <h2>SEU CARRINHO ESTÁ VAZIO</h2>
//             <img src="img/carrinho_vazio.png" alt="Icone carrinho vazio">

//                 <div id="btn-voltar-inicio">
//                     <a href="TelaInicial.html">
//                         <button class="animated-button">
//                             <span>Voltar para o inicio</span>
//                             <span></span>
//                         </button>
//                     </a>
//                 </div>

//                 <div id="btn-fazer-login">
//                     <a href="TelaLogin.html">
//                         <button class="animated-button">
//                             <span>Fazer login</span>
//                             <span></span>
//                         </button>
//                     </a>
//                 </div>
//         </div>
//                     `;
//         })
//         .catch(error => {
//             // Trate os erros que possam ocorrer durante a solicitação
//             console.error(error);
//         });

//     function exibirProdutosFavoritos(item, listaProdutos) {
//         const urls = item.urlImagensModels; // Array de URLs
//         console.log(urls);
//         // Cria um novo elemento de produto
//         const novoProduto = document.createElement('li');
//         novoProduto.classList.add('prod');
//         // Define o conteúdo HTML do novo produto
//         novoProduto.innerHTML = `
//         <a id='${item.id}' class="link_produto" href="DetalheProduto.html?produtoId=${item.id}">                            <img class="imgProduto" src="${urls[0].url}" alt="">
//                             <div class="cora">
//                                 <span class="text_produto">${item.nome}</span>
//                                 <label class="container-fav">
//                                     <input type="checkbox" checked>
//                                     <svg id="Layer_1" version="1.0" viewBox="0 0 24 24" xml:space="preserve"
//                                         xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
//                                         <path
//                                             d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z">
//                                         </path>
//                                     </svg>
//                                 </label>
//                             </div>
//                             <p class="preco">R$ ${item.preco}</p>
//                         </a>
//                     `;
//         // Adiciona o novo produto à lista de produtos
//         listaProdutos.appendChild(novoProduto);
//     }
// }