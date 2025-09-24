export function renderProducts(products) {
  let productContainer = document.querySelector(".products-container");
  let productHTML = "";
  products.forEach((element) => {
    productHTML += `
        <div class="product">
          <div class="product-img-container">
            <img class="product-img" src="${element.cover_image}" alt="${
      element.name
    }"/>
          </div>
          <div class="product-info">
            <p class="product-title">${element.name}</p>
            <p class="product-price">${String(element.price)}</p>
          </div>
        </div>`;
  });
  productContainer.innerHTML = productHTML;
}
