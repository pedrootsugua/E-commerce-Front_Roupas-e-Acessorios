document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    if (form.checkValidity() && validarSenha() === true) {
        const usuario = {
            nome: form.querySelector("#nomeCompleto").value,
            dtNascimento: form.querySelector("#dtNascimento").value,
            cpf: form.querySelector("#cpf").value,
            telefone: form.querySelector("#telefone").value,
            email: form.querySelector("#email").value,
            cep: form.querySelector("#cep").value,
            logradouro: form.querySelector("#logradouro").value,
            bairro: form.querySelector("#bairro").value,
            numero: form.querySelector("#numero").value,
            cidade: form.querySelector("#cidade").value,
            uf: form.querySelector("#uf").value,
            email: form.querySelector('#email').value,
            senha: form.querySelector('#senha').value
        };

        cadastrar(usuario);
        document.getElementById("form").addEventListener("click", function () {
            removerInvalidFeedbackClass();
        });
        limparCampos();
    }
});

function cadastrar(usuario) {
    mostrarLoading();

    fetch('http://localhost:8080/api/usuarios/criar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
        .then(response => {
            if (response.status === 201) {
                setTimeout(() => {
                    esconderLoading();
                    document.querySelector(".card").style.display = "flex";
                }, 3000);
            } else if (response.status === 409) {
                alert("CPF já cadastrado. Por favor, insira um CPF válido.");
                document.querySelector(".main").classList.remove('blur');
                esconderLoading();
            }
        })
        .catch(error => {
            console.error('Erro ao cadastrar usuário:', error);
            alert("Erro ao cadastrar usuário. Por favor, tente novamente.");
            esconderLoading();
            document.querySelector(".main").classList.remove('blur');
        });
}

function limpa_formulário_cep() {
    document.getElementById("logradouro").value = ("");
    document.getElementById("bairro").value = ("");
    document.getElementById("cidade").value = ("");
    document.getElementById("uf").value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById("logradouro").value = (conteudo.logradouro);
        document.getElementById("bairro").value = (conteudo.bairro);
        document.getElementById("cidade").value = (conteudo.localidade);
        document.getElementById("uf").value = (conteudo.uf);
    }
    else {
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}
function pesquisacep(cepInput) {

    var valor = cepInput.value;

    var cep = valor.replace(/\D/g, '');

    if (cep != "") {

        var validacep = /^[0-9]{8}$/;

        if (validacep.test(cep)) {

            document.getElementById("logradouro").value = "...";
            document.getElementById("bairro").value = "...";
            document.getElementById("cidade").value = "...";
            document.getElementById("uf").value = "...";

            var script = document.createElement('script');

            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            document.body.appendChild(script);

        }
        else {
            limpa_formulário_cep();
        }
    }
    else {
        limpa_formulário_cep();
    }
};
