const Itamanho = document.querySelector("#tamanho");
const Iestoque = document.querySelector("#estoque");

const Iimagem1 = document.querySelector("#picture__input1");
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

let testImagens = [null, null, null, null];

const apiUrl = 'http://localhost:8080/api/produtos/' + produtoId;

fetch(apiUrl, {
    method: 'GET'
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao acessar a API: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        Inome.value = data.nome;
        Ipreco.value = data.preco;
        Icategoria.value = data.categoria;
        Imarca.value = data.marca;
        Iunidade.value = data.unidade;
        Idescricao.value = data.descricao;

        let tamanhoEstoque = data.tamanhosEstoque;
        tamanhoEstoque.sort();
        tamanhoEstoque.forEach(element => {
            adicionarNaLista(element.tamanho, element.estoque);
        });

        let imageUrls = data.urlImagensModels.map(item => item.url);
        let arquivos = [];
        let promises = [];

        function corrigirUrl(url) {
            // Substitui os espaços por "%20" e escapa outros caracteres especiais
            return encodeURIComponent(url);
        }

        // Função para carregar uma imagem e adicionar ao array de arquivos
        function carregarImagem(imageUrl, index) {
            imageUrl = corrigirUrl(imageUrl);
            return fetch('http://localhost:8080/api/produtos/download?url=' + imageUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao obter a imagem');
                    }
                    return response.blob();
                })
                .then(blob => {
                    const reader = new FileReader();
                    reader.onload = function () {
                        const arquivo = new File([blob], imageUrl.split('/').pop(), { type: 'image/jpeg' });
                        arquivos[index] = arquivo;
                        const img = document.createElement("img");
                        img.src = reader.result;
                        img.classList.add(`picture__img${index + 1}`);
                        const pictureImage = document.querySelector(`.picture__image${index + 1}`);
                        if (pictureImage) {
                            pictureImage.innerHTML = "";
                            pictureImage.appendChild(img);
                        }
                    };
                    reader.readAsDataURL(blob);
                })
                .catch(error => {
                    console.error('Erro:', error);
                });
        }

        // Criar promessas para carregar imagens em ordem
        imageUrls.forEach((imageUrl, index) => {
            promises.push(carregarImagem(imageUrl, index));
        });

        // Promise.all para garantir que todas as imagens sejam carregadas antes de continuar
        Promise.all(promises)
            .then(() => {
                document.querySelector('.btn-salvar-alteracoes').addEventListener('click', function (event) {
                    event.preventDefault();
                    alterarProduto(arquivos);
                });
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    })
    .catch(error => {
        console.error('Erro:', error);
    });

function adicionarNaLista(tamanho, estoque) {
    if (tamanho && estoque) {
        dados.push({ tamanho, estoque });
        atualizarTextarea();
        Itamanho.value = '';
        Iestoque.value = '';
    } else {
        alert('Por favor, preencha os campos de tamanho e estoque.');
    }
}

function atualizarTextarea() {
    const texto = dados.map(item => `Tamanho: ${item.tamanho}, Estoque: ${item.estoque}`).join('\n');
    document.getElementById('textarea-tam-est').value = texto;
}

function excluirUltimoRegistro() {
    if (dados.length > 0) {
        dados.pop();
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
    formulario.reset();
    document.querySelector(".picture__image").innerHTML = "Escolha uma imagem";
    document.querySelector(".picture__image2").innerHTML = "Escolha uma imagem";
    document.querySelector(".picture__image3").innerHTML = "Escolha uma imagem";
    document.querySelector(".picture__image4").innerHTML = "Escolha uma imagem";
}

document.querySelector('.btn-cancelar').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = "TelaInicial.html"
});

document.querySelector('.btn-incluir').addEventListener('click', function (event) {
    event.preventDefault();
    adicionarNaLista(Itamanho.value.trim(), Iestoque.value.trim());
});

document.querySelector('.btn-excluir').addEventListener('click', function (event) {
    event.preventDefault();
    excluirUltimoRegistro();
});

document.querySelector('.btn-estoque').addEventListener('click', function (event) {
    const tamanhosEstoque = document.querySelector('.modal-content');
    let htmlContent = '';
    dados.forEach((item, index) => {
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
    const formData = new FormData();
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

    formData.append('produto', JSON.stringify(produto));
    arquivos.forEach((item, index) => {
        if (testImagens[index]) {
            console.log(testImagens[index])
            formData.append('imagem' + (index + 1), testImagens[index]);
        } else {
            formData.append('imagem' + (index + 1), item);
        }
    });
    mostrarLoading();
    fetch('http://localhost:8080/api/produtos/produto/alterar', {
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

const pictureImage = document.querySelector(".picture__image1");
const pictureImage2 = document.querySelector(".picture__image2");
const pictureImage3 = document.querySelector(".picture__image3");
const pictureImage4 = document.querySelector(".picture__image4");

const pictureImageTxt = "Escolha uma imagem";
pictureImage.innerHTML = pictureImageTxt;
pictureImage2.innerHTML = pictureImageTxt;
pictureImage3.innerHTML = pictureImageTxt;
pictureImage4.innerHTML = pictureImageTxt;

Iimagem1.addEventListener("change", function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function (e) {
            const readerTarget = e.target;

            const img = document.createElement("img");
            img.src = readerTarget.result;
            img.classList.add("picture__img");

            pictureImage.innerHTML = "";
            pictureImage.appendChild(img);
        });

        reader.readAsDataURL(file);
    } else {
        pictureImage.innerHTML = pictureImageTxt;
    }
    testImagens[0] = Iimagem1.files[0];
    console.log(testImagens)
});

Iimagem2.addEventListener("change", function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function (e) {
            const readerTarget = e.target;

            const img = document.createElement("img");
            img.src = readerTarget.result;
            img.classList.add("picture__img2");

            pictureImage2.innerHTML = "";
            pictureImage2.appendChild(img);
        });

        reader.readAsDataURL(file);
    } else {
        pictureImage2.innerHTML = pictureImageTxt;
    }

    testImagens[1] = Iimagem2.files[0];
    console.log(testImagens)
});

Iimagem3.addEventListener("change", function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function (e) {
            const readerTarget = e.target;

            const img = document.createElement("img");
            img.src = readerTarget.result;
            img.classList.add("picture__img3");

            pictureImage3.innerHTML = "";
            pictureImage3.appendChild(img);
        });

        reader.readAsDataURL(file);
    } else {
        pictureImage3.innerHTML = pictureImageTxt;
    }

    testImagens[2] = Iimagem3.files[0];
    console.log(testImagens)
});

Iimagem4.addEventListener("change", function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function (e) {
            const readerTarget = e.target;

            const img = document.createElement("img");
            img.src = readerTarget.result;
            img.classList.add("picture__img4");

            pictureImage4.innerHTML = "";
            pictureImage4.appendChild(img);
        });

        reader.readAsDataURL(file);
    } else {
        pictureImage4.innerHTML = pictureImageTxt;
    }

    testImagens[3] = Iimagem4.files[0];
    console.log(testImagens)
});

