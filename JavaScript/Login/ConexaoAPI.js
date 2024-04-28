const formulario = document.querySelector("form")
const email = document.querySelector(".email")
const senha = document.querySelector(".senha")
const btnLogin = document.querySelector(".btn-login");
const show = document.querySelector(".modal-confirm");

import{
    
    acesso
}from '../Inicial/AcessoUsuario.js';

function validarCampos() {
    const emailValue = email.value;
    const senhaValue = senha.value;

    // Verifica se o campo de e-mail está vazio
    if (emailValue.trim() === '') {
        alert("Por favor, preencha o campo de e-mail.");
        email.focus();
        return;
    }

    // Verifica se o campo de senha está vazio
    if (senhaValue.trim() === '') {
        alert("Por favor, preencha o campo de senha.");
        senha.focus();
        return;
    }

    // Se os campos estiverem preenchidos, faz a consulta
    consultar();
}

  export function consultar() { 

    const login = {
        "email" : email.value,
        "senha" : senha.value
    };

    // console.log(login)
    fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    })
        .then(response => {
            if (response.status === 200) {
                // Login realizado com sucesso
                alert("Login bem sucedido!")
                console.log(response)
                //document.getElementById("login_user").innerHTML = "I have changed!"
                // acesso().then(r => console.log(r)).catch(x => console.log(x))
               
                window.location.href = "TelaInicial.html";
            } else if (response.status === 403) {
                // CPF já cadastrado
                alert("Usuário/senha inválido!");
            }
        })
        .catch(e => {
            console.log(e)
            // Exibe mensagem de erro em caso de falha na requisição
            //console.error('Erro ao acessar usuário:', error);
            alert("Erro ao acessar usuário. Por favor, tente novamente.");
        });
}

formulario.addEventListener("submit", function (event){
    event.preventDefault();

   // consultar();
    validarCampos();
})

function limparCampos() {
    document.querySelector(".card-login").reset();
}