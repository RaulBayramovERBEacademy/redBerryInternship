export async function updateCartItem(productId, quantity, color, size) {
  const token = localStorage.getItem("token");
  await fetch(
    `https://api.redseam.redberryinternship.ge/api/cart/products/${productId}`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity, color, size }), // ✅
    }
  );
}

export async function removeCartItem(productId, color, size) {
  const token = localStorage.getItem("token");
  await fetch(
    `https://api.redseam.redberryinternship.ge/api/cart/products/${productId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ color, size }), // ✅ bazı API'ler DELETE ile body alıyor
    }
  );
}
