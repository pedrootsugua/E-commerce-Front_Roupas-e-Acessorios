//Pega as informações do html
const formulario = document.querySelector("form");

const nome = document.querySelector("#nomeCompleto");
const cpf = document.querySelector("#cpf");
const telefone = document.querySelector("#telefone");
const dtNascimento = document.querySelector("#dtNascimento");
const email = document.querySelector("#email");

function cadastrar() {

    //Objeto JSON que recebe os dados que serão guardados no banco
    const cliente = {
        nome: nome.value,
        dtNascimento: dtNascimento.value,
        cpf: cpf.value,
        telefone: telefone.value,
        email: email.value
    };

    fetch('http://localhost:8080/api/usuarios/criar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    })

        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('Erro ao cadastrar cliente:', error));
        console.log(cliente);
    }

//Método para limpar os campos do front
function limpar() {
    nome.value = "";
    cpf.value = "";
    telefone.value = "";
    dtNascimento.value = "";
    email.value = "";
   
}

// function converterDataBrasileiraParaAmericana(dataBrasileira) {
//     // Usando Moment.js para fazer a conversão
//     return moment(dataBrasileira, 'DD/MM/YYYY').format('YYYY-MM-DD');
// }

//EventListener que captura o momento que o botão é pressionado
formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    cadastrar();
    limpar();
});