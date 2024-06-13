usuarioAutenticado();

var userId = localStorage.getItem("IdUsuario");

const checkboxEnderecoSalvo = document.getElementById("check");
const checkboxNovoEndereco = document.getElementById("check1");
let listaEnderecos = [];

const form = document.querySelector('.formulario')

document.addEventListener("DOMContentLoaded", function () {

    checkboxEnderecoSalvo.addEventListener("change", function () {
        if (checkboxEnderecoSalvo.checked) {
            document.getElementById('endereco').disabled = false;
            checkboxNovoEndereco.disabled = true;
            consultarEnderecoUsuario(id);
        } else {
            limparCampos();
            checkboxNovoEndereco.disabled = false;
            document.getElementById('endereco').disabled = true;
        }
    });
});

document.querySelector(".btn-pagamento").addEventListener("click", function (event) {
    if (checkboxNovoEndereco.checked) { //cadastra o novo endereço do usuario, e armazenar os dados no cache do navegador
        cadastrarNovoEndereco();
        alert('Endereço salvo com sucesso!')
    } else if(checkboxEnderecoSalvo.checked){ //pega o endereço salvo selecioanado na lista e armazena os dados no cache do navegador
        let lista = document.getElementById("endereco");
        let indiceSelecionado = lista.selectedIndex;
        const enderecoString = JSON.stringify(listaEnderecos[indiceSelecionado]);
        localStorage.setItem("endereco-entrega-pedido", enderecoString);
    } else { //pega os dados do formulario de endereço e armazena no cache do navegador
        const enderecoInserido = {
            cep: form.querySelector("#cep").value,
            logradouro: form.querySelector("#logradouro").value,
            complemento: form.querySelector("#complemento").value,
            bairro: form.querySelector("#bairro").value,
            numero: form.querySelector("#numero").value,
            cidade: form.querySelector("#cidade").value,
            uf: form.querySelector("#uf").value,
        };
        const enderecoString = JSON.stringify(enderecoInserido);
        localStorage.setItem("endereco-entrega-pedido", enderecoString);
    }
    window.location.href = "TelaPagamento.html";

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
            listaEnderecos = data;
            const selectEndereco = document.getElementById("endereco");
            selectEndereco.innerHTML = "";

            data.forEach(endereco => {
                const option = document.createElement("option");
                option.value = JSON.stringify(endereco); // Armazena o endereço completo como valor da opção
                option.text = `${endereco.logradouro}, ${endereco.numero} (${endereco.complemento}) - ${endereco.bairro}, ${endereco.cidade}, ${endereco.uf}`;
                selectEndereco.appendChild(option);
            });
        })
        .catch(error => {
            console.log("Erro: " + error);
        })
}

function cadastrarNovoEndereco() {

    const novoEndereco = {
        cep: form.querySelector("#cep").value,
        logradouro: form.querySelector("#logradouro").value,
        complemento: form.querySelector("#complemento").value,
        bairro: form.querySelector("#bairro").value,
        numero: form.querySelector("#numero").value,
        cidade: form.querySelector("#cidade").value,
        uf: form.querySelector("#uf").value,
        idUsuario: userId
    };
    const enderecoString = JSON.stringify(novoEndereco);
    localStorage.setItem("endereco-entrega-pedido", enderecoString); //armazena o novo endereço no cache do navegador
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
            let palavras = nome.split(" ");
            let primeiroNome = palavras[0];
            document.getElementById("login_user").innerHTML = "Olá, " + primeiroNome;
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            alert("Erro ao acessar usuário. Por favor, tente novamente.");
        });
}

function limparCampos() {
    document.getElementById("endereco").value = "";
}

