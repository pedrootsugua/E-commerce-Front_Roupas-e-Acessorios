let id = 0;
let nome = ""
let admin = false;

verificaAutenticacao()


function verificaAutenticacao() {
    fetch('http://localhost:8080/api/login/autenticacao', {
        method: 'GET',
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro ao fazer login');
            }
        })
        .then(data => {
            console.log(data);
            const autenticado = data.autenticado;
            id = data.credencialModel.idUsuario;
            admin = data.credencialModel.admin;
            if (admin === true) {
                // Encontra o elemento com a classe icon-usuario
                var iconUsuario = document.querySelector('.icon-usuario');

                // Cria um novo elemento de imagem
                var novaImagem = document.createElement('img');

                // Define os atributos da nova imagem
                novaImagem.src = 'img/admin-9575.png'; // Substitua pelo caminho da sua imagem
                novaImagem.alt = 'Ícone de usuário'; // Texto alternativo para acessibilidade
                novaImagem.classList.add('icone-imagem'); 

                // Substitui o elemento <i> pela nova imagem
                iconUsuario.innerHTML = ''; // Limpa o conteúdo existente do elemento <i>
                iconUsuario.appendChild(novaImagem); // Adiciona a nova imagem ao lugar do elemento <i>

                var iconCoracao = document.querySelector('.icon-coracao');
                // Cria um novo elemento de imagem
                var novoIcone = document.createElement('img');
                // Define os atributos da nova imagem
                novoIcone.src = 'img/editar.png'; // Substitua pelo caminho da sua imagem
                novoIcone.alt = 'Ícone de cadastrar produto'; // Texto alternativo para acessibilidade
                novoIcone.classList.add('icone-imagem'); 
                novoIcone.classList.add('icone-edit-prod'); 

                // Substitui o elemento <i> pela nova imagem
                iconCoracao.innerHTML = ''; // Limpa o conteúdo existente do elemento <i>
                iconCoracao.appendChild(novoIcone); // Adiciona a nova imagem ao lugar do elemento <i>

                document.querySelector('.icone-edit-prod').addEventListener('click', function (event) {
                    event.preventDefault();
                    window.location.href = 'TelaCadastroProd.html';
                });
            }
            if (autenticado === true) {
                buscarUsuario(id)
            }
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
        });
}


function buscarUsuario(id) {
    console.log(id)
    fetch('http://localhost:8080/api/usuarios/' + id, {
        method: 'GET',
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro ao fazer login');
            }
        })
        .then(data => {
            nome = data.nome;
            localStorage.setItem("idCarrinho", data.carrinho.id);
            // Divida a string em um array de palavras usando o espaço como delimitador
            let palavras = nome.split(" ");
            // Acesse a primeira palavra, que está no índice 0 do array
            let primeiroNome = palavras[0];
            document.getElementById("login_user").innerHTML = "Olá, " + primeiroNome;
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            alert("Erro ao acessar usuário. Por favor, tente novamente.");
        });
}

