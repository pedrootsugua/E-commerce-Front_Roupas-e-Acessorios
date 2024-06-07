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
            valorTotalCarrinho = valorTotalCarrinho.toFixed(2); //formatando valor
            totalCarrinho.innerHTML = ` <p>${'R$ '+valorTotalCarrinho}</p> `

            console.log(valorTotalCarrinho);
        })
        .catch(error => {
            console.log("Erro: " + error);
        })
}


function gravarPedido() {
    mostrarProcessamentoPagamento()
    const idUser = localStorage.getItem('IdUsuario');

    const dataAtual = new Date();

    const enderecoParaEnvio = enderecoConvertido.logradouro+", "+enderecoConvertido.numero+" - "+enderecoConvertido.bairro+", "+enderecoConvertido.cidade+", "+enderecoConvertido.uf;

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
        idUsuario: idUser,
        dataPedido: dataAtual,
        tipoEnvio: "Sedex",
        enderecoEnvio: enderecoParaEnvio,
        formaPagamento: escolhaPagamento,
        totalPedido: valorTotalCarrinho
    };

    const novoPedidoString = JSON.stringify(novoPedido);
    localStorage.setItem("dadosPedido", novoPedidoString);
    
    fetch(`http://localhost:8080/api/pedido/gravar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoPedido)
    })
        .then(response => {
            if (!response.ok) {
                esconderLoading();
                throw new Error("Erro ao acessar a API: " + response.statusText);
            } else {
                // redireciona para a pag. confirmação pedido
                redirecionarParaPagina("TelaConfirmacaoPedido.html");
            }

            return response.json();
        })
        .catch(error => {
            console.log("Erro: " + error);
        })
}

// Aplicar blur e mostrar modal de pagamento-------------------------------------
function mostrarProcessamentoPagamento() {
    document.querySelector(".add-blur").classList.add('blur');
    // Exibe o modal de pagamento
    let processingModal = document.getElementById("container-modal");
    processingModal.style.display = "flex";
    // aplicando animação do modal
    setTimeout(function() {
        processingModal.classList.add("animate-modal");
         // atraso de 2 segundos, após animação do modal redireciona para a pagina
    }, 3000); // Atraso de 3 segundos (2000 milissegundos) para mostrar o modal em sua forma original
    
    
}

function esconderLoading() {
    document.querySelector(".add-blur").classList.remove('blur');
    processingModal.style.display = "none";
}