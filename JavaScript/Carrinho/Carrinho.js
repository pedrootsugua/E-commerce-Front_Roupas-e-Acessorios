function atualizarDadosCartao(idParagrafo, valor) {
    document.getElementById(idParagrafo).textContent = valor;
}

function formatarNumeroCartao(valor) {
    // Remover todos os espaços existentes no valor
    valor = valor.replace(/\s/g, '');
    
    // Adicionar um espaço após cada conjunto de 4 dígitos
    valorFormatado = valor.replace(/(\d{4})/g, '$1 ').trim();
    
    // Atualizar o valor do input com a formatação
    document.getElementById("num-cartao").value = valorFormatado;
    
    // Atualizar o conteúdo da tag "p" com a formatação
    document.getElementById("valorNumCartao").textContent = valorFormatado;
}

function formatarValidade(valor) {
    // Remover todos os caracteres não numéricos
    valor = valor.replace(/\D/g, '');

    // Adicionar uma barra após os dois primeiros dígitos
    if (valor.length > 2) {
        valor = valor.substring(0, 2) + ' / ' + valor.substring(2);
    }

    // Atualizar o valor do input com a formatação
    document.getElementById("validade").value = valor;

    // Atualizar o conteúdo da tag "p" com a formatação
    document.getElementById("valorValidade").textContent = valor;
}


// Aplica uma mascara no valor do CVV--------------------------------------
function atualizarCVVMascarado(idParagrafo, valor) {
    var valorMascarado = "*".repeat(valor.length);
    document.getElementById(idParagrafo).textContent = valorMascarado;
}

// Gira o cartão ao digitar o CVV
function verificarCVV(value) {
    var card = document.getElementById("card");
    if (value.trim().length > 0) {
        card.classList.add("virar");
    } else {
        card.classList.remove("virar");
    }
}

// Executa as funções ref ao CVV
function inputCVVHandler(value) {
    verificarCVV(value);
    atualizarCVVMascarado('valorCVV', value);
}
