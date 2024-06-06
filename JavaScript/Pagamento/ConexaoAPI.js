//buscar o endereço selecionado para entrega do pedido
let endereco = document.getElementById("endereco-entrega");

const enderecoEntrega = localStorage.getItem('endereco-entrega-pedido');
const enderecoConvertido = JSON.parse(enderecoEntrega);

endereco.innerHTML = ` <p>${enderecoConvertido.logradouro + ', ' + enderecoConvertido.numero}</p> `

//buscar produtos do carrinho
let valorTotalCarrinho = 0;
let idCart = localStorage.getItem("idCarrinho");
acessarCarrinhoProduto(idCart);
console.log(valorTotalCarrinho);

function acessarCarrinhoProduto(idCart) {
    fetch(`http://localhost:8080/api/carrinho/` + idCart, {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao acessar a API: " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            let produtosCarrinho = document.getElementById("lista-produtos");

            produtosCarrinho.innerHTML = "";
            data.carrinhoProdutoModel.forEach((item) => {
                produtosCarrinho.innerHTML += ` <p>${item.id.produtoId.nome + ' (' + item.qtd + 'x) - R$ ' + item.id.produtoId.preco}</p> `
                let valorTotal = item.id.produtoId.preco * item.qtd;
                valorTotalCarrinho += valorTotal;
            });
            let totalCarrinho = document.getElementById("total-carrinho");
            totalCarrinho.innerHTML = ` <p>${'R$ '+valorTotalCarrinho}</p> `

            console.log(valorTotalCarrinho);
        })
        .catch(error => {
            console.log("Erro: " + error);
        })
}

function gravarPedido() {
    const dataAtual = new Date();

    let cartaoCreditoRadio = document.getElementById("cartao_credito");
    let cartaoDebitoRadio = document.getElementById("cartao_debito");

    let escolhaPagamento;
    if (cartaoCreditoRadio.checked) {
        escolhaPagamento = "Cartão de Crédito";
    } else if (cartaoDebitoRadio.checked) { // Verifica se o input radio de cartão de débito está selecionado
        escolhaPagamento = "Cartão de Débito";
    } else {
        alert('Selecione uma forma de pagamento!');
    }

    const novoPedido = {
        idUsuario: x,
        dataPedido: dataAtual,
        tipoEnvio: "Sedex",
        enderecoEnvio: "",
        formaPagamento: escolhaPagamento,
        totalPedido: valorTotalCarrinho
    };
    const enderecoString = JSON.stringify(novoEndereco);
    localStorage.setItem("endereco-entrega-pedido", enderecoString); //armazena o novo endereço no cache do navegador
    fetch(`http://localhost:8080/api/pedido/gravar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoEndereco)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao acessar a API: " + response.statusText);
            }
            return response.json();
        })
        .catch(error => {
            console.log("Erro: " + error);
        })
}