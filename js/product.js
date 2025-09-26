// Sonra API-dən məhsulun detalını çək

async function renderImageGalery() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
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
  const galery = document.querySelector(".product-img-galery");
  const currentImg = document.querySelector(".product-selected-img");

  if (!galery || !currentImg) return;

  currentImg.src = product.cover_image; //

  galery.innerHTML = product.images
    .map((img) => `<img src="${img}" alt="img">`)
    .join("");

  galery.querySelectorAll("img").forEach((img) => {
    img.addEventListener("click", () => {
      currentImg.src = img.src;
    });
  });
  let productOptionsContainer = `
    <div class="title-price-container">
          <h1></h1>
          <p></p>
        </div>
        <div class="product-options-container">
          <div class="avaliable-colors-container">
            <p></p>
            <div class="avaliable-colors"></div>
          </div>
          <div class="avaliable-sizes-container">
            <p></p>
            <div class="avaliable-sizes"></div>
          </div>
          <div class="quantity-container">
            <p></p>
            <div class="quantity">
              <label for="qty">Adet:</label>
              <select id="qty" name="qty">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
        </div>
        <div class="product-add-to-cart-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="product-add-to-cart-icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          <p>Add to cart</p>
        </div>
        <div class="product-details-container">
          <div class="product-deatils title">
            <p>Detail:</p>
            <img src="" alt="product-brand" />
          </div>
          <div class="details">
            <p class="brand"></p>
            <p class="detail"></p>
          </div>
        </div>
  `;
}
