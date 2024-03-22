const formulario = document.querySelector("form");
const Inome = document.querySelector(".nome");
const Icategoria = document.querySelector(".categoria");
const Ipreco = document.querySelector(".preco");

function cadastrar() {
    fetch("http://localhost:8080/cadastrarProd",
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            nome: Inome.value,
            categoria: Icategoria.value,
            preco: Ipreco.value
        })
    })
    .then(function (res) { console.log(res) })
    .catch(function (res) { console.log(res) })
}

function limpar() {
    Inome.value = "";
    Icategoria.value = "";
    Ipreco.value = "";
}

formulario.addEventListener('submit', function (event){
    event.preventDefault();
    
    cadastrar();
    limpar();
    console.log(Inome.value,
    Icategoria.value,
    Ipreco.value)
})