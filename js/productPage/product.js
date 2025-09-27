import { renderProductOption } from "./renderProductOption.js";
async function renderImageGalery() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  try {
    const response = await fetch(
      `https://api.redseam.redberryinternship.ge/api/products/${productId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    const product = await response.json();
    console.log(product);
    const galery = document.querySelector(".product-img-galery");
    const currentImg = document.querySelector(".product-selected-img");

    if (!galery || !currentImg) {
      return;
    }
    currentImg.src = product.cover_image;

    galery.innerHTML = product.images
      .map((img) => `<img src="${img}" alt="img">`)
      .join("");

    galery.querySelectorAll("img").forEach((img) => {
      img.addEventListener("click", () => {
        currentImg.src = img.src;
      });
    });
    renderProductOption(product);
  } catch (error) {
    throw error;
  }
}

renderImageGalery().catch((error) => {
  console.error(error);
});
