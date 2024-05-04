
// URL da API que você deseja acessar
const apiUrl = 'http://localhost:8080/api/produtos?category=tenis';

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
        // Itere sobre cada item na lista
        data.forEach((item, index) => {
            // Acesse as propriedades de cada item
            const nome = item.nome;
            const preco = item.preco;
            const categoria = item.categoria;
            const marca = item.marca;
            const tamanho = item.tamanho;
            const unidade = item.unidade;
            const estoque = item.estoque;
            const descricao = item.descricao;
            const urls = item.urlImagensModels; // Array de URLs

            if (index <= 1) {
                // Seleciona a lista de produtos
                var listaProdutos = document.querySelector(".lista-produtos");

                // Seleciona o modelo de item de produto
                var itemProdutoModelo = listaProdutos.querySelector(".list-prod");

                // Remove o modelo do item de produto do HTML
                itemProdutoModelo.remove();
                var novoItemProduto = itemProdutoModelo.cloneNode(true); // Clone do modelo

                // Adiciona o novo item do produto à lista de produtos
                listaProdutos.appendChild(novoItemProduto);
            } 
               
            
            // Atualiza os elementos do item do produto com os dados do JSON
            novoItemProduto.querySelector(".img-produto").src = urls[0].url;
            novoItemProduto.querySelector(".nome-produto").textContent = nome;
            novoItemProduto.querySelector(".preco").textContent = "R$ " + preco;

        });
    })
    .catch(error => {
        // Trate os erros que possam ocorrer durante a solicitação
        console.error(error);
    });