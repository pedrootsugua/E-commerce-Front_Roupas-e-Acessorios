const idUser = localStorage.getItem('IdUsuario');
const dadosUsuario = localStorage.getItem('dados-pessoais-usuario');
const dadosUsuarioConvertido = JSON.parse(dadosUsuario);

const email = document.getElementById("email-user");
email.innerHTML = ` ${dadosUsuarioConvertido.email} `

acessarPedido(idUser);

function acessarPedido(idUser) {
    fetch(`http://localhost:8080/api/pedido/` + idUser, {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao acessar a API: " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const ultimoPedido = data.at(-1);
            
            const numPedido = document.getElementById("numPedido");
            numPedido.innerHTML = `Número do pedido: ${ultimoPedido.id}`;

            const totalPedido = document.getElementById("totalPedido");
            totalPedido.innerHTML = `Total: R$ ${ultimoPedido.totalPedido}`;

            const formaPagamento = document.getElementById("formaPagamento");
            formaPagamento.innerHTML = `Forma de Pagamento: ${ultimoPedido.formaPagamento}`;

            const enderecoEnvio = document.getElementById("enderecoEnvio");
            enderecoEnvio.innerHTML = `Endereço entrega: ${ultimoPedido.enderecoEnvio}`;

            })
            .catch(error => {
                console.log("Erro: " + error);
        })
}

