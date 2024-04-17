document.getElementById("cpf").addEventListener("blur", function () {
    var cpf = this.value;

    if (!cpf.match(/^\d{11}$/)) {
        this.classList.add("is-invalid");
        this.nextElementSibling.textContent = "Digite um CPF válido contendo exatamente 11 dígitos.";
    } else {
        this.classList.remove("is-invalid");
        this.nextElementSibling.textContent = "";
    }
});

document.getElementById("cpf").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, '');

    if (this.value.length > 11) {
        this.value = this.value.slice(0, 11);
    }
});

document.getElementById("telefone").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, '');

    if (this.value.length > 11) {
        this.value = this.value.slice(0, 11);
    }

    var formattedPhone = '';
    for (var i = 0; i < this.value.length; i++) {
        if (i === 2) {
            formattedPhone += ' ';
        }
        formattedPhone += this.value.charAt(i);
    }
    this.value = formattedPhone;
});

function validarAno() {
    var inputDate = document.getElementById("dtNascimento").value;
    var selectedDate = new Date(inputDate);
    var selectedYear = selectedDate.getFullYear();

    if (selectedYear < 1900 || selectedYear > 2024) {
        alert("Por favor, selecione um ano entre 1900 e 2024.");
        document.getElementById("dtNascimento").value = "";
    }
}

document.getElementById("cep").addEventListener("blur", function () {
    var cpf = this.value;

    if (!cpf.match(/^\d{8}$/)) {
        this.classList.add("is-invalid");
        this.nextElementSibling.textContent = "Digite um CEP válido contendo exatamente 8 dígitos.";
    } else {
        this.classList.remove("is-invalid");
        this.nextElementSibling.textContent = "";
    }
});

document.getElementById("cep").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, '');

    if (this.value.length > 8) {
        this.value = this.value.slice(0, 8);
    }
});

document.getElementById("senha").addEventListener("blur", function () {
    var senha = this.value;

    if (senha.length < 5) {
        this.classList.add("is-invalid");
        this.nextElementSibling.textContent = "A senha deve conter no mínimo 5 caracteres.";
    } else {
        this.classList.remove("is-invalid");
        this.nextElementSibling.textContent = "";
    }
});

document.getElementById("confirmSenha").addEventListener("blur", function () {
    var senha = document.getElementById("senha").value;
    var confirmSenha = this.value;

    if (senha !== confirmSenha) {
        this.classList.add("is-invalid");
        this.nextElementSibling.textContent = "As senhas não correspondem.";
    } else {
        this.classList.remove("is-invalid");
        this.nextElementSibling.textContent = "";
    }
});