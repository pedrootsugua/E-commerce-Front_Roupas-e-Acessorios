document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelectorAll('.slider');
  const btnPrev = document.getElementById('prev-button');
  const btnNext = document.getElementById('next-button');

  let currentSlide = 0;

  function hideSlider() {
    slider.forEach(item => item.classList.remove('on'));
  }

  function showSlider() {
    slider[currentSlide].classList.add('on');
  }

  function nextSlider() {
    hideSlider();
    if (currentSlide === slider.length - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    showSlider();
  }

  function prevSlider() {
    hideSlider();
    if (currentSlide === 0) {
      currentSlide = slider.length - 1;
    } else {
      currentSlide--;
    }
    showSlider();
  }

  if (btnNext) {
    btnNext.addEventListener('click', nextSlider);
  }
  if (btnPrev) {
    btnPrev.addEventListener('click', prevSlider);
  }

  document.querySelector('.confira').addEventListener('click', function (event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário
    // Enviar a string para a outra tela como parâmetro na URL
    var mensagem = 'sneakers';
    window.location.href = 'TelaProdutos.html?mensagem=' + mensagem;
  });
});
