document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.sneakers').addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        // Enviar a string para a outra tela como parâmetro na URL
        var mensagem = 'sneakers';
        window.location.href = 'TelaProdutos.html?mensagem=' + mensagem + '&userId=' + id;
    });
    document.querySelector('.vestuarios').addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        // Enviar a string para a outra tela como parâmetro na URL
        var mensagem = 'Vestuário';
        window.location.href = 'TelaProdutos.html?mensagem=' + mensagem + '&userId=' + id;
    });
    document.querySelector('.promocoes').addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        // Enviar a string para a outra tela como parâmetro na URL
        var mensagem = 'Vestuário';
        window.location.href = 'TelaProdutos.html?mensagem=' + mensagem + '&userId=' + id;
    });
    document.querySelector('.acessorios').addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        // Enviar a string para a outra tela como parâmetro na URL
        var mensagem = 'Acessórios';
        window.location.href = 'TelaProdutos.html?mensagem=' + mensagem + '&userId=' + id;
    });
    document.querySelector('.icon-coracao').addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        // Enviar a string para a outra tela como parâmetro na URL
        var userId = id;
        window.location.href = 'TelaFavoritos.html?userId=' + userId;
    });
    document.querySelector('.carrinho').addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        // Enviar a string para a outra tela como parâmetro na URL
        var userId = id;
        window.location.href = 'TelaCarrinho.html?userId=' + userId;
    });
    document.querySelector('.dados').addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        // Enviar a string para a outra tela como parâmetro na URL
        let autenticadoFavorito = localStorage.getItem("autenticado");
        const isAutenticado = (autenticadoFavorito.toLowerCase() === "true")
        console.log(isAutenticado);

        if (isAutenticado === true) {
            var userId = id;
            window.location.href = 'UsuarioInfo.html?userId=' + userId;
        } else {
            window.location.href = 'TelaLogin.html';
        }
    });
    document.querySelector('.logout').addEventListener('click', function (event) {
        // event.preventDefault();
        console.log(4)
        deslogar();
    });
    document.getElementById('confira').addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        // Enviar a string para a outra tela como parâmetro na URL
        // var mensagem = id;
        window.location.href = 'DetalheProduto.html?produtoId=20';
    });

});

function deslogar() {
    fetch('http://localhost:8080/api/login/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                alert('Logout realizado com sucesso!');
                // Recarga a página e limpa o cache
                console.log(response)
                window.location.href = 'TelaInicial.html';
                // location.reload();

            } else {
                alert('Erro ao fazer logout. Tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao fazer logout. Tente novamente.');
        });
}
