usuarioAutenticado();

var params = new URLSearchParams(window.location.search);
var mensagem = params.get('mensagem');

const form = document.querySelector('.formulario')

document.addEventListener("DOMContentLoaded", function () {
    const checkboxEnderecoSalvo = document.getElementById("check");
    const checkboxNovoEndereco = document.getElementById("check1");

    checkboxEnderecoSalvo.addEventListener("change", function () {
        if (checkboxEnderecoSalvo.checked) {
            consultarEnderecoUsuario(id);
        } else {
            limparCampos();
        }
    });

    checkboxNovoEndereco.addEventListener("change", function () {
        if (checkboxNovoEndereco.checked) {
            cadastrarNovoEndereco();
        }
    });
});

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
            // Pega os dados retornados da API e concatena para exibir no campo.
            document.getElementById("enderecoSalvo")
                .value = data.logradouro + ', ' + data.numero + ' - ' +
                data.bairro + ' (' + data.cidade + ')';

        })
        .catch(error => {
            console.log("Erro: " + error);
        })
}

function cadastrarNovoEndereco() {

    const novoEndereco = {
        cep: form.querySelector("#cep").value,
        logradouro: form.querySelector("#logradouro").value,
        bairro: form.querySelector("#bairro").value,
        numero: form.querySelector("#numero").value,
        cidade: form.querySelector("#cidade").value,
        uf: form.querySelector("#uf").value,
        idUsuario: mensagem
    };
    fetch(`http://localhost:8080/api/enderecos/novo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoEndereco)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao acessar a API: " + response.statusText);
            }
            return response.json();
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

function limparCampos() {
    // Limpa os campos do formulário
    document.getElementById("enderecoSalvo").value = "";
}

