const Itamanho = document.querySelector("#tamanho");
const Iestoque = document.querySelector("#estoque");

const Iimagem = document.querySelector("#picture__input");
const Iimagem2 = document.querySelector("#picture__input2");
const Iimagem3 = document.querySelector("#picture__input3");
const Iimagem4 = document.querySelector("#picture__input4");

const Inome = document.querySelector("#nomeProduto");
const Ipreco = document.querySelector("#preco");
const Icategoria = document.querySelector("#categoria");
const Imarca = document.querySelector("#marca");
const Iunidade = document.querySelector("#unidade");
const Idescricao = document.querySelector("#descricao");

const params = new URLSearchParams(window.location.search);
const produtoId = params.get('produtoId');

// Vetor para armazenar os dados de tamanho e estoque
var dados = [];

const apiUrl = 'http://localhost:8080/api/produtos/' + produtoId;

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
        const pictureImage = document.querySelector(".picture__image");
        const pictureImage2 = document.querySelector(".picture__image2");
        const pictureImage3 = document.querySelector(".picture__image3");
        const pictureImage4 = document.querySelector(".picture__image4");

        Inome.value = data.nome;
        Ipreco.value = data.preco;
        Icategoria.value = data.categoria;
        Imarca.value = data.marca;
        Iunidade.value = data.unidade;
        Idescricao.value = data.descricao;

        let tamanhoEstoque = data.tamanhosEstoque;
        tamanhoEstoque.sort((a, b) => a - b);
        tamanhoEstoque.forEach(element => {
            adicionarNaLista(element.tamanho, element.estoque);
        });

        let imageUrls = [];
        let arquivos = [];
        data.urlImagensModels.forEach(item => {
            imageUrls.push(item.url);
            // Fazer uma solicitação AJAX para o endpoint
            fetch('http://localhost:8080/api/produtos/download?url=' + item.url)
                .then(response => {
                    // Verificar se a resposta é bem-sucedida (status 200)
                    if (response.ok) {
                        // Retorna a resposta como um array de bytes
                        return response.arrayBuffer();
                    }
                    // Se a resposta não for bem-sucedida, lança um erro
                    throw new Error('Erro ao obter a imagem');
                })
                .then(arrayBuffer => {
                    // Converter o array de bytes em um blob
                    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

                    const randomFileName = generateRandomFileName('jpg');
                    // Criar um objeto File a partir do blob
                    const file = new File([blob], randomFileName, { type: 'image/jpeg' });

                    arquivos.push(file);
                })
                .catch(error => {
                    // Lidar com erros de solicitação
                    console.error('Erro:', error);
                });

        });
        function fillImageInputs() {
            const pictureImages = [pictureImage, pictureImage2, pictureImage3, pictureImage4];

            for (let i = 0; i < imageUrls.length; i++) {
                const img = document.createElement('img');
                img.src = imageUrls[i];
                img.classList.add(`picture__img${i + 1}`);
                pictureImages[i].innerHTML = "";
                pictureImages[i].appendChild(img);
            }
        }

        // Função para gerar um nome de arquivo aleatório
        function generateRandomFileName(extension) {
            const randomString = Math.random().toString(36).substring(7); // Gera uma string aleatória
            return randomString + '.' + extension; // Adiciona a extensão ao nome do arquivo
        }

        fillImageInputs();
        //EventListener que captura o momento que o botão cadastrar é pressionado
        document.querySelector('.btn-salvar-alteracoes').addEventListener('click', function (event) {
            event.preventDefault();
            alterarProduto(arquivos);
            // limpar();
        });
        console.log(arquivos);
    });


// Função para adicionar os valores ao vetor e atualizar a textarea
function adicionarNaLista(tamanho, estoque) {
    if (tamanho && estoque) {
        // Adiciona os dados ao vetor
        dados.push({ tamanho, estoque });

        // Atualiza a textarea com os valores do vetor
        atualizarTextarea();

        // // Limpa os campos após adicionar à lista
        Itamanho.value = '';
        Iestoque.value = '';
    } else {
        alert('Por favor, preencha os campos de tamanho e estoque.');
    }
}

// Função para atualizar a textarea com os valores do vetor
function atualizarTextarea() {
    // Monta a string com os valores do vetor
    const texto = dados.map(item => `Tamanho: ${item.tamanho}, Estoque: ${item.estoque}`).join('\n');

    // Atualiza a textarea com a string
    document.getElementById('textarea-tam-est').value = texto;
}

