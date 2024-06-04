document.addEventListener('DOMContentLoaded', function () {
    // Recuperar a string da URL
    var params = new URLSearchParams(window.location.search);
    var userIdFavorito = params.get('userId');
    let autenticadoFavorito = localStorage.getItem("autenticado");
    const isAutenticado = (autenticadoFavorito.toLowerCase() === "true")
    console.log(isAutenticado);

    if (isAutenticado === true) {
        acessarApiFavoritos(userIdFavorito);
    } else {
        let filtro = document.querySelector('.container-filtro');
        filtro.style.display = "none";
        let favoritosVazio = document.getElementById("empty-fav");
        favoritosVazio.style.display = "flex";
        let btnFazerLogin = document.getElementById("btn-fazer-login");
        btnFazerLogin.style.display = "flex";
    }
});
// URL da API que você deseja acessar
function acessarApiFavoritos(userIdFavorito) {
    let apiUrl = 'http://localhost:8080/api/favoritos/buscar?id=' + userIdFavorito;
    const request1 = fetch(apiUrl, {
        method: 'GET'
    })
        .then(response => {
            // Verifique se a solicitação foi bem-sucedida (status 200)
            if (!response.ok) {
                throw new Error('Erro ao acessar a API: ' + response.statusText);
            }
            // Parseie os dados da resposta JSON
            return response.json();
        })
        .then(data => {
            // Seleciona a lista de produtos
            var listaProdutos = document.querySelector(".linha");
            var listaProdutos2 = document.querySelector(".linha2");
            var listaProdutos3 = document.querySelector(".linha3");
            var listaProdutos4 = document.querySelector(".linha4");
            // Limpa a lista de produtos antes de adicionar os novos
            listaProdutos.innerHTML = "";
            listaProdutos2.innerHTML = "";
            listaProdutos3.innerHTML = "";
            listaProdutos4.innerHTML = "";

            // Verifica se a lista de favoritos está vazia
            if (Array.isArray(data) && data.length === 0) {
                let filtro = document.querySelector('.container-filtro');
                filtro.style.display = "none";
                let favoritosVazio = document.getElementById("empty-fav");
                favoritosVazio.style.display = "flex";
                let btnVerProdutos = document.getElementById("btn-ver-produtos");
                btnVerProdutos.style.display = "flex";
                return; // Sai da função se a lista estiver vazia
            }

            // Itere sobre cada item na lista
            data.forEach((item, index) => {
                if (index <= 2) { // Apenas os primeiros 3 itens
                    exibirProdutosFavoritos(item, listaProdutos, userIdFavorito);
                } else if (index <= 5) {
                    exibirProdutosFavoritos(item, listaProdutos2, userIdFavorito);
                } else if (index <= 8) {
                    exibirProdutosFavoritos(item, listaProdutos3, userIdFavorito);
                } else {
                    exibirProdutosFavoritos(item, listaProdutos4, userIdFavorito);
                }
            });
        })
        .catch(error => {
            // Trate os erros que possam ocorrer durante a solicitação
            console.error(error);
        });

    function exibirProdutosFavoritos(item, listaProdutos, userIdFavorito) {
        const urls = item.urlImagensModels; // Array de URLs
        // Cria um novo elemento de produto
        const novoProduto = document.createElement('li');
        novoProduto.classList.add('prod');
        // Define o conteúdo HTML do novo produto
        novoProduto.innerHTML = `
        <a id='${item.id}' class="link_produto" href="DetalheProduto.html?produtoId=${item.id}"> <img
                                class="imgProduto" src="${urls[0].url}" alt="">
                            <div class="cora">
                                <span class="text_produto">${item.nome}</span>
                                <label class="container-fav">
                                    <input type="checkbox" checked>
                                    <svg id="Layer_1" version="1.0" viewBox="0 0 24 24" xml:space="preserve"
                                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <path
                                            d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z">
                                        </path>
                                    </svg>
                                </label>
                            </div>
                            <p class="preco">R$ ${item.preco}</p>
                        </a>
                    `;

        novoProduto.querySelectorAll('.container-fav input').forEach(function (input) {
            input.addEventListener('change', function () {
                if (!this.checked) {
                    favorito = {
                        usuarioId: userIdFavorito,
                        produtoId: item.id
                    }
                    deleteProdutoCarrinho(favorito)
                }
            });
        });
        // Adiciona o novo produto à lista de produtos
        listaProdutos.appendChild(novoProduto);
    }
}

function deleteProdutoCarrinho(favorito) {
    fetch(`http://localhost:8080/api/favoritos/deletar`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(favorito)
    })
        .then(response => {
            alert("Produto removido dos favoritos!")
            location.reload();
        })
        .catch(error => {
            console.log("Erro: " + error);
        })
}