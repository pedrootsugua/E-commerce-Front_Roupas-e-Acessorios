const params = new URLSearchParams(window.location.search);
const id = params.get('id');


// URL da API que você deseja acessar
const apiUrl = 'http://localhost:8080/api/produtos/' + id;



const request1 = fetch(apiUrl, {
    method: 'GET'
})
    .then(response => {
        // Verifique se a solicitação foi bem-sucedida (status 200)
        if (!response.ok) {
            throw new Error('Erro ao acessar a API: ' + response.statusText);
        }
        // Parseie os dados da resposta JSON
        return response.json();
    })
    .then(data => {

        // Acesse as propriedades de cada item
        const nome = data.nome;
        const preco = data.preco;
        const categoria = data.categoria;
        const marca = data.marca;
        const tamanho = data.tamanho;
        const unidade = data.unidade;
        const estoque = data.estoque;
        const descricao = data.descricao;
        const urls = data.urlImagensModels; // Array de URLs

        // Atualiza os elementos do item do produto com os dados do JSON
        document.querySelector(".img-produto").src = urls[0].url;
        document.querySelector(".nome-produto").textContent = nome;
        document.querySelector(".preco").textContent = "R$ " + preco;
    })
    .catch (error => {
    // Trate os erros que possam ocorrer durante a solicitação
    console.error(error);
});