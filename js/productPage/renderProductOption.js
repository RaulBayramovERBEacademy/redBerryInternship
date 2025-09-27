export function renderProductOption(product) {
  let productOptionsContainerHTML = `
    <div class="title-price-container">
          <h1>${product.name}</h1>
          <p>${product.price}</p>
        </div>
        <div class="product-options-container">
          <div class="avaliable-colors-container">
            <p>Color: ${product.color}</p>
            <div class="avaliable-colors">
              ${product.available_colors
                .map(
                  (color) =>
                    `<div style="background-color:${color.toLowerCase()}" class="color"></div>`
                )
                .join("")}

            </div>
          </div>
          <div class="avaliable-sizes-container">
            <p>Size: ${product.size}</p>
            <div class="avaliable-sizes">
            ${product.available_sizes
              .map((size) => {
                return `<div class = "size-${size}">${size}</div>`;
              })
              .join("")}
            </div>
          </div>
          <div class="quantity-container">
            <p>Quantity</p>
            <div class="quantity">
              <label for="qty">Quantity</label>
                <select id="qty" name="qty">
                  ${Array.from(
                    { length: product.quantity },
                    (_, i) => `<option value="${i + 1}">${i + 1}</option>`
                  ).join("")}
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
            <img class="brand-image" src="${
              product.brand.image
            }" alt="product-brand-image" />
          </div>
          <div class="details">
            <p class="brand">Brand: ${product.brand.name}</p>
            <p class="detail">${product.description}</p>
          </div>
        </div>
  `;
  document.querySelector(".product-options-container").innerHTML =
    productOptionsContainerHTML;
}
