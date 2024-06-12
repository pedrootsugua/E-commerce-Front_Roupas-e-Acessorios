const senha = document.getElementById("senha")
const modal = document.querySelector("#email")
const btnOk = document.getElementById('ok'); 

function verificacao(){
    senha.addEventListener('click', function (event) {
        event.preventDefault();
        modal.style.display = "flex"
    });

    const closeModal = () => {
        modal.style.display = 'none';
    };
    
    if (btnOk) {
        btnOk.addEventListener('click', (event) => {
            console.log("Botão OK clicado");
            closeModal();
        });
    } else {
        console.error("Elemento '.inicial' não encontrado.");
    }
    
    // Adiciona evento para fechar o modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });
}

verificacao()