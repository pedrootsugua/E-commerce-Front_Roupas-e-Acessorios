//Pega as informações do html
const formulario = document.querySelector("form");

const nome = document.querySelector("#nomeCompleto");
const cpf = document.querySelector("#cpf");
const telefone = document.querySelector("#telefone");
const dtNascimento = document.querySelector("#dtNascimento");
const email = document.querySelector("#email");

const cep = document.querySelector("#cep");
const logradouro = document.querySelector("#logradouro");
const cidade = document.querySelector("#cidade");
const uf = document.querySelector("#uf");
const numero = document.querySelector("#numero")

function cadastrar() {

    //Objeto JSON que recebe os dados que serão guardados no banco
    const usuario = {
        nome: nome.value,
        dtNascimento: dtNascimento.value,
        cpf: cpf.value,
        telefone: telefone.value,
        email: email.value,
        cep: cep.value,
        logradouro: logradouro.value,
        bairro: bairro.value,
        numero: numero.value,
        cidade: cidade.value,
        uf: uf.value
    };

    fetch('http://localhost:8080/api/usuarios/criar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })

        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('Erro ao cadastrar usuario:', error));
    console.log(usuario)

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
