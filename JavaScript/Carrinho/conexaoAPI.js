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
