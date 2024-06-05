const formulario = document.querySelector("form")
const email = document.querySelector(".email")
const senha = document.querySelector(".senha")
const btnLogin = document.querySelector(".btn-login");
const show = document.querySelector(".modal-confirm");

// import {

//     acesso
// } from '../Inicial/AcessoUsuario.js';

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

function consultar() {

    const login = {
        "email": email.value,
        "senha": senha.value
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
                
                irTelaInicial();
                document.querySelector('.incial').addEventListener('click', function (event) {
                    event.preventDefault(); // Evita o comportamento padrão do formulário
                    
                    window.location.href = "TelaInicial.html";
                });
            } else if (response.status === 403) {
                // CPF já cadastrado
                alert("Usuário/senha inválido!");
                // loginInvalido()
            }
        })
        .catch(e => {
            console.log(e)
            // Exibe mensagem de erro em caso de falha na requisição
            //console.error('Erro ao acessar usuário:', error);
            alert("Erro ao acessar usuário. Por favor, tente novamente.");
            // erroLogin()
        });
}

document.querySelector('.btn-login').addEventListener('click', function (event) {
    event.preventDefault();

    // consultar();
    validarCampos();
});

function limparCampos() {
    document.querySelector(".card-login").reset();
}

function irTelaInicial(){
    const modal = document.querySelector('.cartao');

    // Função para abrir o modal
    const openModal = () => {
        modal.style.display = 'flex';
    };

    // Quando o usuário clicar no botão, abre o modal
    btnLogin.addEventListener('click', openModal);

    // Quando o usuário clicar em qualquer lugar fora do modal, fecha o modal
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });
    
    // console.log(response)
    
    

}

// function erroLogin(){
//     const modal = document.querySelector('#erro');

//     // Função para abrir o modal
//     const openModal = () => {
//         modal.style.display = 'flex';
//     };
//     // Quando o usuário clicar no botão, abre o modal
//     btnLogin.addEventListener('click', openModal);

//     const closeModal = () => {
//         modal.style.display = 'none';
//     };


//     // Quando o usuário clicar em qualquer lugar fora do modal, fecha o modal
//     window.addEventListener('click', (event) => {
//         if (event.target == modal) {
//             closeModal();
//         }
//     });
// }

// function loginInvalido(){
//     const modal = document.querySelector('.invalido');
//     let btnOk = document.querySelector('.incial')
//     // Função para abrir o modal
//     const openModal = () => {
//         modal.style.display = 'flex';
//     };
//     // Quando o usuário clicar no botão, abre o modal
//     btnLogin.addEventListener('click', openModal);

//     const closeModal = () => {
//         modal.style.display = 'none';
//     };

//     // Quando o usuário clicar em qualquer lugar fora do modal, fecha o modal
//     btnOk.addEventListener('click', (event) => {
//         if (!event.target == modal) {
//             closeModal();
//         }
//     });
// }