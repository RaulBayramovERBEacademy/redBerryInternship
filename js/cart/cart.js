import { renderCart } from "./renderCart.js";
import { updateCartItem, removeCartItem } from "./fetchCartData.js";

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

  await renderCart();
  document.querySelector(".btn-checkout-link").addEventListener("click", () => {
    window.location.href = "/checkout.html";
  });
  document
    .querySelector(".shopping-cart")
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
        await renderCart();
      }

      // Remove
      if (e.target.closest(".cart-item-remove")) {
        await removeCartItem(productId, color, size);
        await renderCart();
      }
    });
}
