document.addEventListener('DOMContentLoaded', () => {

    const modalEstoque = document.querySelector('#cartao-estoque');
    const modalExclusaoProduto = document.querySelector('#cartao-exclusao-produto');

    const closeBtns = document.querySelectorAll('.close');
    const cancelarBtns = document.querySelectorAll('.cancelar');
    const excluirProduto = document.querySelector('.btn-excluir-produto');

    const openBtn = document.querySelector('.btn-estoque');

    function limparCampos() {
        document.querySelectorAll(".input-dados").forEach(input => {
            input.value = "";
        });
    }

    const openModalEstoque = (event) => {
        event.preventDefault();
        modalEstoque.style.display = 'flex';
    };

    const closeModalEstoque = () => {
        modalEstoque.style.display = 'none';
        limparCampos()
    };

    const openModalExclusaoProduto = (event) => {
        event.preventDefault();
        modalExclusaoProduto.style.display = 'flex';
    };

    const closeModalExclusaoProduto = () => {
        modalExclusaoProduto.style.display = 'none';
        limparCampos()
    };

    // Quando o usuário clicar no botão, abre o modal
    openBtn.addEventListener('click', openModalEstoque);
    excluirProduto.addEventListener('click', openModalExclusaoProduto);

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModalEstoque();
            closeModalExclusaoProduto();
        });
    });

    // Quando o usuário clicar no botão cancelar, fecha o modal
    cancelarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModalEstoque();
            closeModalExclusaoProduto();
        });
    });
});
