const controls = document.querySelectorAll(".control");
let currentItem = 0;
const items = document.querySelectorAll(".item");
const maxItems = items.length;

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.sneakers').addEventListener('click', function (event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário
    // Enviar a string para a outra tela como parâmetro na URL
    var mensagem = 'sneakers';
    window.location.href = 'TelaProdutos.html?mensagem=' + mensagem;
  });
  document.querySelector('.vestuarios').addEventListener('click', function (event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário
    // Enviar a string para a outra tela como parâmetro na URL
    var mensagem = 'vestuarios';
    window.location.href = 'TelaProdutos.html?mensagem=' + mensagem;
  });
  document.querySelector('.promocoes').addEventListener('click', function (event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário
    // Enviar a string para a outra tela como parâmetro na URL
    var mensagem = 'promocoes';
    window.location.href = 'TelaProdutos.html?mensagem=' + mensagem;
  });
  document.querySelector('.acessorios').addEventListener('click', function (event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário
    // Enviar a string para a outra tela como parâmetro na URL
    var mensagem = 'acessorios';
    window.location.href = 'TelaProdutos.html?mensagem=' + mensagem;
  });
  document.querySelector('.carrinho').addEventListener('click', function (event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário
    // Enviar a string para a outra tela como parâmetro na URL
    var mensagem = id;
    console.log(mensagem)
    window.location.href = 'TelaCarrinho.html?mensagem=' + mensagem;
  });
});

controls.forEach((control) => {
  control.addEventListener("click", (e) => {
    const isLeft = e.target.classList.contains("arrow-left");

    console.log("isLeft:", isLeft);
    console.log("currentItem before:", currentItem);

    if (isLeft) {
      currentItem -= 1;
    } else {
      currentItem += 1;
    }

    if (currentItem >= maxItems) {
      currentItem = 0;
    }

    if (currentItem < 0) {
      currentItem = maxItems - 1;
    }

    console.log("currentItem after:", currentItem);

    items.forEach((item) => item.classList.remove("current-item"));

    console.log("scrollIntoView:", items[currentItem]);

    items[currentItem].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });

    items[currentItem].classList.add("current-item");
  });
});
