const formulario = document.querySelector('.card-login').value
const email = document.querySelector('.email').value
const senha = document.querySelector('senha').value

document.querySelector(".card-login").addEventListener("submit", function (event) {
    event.preventDefault();

    // const form = event.target;
    // if (form.checkValidity()) {
    //     const usuario = {
    //         nome: form.querySelector("#nomeCompleto").value,
    //         dtNascimento: form.querySelector("#dtNascimento").value,
    //         cpf: form.querySelector("#cpf").value,
    //         telefone: form.querySelector("#telefone").value,
    //         email: form.querySelector("#email").value,
    //         cep: form.querySelector("#cep").value,
    //         logradouro: form.querySelector("#logradouro").value,
    //         bairro: form.querySelector("#bairro").value,
    //         numero: form.querySelector("#numero").value,
    //         cidade: form.querySelector("#cidade").value,
    //         uf: form.querySelector("#uf").value
    //     };

        consultar(); // Recebe os dados do backend
        limparCampos(); // Limpa os campos do formulário após o envio bem-sucedido
    // }
});

function consultar() { 

    fetch('http://localhost:8080/api/login', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.status === 200) {
                // Login realizado com sucesso
                setTimeout(() => {
                    esconderLoading();
                    document.querySelector(".").style.display = "flex";
                }, 3000);
            } else if (response.status === 403) {
                // CPF já cadastrado
                alert("Usuário/senha inválido!");
                document.querySelector(".principal").classList.remove('blur');
                esconderLoading(); // Esconde o modal de loading
            }
        })
        .catch(error => {
            // Exibe mensagem de erro em caso de falha na requisição
            console.error('Erro ao acessar usuário:', error);
            alert("Erro ao acessar usuário. Por favor, tente novamente.");
            esconderLoading(); // Esconde o modal de loading
            document.querySelector(".main").classList.remove('blur'); // Remove o efeito de blur
        });
}

function limparCampos() {
    document.querySelector(".card-login").reset();
}