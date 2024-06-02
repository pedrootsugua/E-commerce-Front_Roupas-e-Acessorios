usuarioAutenticado();

var params = new URLSearchParams(window.location.search);
var userId = params.get('userId');

getDadosUsuario(userId);

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