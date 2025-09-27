export async function cartManager() {
  document.querySelector(".cart-icon").addEventListener("click", function () {
    document
      .querySelector(".cart-sidebar-container")
      .classList.toggle("cart-sidebar-container-open");
  });
  document
    .querySelector(".close-cart-icon")
    .addEventListener("click", function () {
      document
        .querySelector(".cart-sidebar-container")
        .classList.remove("cart-sidebar-container-open");
    });
  const cart = document.querySelector(".shopping-cart");
  let cartItemsHTML = "";
  const token = localStorage.getItem("token");
  const response = await fetch(
    `https://api.redseam.redberryinternship.ge/api/cart`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const cartData = await response.json();
  console.log(cartData);
  cartData.forEach((item) => {
    cartItemsHTML += `
        <div class="cart-item-container">
          <div class="cart-item-img-container">
          <img class="cart-item-img" src="${item.cover_image}" alt="" />
          </div>
          <div class="cart-item-info-container">
            <div class="cart-item-info">
                <div class="item-info">
                    <p class="item-title">${item.name}</p>
                    <p class="item-color">${item.color}</p>
                    <p class="item-size">${item.size}</p>
                </div>
                <div class="item-price">$ ${item.price}</div>
            </div>
            <div class="cart-item-options-container">
            <div class="cart-item-quantity">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="cart-item-minus"
              >
                <path
                  d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z"
                />
              </svg>
              <p>${item.quantity}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="cart-item-plus"
              >
                <path
                  d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"
                />
              </svg>
            </div>
            <div class="cart-item-remove">Remove</div>
            </div>
        </div>
          
        </div>
    `;
  });
  cart.innerHTML = cartItemsHTML;
  let subtotal = cartData.reduce((sum, item) => sum + item.total_price, 0);
  let delivery = cartData.length * 2.5;
  let total = subtotal + delivery;
  let shoppingCartInfo = `
        <p class="items-subtotal">Items Subtotal <span>$ ${String(subtotal)}
</span></p>
        <p class="delivery">Delivery <span>$ ${String(delivery)}</span></p>
        <p class="total">Total <span>$ ${String(total)} </span></p>
  `;
  document.querySelector(".shopping-cart-info").innerHTML = shoppingCartInfo;
  document.querySelector(".btn-checkout-link").addEventListener("click", () => {
    window.location.href = "/checkout.html";
  });
}
