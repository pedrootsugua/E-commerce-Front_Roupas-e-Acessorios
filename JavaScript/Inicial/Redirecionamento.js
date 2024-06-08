document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('confira').addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        // Enviar a string para a outra tela como parâmetro na URL
        var userId = id;
        window.location.href = 'DetalheProduto.html?produtoId=8&userId=' + userId;
    });
});