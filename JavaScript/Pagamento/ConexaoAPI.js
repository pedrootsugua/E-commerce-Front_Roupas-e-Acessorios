document.addEventListener('DOMContentLoaded', function() {
    let cartaoCreditoRadio = document.getElementById("cartao_credito");
    let cartaoDebitoRadio = document.getElementById("cartao_debito");

    const inputsCartao = document.querySelectorAll(".formulario input");
    const descricaoInputInvalido = document.querySelectorAll(".formulario span");
    console.log(inputsCartao);
    console.log(descricaoInputInvalido);

    // Função para habilitar/desabilitar campos
    function verificarPagamentoSelecionado() {
        if (cartaoCreditoRadio.checked || cartaoDebitoRadio.checked) {
            inputsCartao.forEach(function(input) {
                input.disabled = false;
            });
        } 
    }
    // Verificar seleção inicial
    verificarPagamentoSelecionado();
    // Adicionar eventos de mudança para os radio buttons
    cartaoCreditoRadio.addEventListener('change', verificarPagamentoSelecionado);
    cartaoDebitoRadio.addEventListener('change', verificarPagamentoSelecionado);

    isCartaoValidado(inputsCartao, descricaoInputInvalido, null);
});

//buscar o endereço selecionado para entrega do pedido
let endereco = document.getElementById("endereco-entrega");

const enderecoEntrega = localStorage.getItem('endereco-entrega-pedido');
const enderecoConvertido = JSON.parse(enderecoEntrega);

endereco.innerHTML = ` <p>${enderecoConvertido.logradouro + ', ' + enderecoConvertido.numero}</p> `

//buscar produtos do carrinho
let valorTotalCarrinho = 0;
let idCart = localStorage.getItem("idCarrinho");
acessarCarrinhoProduto(idCart);

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

    // const novoPedidoString = JSON.stringify(novoPedido);
    // localStorage.setItem("dadosPedido", novoPedidoString);
    
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

function fecharModal() {
    document.querySelector(".add-blur").classList.remove('blur');
    document.querySelector(".card-validacao").style.display = "none";
}

// validar os campos antes de gravar o pedido------------------------------------
function validarCampos(event) {
    event.preventDefault();

    let cartaoCreditoRadio = document.getElementById("cartao_credito");
    let cartaoDebitoRadio = document.getElementById("cartao_debito");

    let blurConteudoPrincipal = document.querySelector(".add-blur");
    let modalAlerta = document.querySelector(".card-validacao");
    
    if (!cartaoCreditoRadio.checked && !cartaoDebitoRadio.checked) {
        blurConteudoPrincipal.classList.add('blur');
        modalAlerta.style.display = "flex";
    } else if(cartaoCreditoRadio.checked || cartaoDebitoRadio.checked) {
        const inputsCartao = document.querySelectorAll(".formulario input");
        const descricaoInputInvalido = document.querySelectorAll(".formulario span");

        const cartaoValidado = isCartaoValidado(inputsCartao, descricaoInputInvalido, event);
        console.log("cartao validado: "+cartaoValidado);
        if(cartaoValidado) { //grava o pedido após validação do cartão
            gravarPedido();
        }
    }
}

function isCartaoValidado(inputs, descricaoInputsInvalidos, event) {
    //array de validação para cada input
    let validacoes = Array(inputs.length).fill(false);
    // Define o comprimento mínimo e máximo para cada input
    const lengthInputs = [19, 7, 0, 3];
    const descricao = descricaoInputsInvalidos;

    let todosValidados = false;

    // Função para verificar se todos os elementos do vetor são true (todos campos validados)
    const verificarValidacoes  = () => validacoes.every(validacao => validacao);

    inputs.forEach((input, index) => {
        if(event != null) { //event comprova que a validação foi ativada diretamente pelo botão de finalizar compra
            atualizarValidacao(input, descricao[index], validacoes, index, lengthInputs[index]);
            console.log(validacoes);
            todosValidados = verificarValidacoes();
        }
        input.addEventListener('input', function() { //validação ativada ao digitar informações nos inputs
            atualizarValidacao(input, descricao[index], validacoes, index, lengthInputs[index]);
        });
    });
    return todosValidados;
}

function atualizarValidacao(input, descricao, validacoes, index, comprimento) {

    let length = input.value.length;

    // Verifica se os campos estão preenchidos corretamente
    if(index != 2) {
        if (length >= comprimento) {
            validacoes[index] = true;
            input.classList.remove('input-invalido');
            input.classList.add('input-valido');
            descricao.style.display = "none";
            document.querySelector(".dados").style.marginBottom = '10px';
        } else {
            validacoes[index] = false;
            input.classList.remove('input-valido');
            input.classList.add('input-invalido');
            document.querySelector(".dados").style.marginBottom = '0';
            descricao.style.display = "flex";
        }
    } else { // faz a validação do campo nome separadamente, pois este campo não tem um limite de caracteres
        if (input.value.trim() === "") { //verifica se o campo nome esta sem nenhum texto
            validacoes[index] = false;
            input.classList.remove('input-valido');
            input.classList.add('input-invalido');
            document.querySelector(".dados").style.marginBottom = '0';
            descricao.style.display = "flex";
        } else {
            validacoes[index] = true;
            input.classList.remove('input-invalido');
            input.classList.add('input-valido');
            descricao.style.display = "none";
            document.querySelector(".dados").style.marginBottom = '10px';
        }
    }

    // Mostra o estado atual de validação de todos os campos
    // console.log(validacoes);
}

