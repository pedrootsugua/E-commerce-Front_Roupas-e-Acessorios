document.addEventListener('DOMContentLoaded', function () {
    // Recuperar a string da URL
    var params = new URLSearchParams(window.location.search);
    var mensagem = params.get('mensagem');
    var userIdFavorito = params.get('userId');
    acessarapi(mensagem, userIdFavorito);
    // URL da API que você deseja acessar
    function acessarapi(categoria, userIdFavorito) {
        let apiUrl = 'http://localhost:8080/api/produtos?category=' + categoria;
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

                let autenticadoFavorito = localStorage.getItem("autenticado");
                const isAutenticado = (autenticadoFavorito.toLowerCase() === "true")
                console.log(isAutenticado);
                if (isAutenticado === true) {
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
                        .then(produtosFavoritos => {
                            data.forEach((item, index) => {
                                if (index <= 3) { // Apenas os primeiros 4 itens
                                    inserirProdutosFront(item, listaProdutos, userIdFavorito, produtosFavoritos);
                                } else if (index <= 7) {
                                    inserirProdutosFront(item, listaProdutos2, userIdFavorito, produtosFavoritos);
                                } else if (index <= 11) {
                                    inserirProdutosFront(item, listaProdutos3, userIdFavorito, produtosFavoritos);
                                } else {
                                    inserirProdutosFront(item, listaProdutos4, userIdFavorito, produtosFavoritos);
                                }
                            });
                        })
                        .catch(error => {
                            // Trate os erros que possam ocorrer durante a solicitação
                            console.error(error);
                        });
                } else {
                    data.forEach((item, index) => {
                        if (index <= 3) { // Apenas os primeiros 4 itens
                            inserirProdutosFront(item, listaProdutos, userIdFavorito);
                        } else if (index <= 7) {
                            inserirProdutosFront(item, listaProdutos2, userIdFavorito);
                        } else if (index <= 11) {
                            inserirProdutosFront(item, listaProdutos3, userIdFavorito);
                        } else {
                            inserirProdutosFront(item, listaProdutos4, userIdFavorito);
                        }
                    });
                }

            })
            .catch(error => {
                // Trate os erros que possam ocorrer durante a solicitação
                console.error(error);
            });

        function inserirProdutosFront(item, listaProdutos, userIdFavorito, produtosFavoritos) {
            const urls = item.urlImagensModels; // Array de URLs
            // Cria um novo elemento de produto
            const novoProduto = document.createElement('li');
            novoProduto.classList.add('prod');
            let autenticadoFavorito = localStorage.getItem("autenticado");
            const isAutenticado = (autenticadoFavorito.toLowerCase() === "true")
            let isAdmin = false;
            if (isAutenticado === true) {
                let adminProdutos = localStorage.getItem("admin");
                console.log(adminProdutos);
                isAdmin = (adminProdutos.toLowerCase() === "true");
            }
            if (isAdmin === true) {
                // Define o conteúdo HTML do novo produto
                novoProduto.innerHTML = `
                <a id='${item.id}' class="link_produto" href="DetalheProduto.html?produtoId=${item.id}&userId=${userIdFavorito}">                            
                    <img class="imgProduto" src="${item.urlImagensModels && item.urlImagensModels[0] ? item.urlImagensModels[0].url : 'default-image-url'}" alt="">
                </a>
                <div class="cora">
                    <span class="text_produto">${item.nome}</span>
                    <div>
                        <a class="editar-prod" href="TelaEditarProd.html?produtoId=${item.id}">
                            <img src="img/botao-editar.png" alt="Imagem editar">
                        </a>
                        <label class="container-fav">
                            <input type="checkbox">
                            <svg id="Layer_1" version="1.0" viewBox="0 0 24 24" xml:space="preserve"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <path
                                    d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z">
                                </path>
                            </svg>
                        </label>
                    </div>
                </div>
                <p class="preco">R$ ${item.preco}</p>
            `;
            } else {
                novoProduto.innerHTML = `
        <a id='${item.id}' class="link_produto" href="DetalheProduto.html?produtoId=${item.id}&userId=${userIdFavorito}">                           
          <img class="imgProduto" src="${item.urlImagensModels && item.urlImagensModels[0] ? item.urlImagensModels[0].url : 'default-image-url'}" alt="">
                            <div class="cora">
                                <span class="text_produto">${item.nome}</span>
                                <label class="container-fav">
                                    <input type="checkbox">
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
            }
            if (isAutenticado === true) {
                // Itere sobre cada item na lista
                produtosFavoritos.forEach((produtosFavoritosItens) => {
                    console.log(produtosFavoritosItens.id)
                    if (produtosFavoritosItens.id === item.id) {
                        novoProduto.querySelector('input[type="checkbox"]').checked = true;
                    }
                });
                novoProduto.querySelectorAll('.container-fav input').forEach(function (input) {
                    input.addEventListener('change', function () {
                        if (this.checked) {
                            favorito = {
                                usuarioId: userIdFavorito,
                                produtoId: item.id
                            }
                            cadastrarFavorito(favorito);
                        } else {
                            favorito = {
                                usuarioId: userIdFavorito,
                                produtoId: item.id
                            }
                            deleteProdutoFavorito(favorito)
                        }
                    });
                });
            } else {
                novoProduto.querySelectorAll('.container-fav input').forEach(function (input) {
                    input.addEventListener('change', function () {
                        if (this.checked) {
                            openModalFavoritarSemLogin();
                            document.querySelector('.favorito-sem-login').addEventListener('click', function (event) {
                                event.preventDefault(); // Evita o comportamento padrão do formulário
                                window.location.href = "TelaLogin.html";
                            });
                            this.checked = false;
                        }
                    });
                });
            }

            // Adiciona o novo produto à lista de produtos
            listaProdutos.appendChild(novoProduto);
        }

        function cadastrarFavorito(favorito) {
            const request1 = fetch("http://localhost:8080/api/favoritos/cadastrar", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(favorito)
            })
                .then(response => {
                    if (response.status === 201) {
                        openModalFavorito()
                        document.querySelector('.ver-favorito').addEventListener('click', function (event) {
                            event.preventDefault(); // Evita o comportamento padrão do formulário
                            window.location.href = 'TelaFavoritos.html?userId=' + userIdFavorito;;
                        });
                    } else {
                        alert("Problemas com o servidor :/");
                    }
                })
                .catch(error => {
                    alert("Não foi possível adicionar aos favoritos!")
                    console.error(error);
                });
        }
    }

    function deleteProdutoFavorito(favorito) {
        fetch(`http://localhost:8080/api/favoritos/deletar`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(favorito)
        })
            .then(response => {
                openModalRemoverFavorito();
            })
            .catch(error => {
                console.log("Erro: " + error);
            })
    }


    const modalFavoritarSemLogin = document.querySelector('.cartao-favorito-sem-login');
    const modalFavorito = document.querySelector('.cartao-favorito');
    const modalRemoverFavorito = document.querySelector('.cartao-remover-favorito');

    const openModalFavoritarSemLogin = () => {
        modalFavoritarSemLogin.style.display = 'flex';
    };
    const openModalFavorito = () => {
        modalFavorito.style.display = 'flex';
    };
    const openModalRemoverFavorito = () => {
        modalRemoverFavorito.style.display = 'flex';
    };

    const closeBtns = document.querySelectorAll('.close');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModalFavoritarSemLogin();
            closeModalFavorito();
            closeModalRemoverFavorito();
        });
    });

    const closeModalFavoritarSemLogin = () => {
        modalFavoritarSemLogin.style.display = 'none';
    };
    const closeModalFavorito = () => {
        modalFavorito.style.display = 'none';
    };
    const closeModalRemoverFavorito = () => {
        modalRemoverFavorito.style.display = 'none';
    };
});