document.addEventListener('DOMContentLoaded', (event) => {

    const modalUsuario = document.querySelector('#cartao-usuario');
    const modalEmail = document.querySelector('#cartao-email');
    const modalSenha = document.querySelector('#cartao-senha');
    const modalEndereco = document.querySelector('#cartao-endereco');

    const closeBtns = document.querySelectorAll('.close');
    const cancelarBtns = document.querySelectorAll('.cancelar');

    const openBtn = document.querySelector('#botao-usuario');
    const openEmail = document.querySelector('#botao-email');
    const openSenha = document.querySelector('#botao-senha');

    function limparCampos() {
        document.querySelectorAll(".input-dados").forEach(input => {
            input.value = "";
        });
    }

    const openModalUsuario = () => {
        modalUsuario.style.display = 'flex';

    };

    const openModalEmail = () => {
        modalEmail.style.display = 'flex';

    };

    const openModalSenha = () => {
        modalSenha.style.display = 'flex';
    };

    const closeModalUsuario = () => {
        modalUsuario.style.display = 'none';
        limparCampos()
    };

    const closeModalEndereco = () => {
        modalEndereco.style.display = 'none';
        limparCampos()
    };

    const closeModalEmail = () => {
        modalEmail.style.display = 'none';
        limparCampos()
    };

    const closeModalSenha = () => {
        modalSenha.style.display = 'none';
        limparCampos()
    };

    // Quando o usuário clicar no botão, abre o modal
    openBtn.addEventListener('click', openModalUsuario);
    openEmail.addEventListener('click', openModalEmail);
    openSenha.addEventListener('click', openModalSenha);

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModalUsuario();
            closeModalEmail();
            closeModalSenha();
            closeModalEndereco();
        });
    });

    // Quando o usuário clicar no botão cancelar, fecha o modal
    cancelarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModalUsuario();
            closeModalEmail();
            closeModalSenha();
            closeModalEndereco();
        });
    });
});
