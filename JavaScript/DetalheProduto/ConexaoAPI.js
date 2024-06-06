const params = new URLSearchParams(window.location.search);
const produtoId = params.get('produtoId');
var userIdDetalhe = params.get('userId');

// URL da API que você deseja acessar
const apiUrl = 'http://localhost:8080/api/produtos/' + produtoId;



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

        console.log(data);
        // Acesse as propriedades de cada item
        const nome = data.nome;
        const preco = data.preco;
        const categoria = data.categoria;
        const marca = data.marca;
        const tamanho = data.tamanhosEstoque;
        const unidade = data.unidade;
        const estoque = data.estoque;
        const descricao = data.descricao;
        const urls = data.urlImagensModels; // Array de URLs

        var carrinho = {
            idCarrinho: localStorage.getItem("idCarrinho"),
            idProduto: produtoId,
            tamanho: null
        }
        // Atualiza os elementos do item do produto com os dados do JSON
        document.querySelector(".img-produto").src = urls[0].url;
        document.querySelector(".img-produto1").src = urls[1].url;
        document.querySelector(".img-produto2").src = urls[2].url;
        document.querySelector(".img-produto3").src = urls[3].url;
        document.querySelector(".nome-produto").textContent = nome;
        document.querySelector(".preco").textContent = "R$ " + preco;
        document.getElementById("descricao").textContent = descricao

        // Atualiza os botões de tamanho dinamicamente
        const lineButton1 = document.getElementById('line-button1');
        const lineButton2 = document.getElementById('line-button2');
        const lineUnique = document.getElementById('line-unique');
        lineButton1.innerHTML = '';
        lineButton2.innerHTML = '';
        lineUnique.innerHTML = '';

        tamanho.forEach((tamanho, index) => {
            if (tamanho.estoque > 0) {
                const button = document.createElement('button');
                const button2 = document.createElement('button');
                button.className = 'size';
                button2.className = 'unique';
                button.textContent = tamanho.tamanho;

                button.addEventListener('click', function () {
                    carrinho.tamanho = tamanho.tamanho;
                    // Adiciona alguma lógica para mostrar que o botão foi selecionado, se necessário
                });
                console.log(index)
                if (index == 0) {

                    lineUnique.appendChild(button)
                }
                else if (index < 5) {
                    lineButton1.appendChild(button);
                } else {
                    lineButton2.appendChild(button);
                }
            }
        });

        let autenticadoFavorito = localStorage.getItem("autenticado");
        const isAutenticado = (autenticadoFavorito.toLowerCase() === "true")
        console.log(isAutenticado);
        if (isAutenticado === true) {
            let apiUrl = 'http://localhost:8080/api/favoritos/buscar?id=' + userIdDetalhe;
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
                    let produtoFav = false;
                    produtosFavoritos.forEach((item) => {
                        if (item.id == produtoId) {
                            let botõesAdd = document.querySelector('.button-action');
                            botõesAdd.innerHTML = `
                                <button class="btn-action add-carrinho">Adicionar ao carrinho</button>
                                <button class="btn-action remove-fav">Remover dos favoritos</button>
                                `;
                            produtoFav = true;
                            let botaoRemoverFav = botõesAdd.querySelector('.remove-fav');
                            botaoRemoverFav.addEventListener('click', function () {
                                favorito = {
                                    usuarioId: userIdDetalhe,
                                    produtoId: item.id
                                }
                                deleteProdutoFavorito(favorito)
                            });
                        }
                    });
                    if (!produtoFav) {
                        let botõesAdd = document.querySelector('.button-action');
                        botõesAdd.innerHTML = `
                                <button class="btn-action add-carrinho">Adicionar ao carrinho</button>
                                <button class="btn-action add-fav">Adicionar aos favoritos</button>
                                `;
                        let botaoAddFav = botõesAdd.querySelector('.add-fav');
                        botaoAddFav.addEventListener('click', function () {
                            favorito = {
                                usuarioId: userIdDetalhe,
                                produtoId: produtoId
                            }
                            cadastrarFavorito(favorito)
                        });
                    }
                    document.querySelector('.add-carrinho').addEventListener('click', function (event) {
                        event.preventDefault();
                        if (!carrinho.tamanho) {
                            alert('Por favor, selecione um tamanho antes de adicionar ao carrinho.');
                            return;
                        }
                        gravarCarrinho(carrinho);
                    });
                })
                .catch(error => {
                    // Trate os erros que possam ocorrer durante a solicitação
                    console.error(error);
                });
        }
    })
    .catch(error => {
        // Trate os erros que possam ocorrer durante a solicitação
        console.error(error);
    });



function gravarCarrinho(carrinho) {
    const request1 = fetch("http://localhost:8080/api/carrinho/adicionar", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carrinho)
    })
        .then(response => {
            if (response.status === 201) {
                alert("Produto adicionado ao carrinho com sucesso!")
                location.reload();
            } else {
                alert("Problemas com o servidor :/");
            }
        })
        .catch(error => {
            alert("Não foi possível adicionar ao carrinho!")
            console.error(error);
        });
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
            alert("Produto removido dos favoritos!")
            location.reload();
        })
        .catch(error => {
            console.log("Erro: " + error);
        })
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
                alert("Produto adicionado aos favoritos com sucesso!")
                location.reload();
            } else {
                alert("Problemas com o servidor :/");
            }
        })
        .catch(error => {
            alert("Não foi possível adicionar aos favoritos!")
            console.error(error);
        });
}