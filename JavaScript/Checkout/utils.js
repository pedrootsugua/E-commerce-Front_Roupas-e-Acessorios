function toggleCamposEndereco() {
    var checkbox = document.getElementById("enderecoSalvoRb");
    var campos = document.querySelectorAll(".formulario input[type='text']");

    for (var i = 0; i < campos.length; i++) {
        campos[i].disabled = checkbox.checked;
    }
}

document.getElementById("enderecoSalvoRb").addEventListener("change", toggleCamposEndereco);
