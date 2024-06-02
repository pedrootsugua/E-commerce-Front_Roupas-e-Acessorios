let id;
let nome = ""
let admin = false;
let autenticado = false;

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
            autenticado = data.autenticado;
            localStorage.setItem("autenticado", autenticado);
            if (autenticado === true) {
                id = data.credencialModel.idUsuario;
                buscarUsuario(id);
                getDadosUsuario(id);
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

                    var iconProdutos = document.querySelector('.icon-produtos');
                    // Cria um novo elemento de imagem
                    var novoIcone = document.createElement('img');
                    // Define os atributos da nova imagem
                    novoIcone.src = 'img/editar.png'; // Substitua pelo caminho da sua imagem
                    novoIcone.alt = 'Ícone de cadastrar produto'; // Texto alternativo para acessibilidade
                    novoIcone.classList.add('icone-imagem');
                    novoIcone.classList.add('icone-edit-prod');

                    // Substitui o elemento <i> pela nova imagem
                    iconProdutos.innerHTML = ''; // Limpa o conteúdo existente do elemento <i>
                    iconProdutos.appendChild(novoIcone); // Adiciona a nova imagem ao lugar do elemento <i>

                    const tamanhoMargin = localStorage.getItem("tamanho-margin-left");
                    const iconeProd = document.querySelector('.nav-icone-prod');
                    iconeProd.style.marginLeft = (tamanhoMargin) + 'px';

                    document.querySelector('.icone-edit-prod').addEventListener('click', function (event) {
                        event.preventDefault();
                        window.location.href = 'TelaCadastroProd.html';
                    });
                }
            } else {
                const positionIcons = document.querySelectorAll('.nav-icone');
                positionIcons.forEach(icon => {
                    icon.style.marginLeft = 30 + 'px';
                    // icon.style.marginRight = spacing + 'px';
                });
                var iconHeart = document.querySelector('.nav-icone-heart');
                iconHeart.style.marginLeft = 30 + 'px';
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
            let tamanhoCarrinhoGeral = data.carrinho.quantidadeItens;
            // Divida a string em um array de palavras usando o espaço como delimitador
            let palavras = nome.split(" ");
            // Acesse a primeira palavra, que está no índice 0 do array
            let primeiroNome = palavras[0];
            document.getElementById("login_user").innerHTML = "Olá, " + primeiroNome;
            if (tamanhoCarrinhoGeral === 0) {
                document.getElementById("tamanho-carrinho").style.display = 'none';
            } else {
                document.getElementById("tamanho-carrinho").innerHTML = "" + tamanhoCarrinhoGeral;
            }
            // Obter a referência da div dinâmica
            const dynamicDiv = document.getElementById('id-icon-user');

            // Obter o tamanho da div dinâmica
            const dynamicDivWidth = dynamicDiv.offsetWidth;

            // Definir o espaçamento com base no tamanho da div dinâmica
            const spacing = dynamicDivWidth / 2;
            localStorage.setItem("tamanho-margin-left", spacing);

            // Aplicar o espaçamento aos ícones
            const positionIcons = document.querySelectorAll('.nav-icone');
            positionIcons.forEach(icon => {
                icon.style.marginLeft = (spacing) + 'px';
                // icon.style.marginRight = spacing + 'px';
            });
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            alert("Erro ao acessar usuário. Por favor, tente novamente.");
        });
}

function getDadosUsuario(id) {
    fetch(`http://localhost:8080/api/usuarios/info?id=${id}`, {
        method: 'GET',
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro');
            }
        })
        .then(data => {
            const dados = JSON.stringify(data);
            localStorage.setItem("dados-pessoais-usuario", dados)
        })
        .catch(error => {
            console.error('Erro: ', error)
        });
}

