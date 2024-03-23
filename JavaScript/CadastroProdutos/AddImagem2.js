const inputFile2 = document.querySelector("#picture__inputt");
const pictureImage2 = document.querySelector(".picture__imagee");
const pictureImageTxt2 = "Escolha uma imagem";
pictureImage2.innerHTML = pictureImageTxt2;

inputFile2.addEventListener("change", function (e) {
  const inputTarget = e.target;
  const file = inputTarget.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
      const readerTarget = e.target;

      const img = document.createElement("img");
      img.src = readerTarget.result;
      img.classList.add("picture__img");

      pictureImage2.innerHTML = "";
      pictureImage2.appendChild(img);
    });

    reader.readAsDataURL(file);
  } else {
    pictureImage2.innerHTML = pictureImageTxt2;
  }
});
