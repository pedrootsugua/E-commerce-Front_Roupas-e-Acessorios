const formulario = document.querySelector("form")
const email = document.querySelector(".email")
const senha = document.querySelector(".senha")
const btnLogin = document.querySelector(".btn-login");
const show = document.querySelector(".modal-confirm");

// document.querySelector(".btn-login").addEventListener("submit", function (event) {
//     event.preventDefault();

//     consultar(); // Recebe os dados do backend
//     limparCampos(); // Limpa os campos do formulário após o envio bem-sucedido
    
// });


// btnLogin.addEventListener("click", function (event) {
//     event.preventDefault();
//     validarCampos();
// });

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
        "email" : email.value,
        "senha" : senha.value
    };

    console.log(login)
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
                console.log('ok')
                alert("Login bem sucedido!")
                window.location.href = "TelaInicial.html";
            } else if (response.status === 403) {
                // CPF já cadastrado
                alert("Usuário/senha inválido!");
                document.querySelector(".principal").classList.remove('blur');
                esconderLoading(); // Esconde o modal de loading
            }
        })
        .catch(error => {
            // Exibe mensagem de erro em caso de falha na requisição
            //console.error('Erro ao acessar usuário:', error);
            alert("Erro ao acessar usuário. Por favor, tente novamente.");
            esconderLoading(); // Esconde o modal de loading
            document.querySelector(".main").classList.remove('blur'); // Remove o efeito de blur
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