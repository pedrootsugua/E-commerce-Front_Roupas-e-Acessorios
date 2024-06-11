var params = new URLSearchParams(window.location.search);
var userId = params.get('userId');

function formatarData(data) {
    return data.toISOString().split('T')[0]
}

function esconderLoading() {
    document.querySelector(".loading-modal").style.display = "none";
}

function mostrarLoading() {
    const loading = document.querySelector('.loading-modal');
    if (loading) {  // Verifique se o elemento existe
        loading.style.display = 'flex';
        document.querySelector(".principal").classList.add('blur');

        // Oculta o loading após 3 segundos
        setTimeout(function () {
            loading.style.display = 'none';
            document.querySelector(".principal").classList.remove('blur');
            location.href = location.href;
        }, 3000);
    } else {
        console.error('Elemento de loading não encontrado');
    }
}
