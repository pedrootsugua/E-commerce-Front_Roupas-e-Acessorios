let id = 0;
let nome = ""

verificaAutenticacao()


function verificaAutenticacao(){
    fetch('http://localhost:8080/api/login/autenticacao', {
    method: 'GET',
    })
    .then(response => {
        if (response.ok) { 
            return response.json(); 
        } else {
            throw new Error('Erro ao fazer login');
        }
    })
    .then(data => {
        console.log(data);
        const autenticado = data.autenticado;
        id = data.credencialModel.idUsuario;
        if (autenticado === true){
            document.getElementById("login_user").innerHTML = "Olá"
            buscarUsuario(id)
        }
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error);
        alert("Erro ao acessar usuário. Por favor, tente novamente.");
    });
}


function buscarUsuario(id){
    console.log(id)
    fetch('http://localhost:8080/api/usuarios/' + id, {
    method: 'GET',
    })
    .then(response => {
        if (response.ok) { 
            return response.json();   
        } else {
            throw new Error('Erro ao fazer login');
        }
    })
    .then(data => {
        console.log(data);
        nome = data.nome;
        // Divida a string em um array de palavras usando o espaço como delimitador
        let palavras = nome.split(" ");
        // Acesse a primeira palavra, que está no índice 0 do array
        let primeiroNome = palavras[0];
        document.getElementById("login_user").innerHTML = "Olá, " + primeiroNome;
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error);
        alert("Erro ao acessar usuário. Por favor, tente novamente.");
    });
}  

