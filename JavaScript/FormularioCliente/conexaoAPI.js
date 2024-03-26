//Pega as informações do html
const formulario = document.querySelector(".needs-validation");

const nome = document.querySelector("#nomeCompleto");
const cpf = document.querySelector("#cpf");
const telefone = document.querySelector("#telefone");
const dtNascimento = document.querySelector("#dtNascimento");
const email = document.querySelector("#email");

function cadastrar() {

    //Objeto JSON que recebe os dados que serão guardados no banco
    const cliente = {
        nome: nome.value,
        cpf: cpf.value,
        telefone: telefone.value,
        dtNascimento: dtNascimento.value,
        email: email.value
    };

    //Conexão com o backend para gravação do JSON
    fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('Erro ao cadastrar cliente:', error));
}

//Método para limpar os campos do front
function limpar() {
    nome.value = "";
    cpf.value = "";
    telefone.value = "";
    dtNascimento.value = "";
    email.value = "";
   
}

//EventListener que captura o momento que o botão é pressionado
formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    cadastrar();
    limpar();
});