// Função para excluir o último registro do vetor dados e atualizar a textarea
function excluirUltimoRegistro() {
    // Verifica se há elementos no vetor
    if (dados.length > 0) {
        // Remove o último elemento do vetor
        dados.pop();
        // Atualiza a textarea com os valores atualizados do vetor
        atualizarTextarea();
    } else {
        alert('Não há registros para excluir.');
    }
}

function limpar() {
    Inome.value = "";
    Icategoria.value = "";
    Ipreco.value = "";
    dados = [];

    // Reseta o formulário
    formulario.reset();

    // Remove a pré-visualização das imagens
    pictureImage.innerHTML = pictureImageTxt;
    pictureImage2.innerHTML = pictureImageTxt;
    pictureImage3.innerHTML = pictureImageTxt;
    pictureImage4.innerHTML = pictureImageTxt;
}

document.querySelector('.btn-cancelar').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = "TelaInicial.html"
});

// Adiciona um evento de clique ao botão "Inserir"
document.querySelector('.btn-incluir').addEventListener('click', function (event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário
    adicionarNaLista(Itamanho.value.trim(), Iestoque.value.trim()); // Chama a função para adicionar na lista
});

document.querySelector('.btn-excluir').addEventListener('click', function (event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário
    excluirUltimoRegistro(); // Chama a função para adicionar na lista
});

document.querySelector('.btn-estoque').addEventListener('click', function (event) {
    const tamanhosEstoque = document.querySelector('.modal-content');
    let htmlContent = ''; // Variável para acumular o conteúdo HTML
    dados.forEach((item, index) => {
        console.log(index)
        htmlContent += `
            <div class="input-tamanho-estoque">
                    <div class="modal-info">
                        <label class="labels" for="campo-tamanho${index}">Tamanho</label>
                        <input type="text" class="input-dados" id="campo-tamanho${index}" readonly>
                    </div>
                    <div class="modal-info">
                        <label class="labels" for="campo-estoque${index}">Estoque</label>
                        <input type="text" class="input-dados" id="campo-estoque${index}">
                    </div>
                </div>
                        `;
    });
    tamanhosEstoque.innerHTML = htmlContent;
    dados.forEach((item, index) => {
        document.querySelector('#campo-tamanho' + index).value = item.tamanho;
        document.querySelector('#campo-estoque' + index).value = item.estoque;
    });

});

document.querySelector('.salvar').addEventListener('click', function () {
    dados.forEach((item, index) => {
        item.estoque = document.querySelector('#campo-estoque' + index).value;
    });
    const novoEstoque = {
        productId: produtoId,
        tamanhosEstoque: dados
    }
    alterarEstoques(novoEstoque);
});

function alterarProduto(arquivos) {

    console.log(arquivos);
    console.log(Iimagem);
    //Instância da classe que guardará a imagem
    const formData = new FormData();

    //Objeto JSON que recebe os dados que serão guardados no banco
    const produto = {
        id: produtoId,
        nome: Inome.value,
        preco: Ipreco.value.replace(/,/g, '.'),
        categoria: Icategoria.value,
        marca: Imarca.value,
        tamanhosEstoque: dados,
        unidade: Iunidade.value,
        descricao: Idescricao.value
    };

    //Adição das info dos produtos no objeto
    formData.append('produto', JSON.stringify(produto));

    //Adição das imagens no objeto
    arquivos.forEach((item, index) => {
        formData.append('imagem' + (index + 1), item);
    })
    mostrarLoading();
    //Conexão com o backend para gravação do JSON
    const request1 = fetch('http://localhost:8080/api/produtos/produto/alterar', {
        method: 'PUT',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                setTimeout(() => {
                    esconderLoading();
                    document.querySelector(".card").style.display = "flex";
                }, 3000);
            } else {
                alert("Erro ao cadastrar produto");
                document.querySelector(".main").classList.remove('blur');
                document.querySelector("footer").classList.remove('blur');
                esconderLoading();
            }
        })
        .catch(error => {
            alert("Erro ao cadastrar produto");
            esconderLoading();
            document.querySelector(".main").classList.remove('blur');
            document.querySelector("footer").classList.remove('blur');
        });
}

function alterarEstoques(novoEstoque) {
    fetch(`http://localhost:8080/api/produtos/estoque/alterar`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoEstoque)
    })
        .then(response => {
            alert("Alterado!")
            location.reload();
        })
        .catch(error => {
            console.log("Erro: " + error);
        })
}