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

document.addEventListener('DOMContentLoaded', (event) => {
    const userIcon = document.querySelector('.icon-usuario');
    const dropdownContent = document.getElementById('dropdown-content');

    userIcon.addEventListener('click', function(event) {
        event.preventDefault();
        dropdownContent.classList.toggle('show');
    });

    window.addEventListener('click', function(event) {
        if (!event.target.matches('.icon-usuario') && !event.target.matches('.fa-user')) {
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        }
    });

    document.getElementById('logout').addEventListener('click', function(event) {
        event.preventDefault();
        fetch('http://localhost:8080/api/login/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Logout realizado com sucesso!');
                console.log(response)
                window.location.href = 'TelaLogin.html';
            } else {
                alert('Erro ao fazer logout. Tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao fazer logout. Tente novamente.');
        });
    });
});
