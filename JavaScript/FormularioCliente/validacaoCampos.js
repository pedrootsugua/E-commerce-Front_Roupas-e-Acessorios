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

document.getElementById("dtNascimento").addEventListener("change", function () {
    validarData();
});

function validarData() {
    var inputDate = document.getElementById("dtNascimento").value;
    var selectedDate = new Date(inputDate);
    var selectedYear = selectedDate.getFullYear();

    if (selectedYear < 1900 || selectedYear > 2024) {
        document.getElementById("dtNascimento").classList.add("is-invalid");
        document.querySelector("#dtNascimento + .invalid-feedback").textContent = "Informe uma data de nascimento entre 1900 e 2024.";
    } else {
        document.getElementById("dtNascimento").classList.remove("is-invalid");
        document.querySelector("#dtNascimento + .invalid-feedback").textContent = "";
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

function validarSenha() {
    var senha = document.getElementById("senha").value;
    var confirmSenha = document.getElementById("confirmSenha").value;

    if (senha.length < 5 || confirmSenha.length < 5) {
        document.getElementById("senha").classList.add("is-invalid");
        document.getElementById("confirmSenha").classList.add("is-invalid");
        document.querySelector("#confirmSenha + .invalid-feedback").textContent = "A senha deve ter no mínimo 5 caracteres.";
        return false;
    } else if (senha !== confirmSenha) {
        document.getElementById("senha").classList.add("is-invalid");
        document.getElementById("confirmSenha").classList.add("is-invalid");
        document.querySelector("#confirmSenha + .invalid-feedback").textContent = "As senhas devem ser iguais.";
        return false;
    } else {
        document.getElementById("senha").classList.remove("is-invalid");
        document.getElementById("confirmSenha").classList.remove("is-invalid");
        document.querySelector("#confirmSenha + .invalid-feedback").textContent = "";
    }
}

document.getElementById("senha").addEventListener("input", validarSenha);

document.getElementById("confirmSenha").addEventListener("input", validarSenha)
