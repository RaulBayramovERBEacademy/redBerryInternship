function generateProductsHTML(products) {
  let productContainer = document.querySelector(".products-container");
  let productHTML = "";
  products.forEach(async (element) => {
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

async function getData(filter = "", sorting = "") {
  try {
    let response = await fetch(
      "https://api.redseam.redberryinternship.ge/api/products",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("server error");
    }
    return await response.json();
  } catch (err) {
    throw err;
  }
}
(async function () {
  try {
    let productData = await getData();
    generateProductsHTML(productData.data);
  } catch (err) {
    console.log(err);
  }
})();
