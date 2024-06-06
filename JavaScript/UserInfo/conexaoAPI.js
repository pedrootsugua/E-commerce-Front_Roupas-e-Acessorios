var params = new URLSearchParams(window.location.search);
var userId = params.get('userId');

let autenticadoFavorito = localStorage.getItem("autenticado");
    const isAutenticado = (autenticadoFavorito.toLowerCase() === "true")
    console.log(isAutenticado);

    if (isAutenticado === true) {
        getDadosUsuario(userId);
        consultarEnderecoUsuario(userId);
    } 

let dadosUsuario = document.getElementById("dados-usuario");
let emailUsuario = document.getElementById("email-usuario");
let senhaUsuario = document.getElementById("senha-usuario");

const dadosRecebidos = localStorage.getItem('dados-pessoais-usuario');
const dadosConvertidos = JSON.parse(dadosRecebidos);

/*Formatando a data para o padrão brasileiro */
const isoDate = dadosConvertidos.dtNascimento;
const [year, month, day] = isoDate.split('T')[0].split('-');
const formattedDate = `${day}/${month}/${year}`;

/*Inserindo os valores recuperados do Objeto em Cache no HTML */
dadosUsuario.innerHTML = ` <p>${dadosConvertidos.nome}</p> 
     <p>${formattedDate}</p> 
     <p>${dadosConvertidos.cpf}</p> 
     <p>${dadosConvertidos.telefone}</p> `;

const formattedEmail = dadosConvertidos.email.toUpperCase();
const senha = dadosConvertidos.senha;
const maskedSenha = '*'.repeat(senha.length);

emailUsuario.innerHTML = ` <p>${formattedEmail}</p> `
senhaUsuario.innerHTML = ` <p>${maskedSenha}</p> `

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

function consultarEnderecoUsuario(id) {
    fetch(`http://localhost:8080/api/login/endereco?id=${id}`, {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao acessar a API: " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            let primeiroEndereco = document.getElementById("primeiro-endereco");
            let listaEndereco = document.querySelector(".lista-enderecos");
            primeiroEndereco.innerHTML = "";
            // listaEndereco.innerHTML = "";

            let qtdLinha = 0;
            let linhaEndereco;

            data.forEach((endereco, indice) => {
                let cadastrarEndereço = document.createElement('div');
                cadastrarEndereço.classList.add('cadastrar-endereco');

                let novoEndereco = document.createElement('div');
                novoEndereco.classList.add('enderecos');
                novoEndereco.id = "enderecos-lista";
                
                if (qtdLinha === 0) {
                    linhaEndereco = document.createElement('div');
                    linhaEndereco.classList.add('linha-endereco');
                }

                if (indice === 0) {
                    cadastrarEndereço.innerHTML = ` 
                        <div class="novo-endereco">
                            <p>Novo Endereço</p>
                            <h2>+</h2>
                        </div>
                    `;

                    novoEndereco.innerHTML = `
                    <div class="dados">
                        <div id="dados-endereco">
                            <h3>${dadosConvertidos.nome}</h3>
                            <p>${endereco.logradouro + ', ' + endereco.numero}</p>
                            <p>${endereco.bairro}</p>
                            <p>${endereco.cidade + ', ' + endereco.uf + '-' + endereco.cep}</p>
                        </div>
                        <div class="button-endereco">
                            <button class="editar-infos">
                                EDITAR
                                <svg viewBox="0 0 512 512" class="svg">
                                    <path
                                        d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
                                    </path>
                                </svg>
                            </button>
                            <button class="btn-remover">REMOVER</button>
                        </div>
                    </div>
                    `;
                    primeiroEndereco.appendChild(cadastrarEndereço);
                    primeiroEndereco.appendChild(novoEndereco);
                } else {
                    novoEndereco.innerHTML = `
                    <div class="dados">
                        <div id="dados-endereco">
                            <h3>${dadosConvertidos.nome}</h3>
                            <p>${endereco.logradouro + ', ' + endereco.numero}</p>
                            <p>${endereco.bairro}</p>
                            <p>${endereco.cidade + ', ' + endereco.uf + '-' + endereco.cep}</p>
                        </div>
                        <div class="button-endereco">
                            <button class="editar-infos">
                                EDITAR
                                <svg viewBox="0 0 512 512" class="svg">
                                    <path
                                        d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
                                    </path>
                                </svg>
                            </button>
                            <button class="btn-remover">REMOVER</button>
                        </div>
                    </div>
                    `;
                    linhaEndereco.appendChild(novoEndereco);
                    qtdLinha++;
                    if(qtdLinha === 2) {
                        listaEndereco.appendChild(linhaEndereco);
                        qtdLinha = 0;
                    } else if(indice === data.length - 1) {
                        listaEndereco.appendChild(linhaEndereco);
                    }
                }
            });
        })
        .catch(error => {
            console.log("Erro: " + error);
        })
}

function usuarioAutenticado() {
    fetch('http://localhost:8080/api/login/autenticacao', {
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
            console.log(data);
            const autenticado = data.autenticado;
            id = data.credencialModel.idUsuario;
            if (autenticado === true) {
                document.getElementById("login_user").innerHTML = "Olá";
                buscarUsuario(id);
                getDadosUsuario(id);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Erro ao acessar usuário. Por favor, tente novamente.");
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
            console.log(data);
            nome = data.nome;
            let palavras = nome.split(" ");
            let primeiroNome = palavras[0];
            document.getElementById("login_user").innerHTML = "Olá, " + primeiroNome;
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            alert("Erro ao acessar usuário. Por favor, tente novamente.");
        });
}