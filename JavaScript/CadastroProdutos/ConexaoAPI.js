//Pega as informações do html
const formulario = document.querySelector("form");
const Inome = document.querySelector(".nome");
const Icategoria = document.querySelector(".categoria");
// const Ipreco = document.querySelector(".preco");
const Iimagem = document.querySelector("#picture__input");

function cadastrar() {
    //Instância do classe que guardará a imagem
    const formData = new FormData();

    //Adição da imagem no objeto
    formData.append('imagem', Iimagem.files[0]);

    //Objeto JSON que recebe os dados que serão guardados no banco
    const produto = {
        nome: Inome.value,
        categoria: Icategoria.value,
    };

    //Conexão com o backend para gravação do JSON
    fetch('http://localhost:8080/api/cadastrarProd', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('Erro ao cadastrar produto:', error));

    //Conexão com o backend para gravação da instância com a imagem
    fetch("http://localhost:8080/api/upload", {
        method: "POST",
        body: formData
    })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (res) {
            console.log(res);
        });
}

//Método para limpar os campos do front
function limpar() {
    Inome.value = "";
    Icategoria.value = "";
    // Ipreco.value = "";
    Iimagem.value = "";
}

//EventListener que captura o momento que o botão é pressionado
formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    cadastrar();
    limpar();
});