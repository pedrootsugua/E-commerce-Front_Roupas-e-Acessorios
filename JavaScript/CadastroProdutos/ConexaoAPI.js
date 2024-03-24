const formulario = document.querySelector("form");
const Inome = document.querySelector(".nome");
const Icategoria = document.querySelector(".categoria");
// const Ipreco = document.querySelector(".preco");
const Iimagem = document.querySelector("#picture__input"); // Novo

function cadastrar() {
    const formData = new FormData();

    formData.append('nome', Inome.value);
    formData.append('categoria', Icategoria.value);
    // formData.append('preco', Ipreco.value);
    formData.append('imagem', Iimagem.files[0]);

    fetch("http://localhost:8080/api/cadastrarProd", {
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


function limpar() {
    Inome.value = "";
    Icategoria.value = "";
    // Ipreco.value = "";
    Iimagem.value = ""; // Limpe o campo de seleção de arquivo
}

formulario.addEventListener("submit", function (event){
    event.preventDefault();
    cadastrar();
    limpar();
});