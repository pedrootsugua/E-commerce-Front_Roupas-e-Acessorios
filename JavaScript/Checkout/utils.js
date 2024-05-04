function toggleCamposEndereco() {
    var checkbox = document.getElementById("check");
    var campos = document.querySelectorAll(".formulario input[type='text']");

    for (var i = 0; i < campos.length; i++) {
        // Habilita todos os campos, exceto o campo de frete
        if (campos[i].id !== "frete" && campos[i].id !== "enderecoSalvo") {
            campos[i].disabled = checkbox.checked;
        }
    }

    if (checkbox.checked) {
        limpar_Campos();
    }
}

function limpar_Campos() {
    document.getElementById("cep").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("logradouro").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("cidade").value = "";
}

document.getElementById("check").addEventListener("change", toggleCamposEndereco);
