document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.sneakers').addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        // Enviar a string para a outra tela como parâmetro na URL
        var mensagem = 'sneakers';
        window.location.href = 'TelaProdutos.html?mensagem=' + mensagem;
    });
    document.querySelector('.vestuarios').addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        // Enviar a string para a outra tela como parâmetro na URL
        var mensagem = 'Vestuário';
        window.location.href = 'TelaProdutos.html?mensagem=' + mensagem;
    });
    document.querySelector('.promocoes').addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        // Enviar a string para a outra tela como parâmetro na URL
        var mensagem = 'promocoes';
        window.location.href = 'TelaProdutos.html?mensagem=' + mensagem;
    });
    document.querySelector('.acessorios').addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        // Enviar a string para a outra tela como parâmetro na URL
        var mensagem = 'Acessórios';
        window.location.href = 'TelaProdutos.html?mensagem=' + mensagem;
    });
    document.querySelector('.carrinho').addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        // Enviar a string para a outra tela como parâmetro na URL
        var userId = id;
        window.location.href = 'TelaCarrinho.html?userId=' + userId;
    });
});