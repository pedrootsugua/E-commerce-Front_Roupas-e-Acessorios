import{
    consultar
}from '../Login/ConexaoAPI.js';


export function acesso(){
    console.log("ola mundo")
    console.log(document.getElementById("login_user").innerHTML = "I have changed!")
    return true
}