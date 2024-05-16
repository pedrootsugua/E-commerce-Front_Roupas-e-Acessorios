document.addEventListener('DOMContentLoaded', function () {
    // Recuperar a string da URL
    var params = new URLSearchParams(window.location.search);
    var userId = params.get('userId');
    document.querySelector('.botao-cont').addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        // Enviar a string para a outra tela como parâmetro na URL
        window.location.href = 'TelaCheckout.html?userId=' + userId;
    });
});

document.querySelector(".carrinho").addEventListener("click", function (event) {
    event.preventDefault();
    acessarCarrinhoProduto(id);
    console.log(id);
    window.location.href = "TelaCarrinho.html";
});

function acessarCarrinhoProduto (id) {
    fetch(`http://localhost:8080/api/carrinho?id=${id}`, {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao acessar a API: " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            let carrinhoVazio = document.getElementById("empty-cart");
            let carrinhoComProduto = document.getElementById("product-cart");
            let listaProdutos = data.quantidadeItens;
            if(listaProdutos != 0) {
                carrinhoComProduto.style.display = "flex";
            } else {
                carrinhoVazio.style.display = "flex";
            }
            // const selectEndereco = document.getElementById("endereco");
            // selectEndereco.innerHTML = "";

            // data.forEach(endereco => {
            //     const option = document.createElement("option");
            //     option.value = JSON.stringify(endereco); // Armazena o endereço completo como valor da opção
            //     option.text = `${endereco.logradouro}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade}, ${endereco.uf}`;
            //     selectEndereco.appendChild(option);
            // });

            // exibirEnderecoSelecionado();
        })
        .catch(error => {
            console.log("Erro: " + error);
        })
}