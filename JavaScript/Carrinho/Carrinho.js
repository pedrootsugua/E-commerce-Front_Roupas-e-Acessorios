function atualizarDadosCartao(idParagrafo, valor) {
    document.getElementById(idParagrafo).textContent = valor;
}

// Aplica uma mascara no valor do CVV
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
