usuarioAutenticado();

document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("check");

    checkbox.addEventListener("change", function () {
        if (this.checked) {
            consultarEnderecoUsuario(id);
        } else
            limparCampos();
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
            // console.log(data);
            // Pega os dados retornados da API e concatena para exibir no campo.
            document.getElementById("enderecoSalvo")
                .value = data.logradouro + ', ' + data.numero + ' - ' +
                data.bairro + ' (' + data.cidade + ')';

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
                document.getElementById("login_user").innerHTML = "Olá, usuário.";
                // consultarEnderecoUsuario(id);
            }
            // e assim por diante, dependendo dos campos do objeto retornado
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Erro ao acessar usuário. Por favor, tente novamente.");
        });
}

function limparCampos() {
    // Limpa os campos do formulário
    document.getElementById("enderecoSalvo").value = "";
}

