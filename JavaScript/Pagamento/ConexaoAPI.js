let endereco = document.getElementById("endereco-entrega");

const enderecoEntrega = localStorage.getItem('endereco-entrega-pedido');
const enderecoConvertido = JSON.parse(enderecoEntrega);

endereco.innerHTML = ` <p>${enderecoConvertido.logradouro+', '+enderecoConvertido.numero}</p> `