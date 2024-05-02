
// URL da API que você deseja acessar
const apiUrl = 'http://localhost:8080/api/produtos?category=homem';

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

            if (index <= 4) {
                // Seleciona a lista de produtos
                var listaProdutos = document.querySelector(".linha");

                // Seleciona o modelo de item de produto
                var itemProdutoModelo = listaProdutos.querySelector(".prod");

                // Remove o modelo do item de produto do HTML
                itemProdutoModelo.remove();
                var novoItemProduto = itemProdutoModelo.cloneNode(true); // Clone do modelo

                // Adiciona o novo item do produto à lista de produtos
                listaProdutos.appendChild(novoItemProduto);
            } else if (index <= 9) {
                var listaProdutos2 = document.querySelector(".linha2");
                var itemProdutoModelo = listaProdutos2.querySelector(".prod");
                // Remove o modelo do item de produto do HTML
                itemProdutoModelo.remove();
                var novoItemProduto = itemProdutoModelo.cloneNode(true); // Clone do modelo
                // Adiciona o novo item do produto à lista de produtos
                listaProdutos2.appendChild(novoItemProduto);
            } else if (index <= 14) {
                var listaProdutos3 = document.querySelector(".linha3");
                var itemProdutoModelo = listaProdutos3.querySelector(".prod");
                // Remove o modelo do item de produto do HTML
                itemProdutoModelo.remove();
                var novoItemProduto = itemProdutoModelo.cloneNode(true); // Clone do modelo
                // Adiciona o novo item do produto à lista de produtos
                listaProdutos3.appendChild(novoItemProduto);
            } else {
                var listaProdutos4 = document.querySelector(".linha4");
                var itemProdutoModelo = listaProdutos4.querySelector(".prod");
                // Remove o modelo do item de produto do HTML
                itemProdutoModelo.remove();
                var novoItemProduto = itemProdutoModelo.cloneNode(true); // Clone do modelo
                // Adiciona o novo item do produto à lista de produtos
                listaProdutos4.appendChild(novoItemProduto);
            }

            // Atualiza os elementos do item do produto com os dados do JSON
            novoItemProduto.querySelector(".imgProduto").src = urls[0].url;
            novoItemProduto.querySelector(".text_produto").textContent = nome;
            novoItemProduto.querySelector(".preco").textContent = "R$ " + preco;

        });
    })
    .catch(error => {
        // Trate os erros que possam ocorrer durante a solicitação
        console.error(error);
    });