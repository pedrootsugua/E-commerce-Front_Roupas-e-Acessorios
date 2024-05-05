let id = 0;

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
            document.getElementById("login_user").innerHTML = "Olá";
        }
        // e assim por diante, dependendo dos campos do objeto retornado
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error);
        alert("Erro ao acessar usuário. Por favor, tente novamente.");
    });


    fetch('http://localhost:8080/api/login/endereco?id=' + id, {
    method: 'GET',
    })
    .then(response => {
        if (response.ok) { 
          /*  return response.json(); */    
        } else {
            throw new Error('Erro ao fazer login');
        }
    })
    .then(data => {
        // console.log(data);
        // const autenticado = data.autenticado;
        // if (autenticado === true){
        //     document.getElementById("login_user").innerHTML = "Penis";
        // }
        // // e assim por diante, dependendo dos campos do objeto retornado
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error);
        alert("Erro ao acessar usuário. Por favor, tente novamente.");
    });
    // exibirUser();
    // function exibirUser(){
    //     if (autenticado === true){
    //         document.getElementById("login_user").innerHTML = "Penis";
    //     }
    // }