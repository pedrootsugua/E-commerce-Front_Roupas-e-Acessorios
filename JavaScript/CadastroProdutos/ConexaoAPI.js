//Pega as informações do html
const formulario = document.querySelector("form");
const Inome = document.querySelector(".nome");
const Icategoria = document.querySelector(".categoria");
const Ipreco = document.querySelector(".preco");
const Iimagem = document.querySelector("#picture__input");

function cadastrar() {
    //Instância da classe que guardará a imagem
    const formData = new FormData();

    //Adição da imagem no objeto
    formData.append('imagem', Iimagem.files[0]);

    //Objeto JSON que recebe os dados que serão guardados no banco
    const produto = {
        nome: Inome.value,
        categoria: Icategoria.value,
    };

    // Array para armazenar mensagens de sucesso e erro
    const messages = [];

    // Array para armazenar todas as promessas
    const promises = [];

    //Conexão com o backend para gravação do JSON
    const request1 = fetch('http://localhost:8080/api/cadastrarProd', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    })
        .then(response => {
            if (response.ok) {
                messages.push('Produto cadastrado com sucesso!');
            } else {
                messages.push('Erro ao cadastrar produto');
            }
        })
        .catch(error => {
            messages.push('Erro ao cadastrar produto: ' + error.message);
        });

    promises.push(request1);

    //Conexão com o backend para gravação da instância com a imagem
    const request2 = fetch("http://localhost:8080/api/upload", {
        method: "POST",
        body: formData
    })
        .then(response => {
            if (response.ok) {
                messages.push('Imagem enviada com sucesso!');
            } else {
                messages.push('Erro ao enviar imagem');
            }
        })
        .catch(error => {
            messages.push('Erro ao enviar imagem: ' + error.message);
        });

    promises.push(request2);

    // Espera que todas as promessas sejam resolvidas
    Promise.all(promises)
        .then(() => {
            // Exibe alerta com todas as mensagens concatenadas
            alert(messages.join('\n'));
        });
}


function limpar() {
    Inome.value = "";
    Icategoria.value = "";
    Ipreco.value = "";

    // Reseta o formulário
    formulario.reset();

    // Remove a pré-visualização da imagem
    pictureImage.innerHTML = pictureImageTxt;
}

document.getElementById('btnCancelar').addEventListener('click', function () {
    window.location.href = 'TelaInicial.html';
});

//EventListener que captura o momento que o botão cadastrar é pressionado
formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    cadastrar();
    limpar();
});