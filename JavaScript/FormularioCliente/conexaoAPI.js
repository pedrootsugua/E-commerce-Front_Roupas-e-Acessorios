function mostrarLoading() {
    document.querySelector(".main").classList.add('blur');
    // Exibe o modal de loading
    document.getElementById("loadingModal").style.display = "block";
}

function redirecionarParaPagina() {
    window.location.href = "TelaInicial.html";
}

document.querySelector(".accept-cookie-button").addEventListener("click", redirecionarParaPagina);

function esconderLoading() {
    // Esconde o modal de loading
    document.getElementById("loadingModal").style.display = "none";
}

document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    if (form.checkValidity()) {
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
            uf: form.querySelector("#uf").value
        };

        removerInvalidFeedbackClass();
        cadastrar(usuario); // Envia os dados para o backend
        limparCampos(); // Limpa os campos do formulário após o envio bem-sucedido
    }
});

function removerInvalidFeedbackClass() {
    const campos = document.querySelectorAll('.form-control');
    campos.forEach(campo => {
        campo.classList.remove('invalid-feedback');
    });
}

function cadastrar(usuario) {

    mostrarLoading();

    fetch('http://localhost:8080/api/usuarios/criar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })

        .then(response => response.text())
        .then(result => {
            console.log(result);

            setTimeout(() => {
                esconderLoading();
                document.querySelector(".card").style.display = "flex";
            }, 3000);
        })
        .catch(error => console.log('Erro ao cadastrar usuario:', error));
    console.log(usuario)
}

// Remove temporariamente as classes de validação dos campos
function removerValidacaoCampos() {
    const campos = document.querySelectorAll('.form-control');
    campos.forEach(campo => {
        campo.classList.remove('is-invalid');
        campo.classList.remove('is-valid');
    });
}

//Método para limpar os campos do front
function limparCampos() {
    document.querySelector("form").reset();
}

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById("logradouro").value = ("");
    document.getElementById("bairro").value = ("");
    document.getElementById("cidade").value = ("");
    document.getElementById("uf").value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById("logradouro").value = (conteudo.logradouro);
        document.getElementById("bairro").value = (conteudo.bairro);
        document.getElementById("cidade").value = (conteudo.localidade);
        document.getElementById("uf").value = (conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}
function pesquisacep(cepInput) {

    var valor = cepInput.value;

    // Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById("logradouro").value = "...";
            document.getElementById("bairro").value = "...";
            document.getElementById("cidade").value = "...";
            document.getElementById("uf").value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};
