var params = new URLSearchParams(window.location.search);
var userId = params.get('userId');

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#botao-usuario").addEventListener('click', function () {
        getDadosUsuario(userId);
    });

    document.querySelector("#botao-email").addEventListener('click', function () {
        getDadosUsuario(userId);
    });

    document.querySelector("#salvar-dados-usuario").addEventListener('click', function () {
        alterarDadosUsuario(userId);
        alert("Dados alterados")
    });

    document.querySelector("#salvar-email").addEventListener('click', function () {
        alterarEmail(userId);
        alert("Dados alterados")
    });

    document.querySelector("#salvar-senha").addEventListener('click', function () {
        alterarSenha(userId);
        alert("Dados alterados")
    });
});

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
            console.log(data)
            const dataDaAPI = new Date(data.dtNascimento);
            const dataFormatada = formatarData(dataDaAPI);
            document.getElementById("campo-email-usuario").value = data.email;
            document.getElementById("nome-usuario").value = data.nome;
            document.getElementById("data-nascimento").value = dataFormatada;
            document.getElementById("cpf").value = data.cpf;
            document.getElementById("telefone").value = data.telefone;
        })
        .catch(error => {
            console.error('Erro: ', error)
        });
}

function alterarDadosUsuario(id) {
    const usuario = {
        nome: document.getElementById("nome-usuario").value,
        dtNascimento: document.getElementById("data-nascimento").value,
        cpf: document.getElementById("cpf").value,
        telefone: document.getElementById("telefone").value
    }

    fetch(`http://localhost:8080/api/usuarios/atualizardados?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
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

function alterarEmail(id) {
    const credencial = {
        email: document.getElementById("campo-email-usuario").value,
    }

    fetch(`http://localhost:8080/api/usuarios/atualizaremail?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credencial)
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

function alterarSenha(id) {
    const credencial = {
        senhaAtual: document.getElementById("campo-senha-usuario").value,
        senha: document.getElementById("NovaSenha-usuario").value,
    }

    fetch(`http://localhost:8080/api/usuarios/atualizarsenha?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credencial)
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

function formatarData(data) {
    return data.toISOString().split('T')[0]
}
