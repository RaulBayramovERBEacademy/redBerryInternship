import { updateCartItem, removeCartItem } from "./cart/fetchCartData.js";
import { renderCart } from "./cart/renderCart.js";

export async function checkoutManager() {
  await renderCheckout();

  document
    .querySelector(".checkout-shopping-cart")
    .addEventListener("click", async (e) => {
      const container = e.target.closest(".cart-item-container");
      if (!container) return;

      const [productId, color, size] = container.dataset.key.split("-");
      let qtyEl = container.querySelector(".cart-item-quantity p");
      let quantity = parseInt(qtyEl.textContent, 10);

      // Quantity +
      if (e.target.closest(".cart-item-plus")) {
        const response = await fetch(
          `https://api.redseam.redberryinternship.ge/api/products/${productId}`,
          { method: "GET", headers: { Accept: "application/json" } }
        );
        const productData = await response.json();
        const maxQty = productData.quantity;

        if (quantity < maxQty) {
          await updateCartItem(productId, quantity + 1, color, size);
          await renderCheckout();
          await renderCart();
        } else {
          alert("Cannot add more, stock limit reached!");
        }
      }

      // Quantity -
      if (e.target.closest(".cart-item-minus")) {
        if (quantity > 1) {
          await updateCartItem(productId, quantity - 1, color, size);
        } else {
          await removeCartItem(productId, color, size);
        }
        await renderCheckout();
        await renderCart();
      }

      // Remove
      if (e.target.closest(".cart-item-remove")) {
        await removeCartItem(productId, color, size);
        await renderCheckout();
        await renderCart();
      }
    });
}
(async function () {
  try {
    await checkoutManager();
  } catch (error) {
    console.log(error);
  }
})();
document
  .getElementById("checkoutForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const CheckoutDetails = {
      name: document.getElementById("name").value.trim(),
      surname: document.getElementById("surname").value.trim(),
      email: document.getElementById("email").value.trim(),
      address: document.getElementById("address").value.trim(),
      zip_code: document.getElementById("zip").value.trim(),
    };
    console.log(CheckoutDetails);
    if (
      !CheckoutDetails.name ||
      !CheckoutDetails.surname ||
      !CheckoutDetails.email ||
      !CheckoutDetails.zip_code ||
      !CheckoutDetails.address
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch(
        "https://api.redseam.redberryinternship.ge/api/cart/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(CheckoutDetails),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Checkout successful:", data);
        await renderCart();
        await renderCheckout();
        document.querySelector(".checkout-success").classList.add("open");
        document
          .querySelector(".close-success-tab")
          .addEventListener("click", () => {
            document
              .querySelector(".checkout-success")
              .classList.remove("open");
          });
      } else {
        console.error("Checkout failed:", data);
        alert(data.message || "Checkout failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing checkout.");
    }
  });
window.addEventListener("cartUpdated", async () => {
  await renderCheckout();
});
export async function renderCheckout() {
  const cart = document.querySelector(".checkout-shopping-cart");
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
  cartData.forEach((item) => {
    cartItemsHTML += `
        <div class="cart-item-container" data-key="${item.id}-${item.color}-${
      item.size
    }">
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
                <div class="item-price">$ ${item.price * item.quantity}</div>
            </div>
            <div class="checkout-item-options-container">
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
              <p class="quantity-${String(item.id)}">${item.quantity}</p>
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
  document.querySelector(".checkout-shopping-info").innerHTML =
    shoppingCartInfo;
}
