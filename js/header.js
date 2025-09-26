document.addEventListener("DOMContentLoaded", async () => {
  const headerContainer = document.querySelector("header");
  if (headerContainer) {
    try {
      const response = await fetch("/header.html");
      const data = await response.text();
      headerContainer.innerHTML = data;
      document.querySelector(".auth-link").addEventListener("click", () => {
        window.location.href = "auth.html";
      });
      document.querySelector(".left-section").addEventListener("click", () => {
        window.location.href = "index.html";
      });
      headerManager();
    } catch (err) {
      console.error("Error occured when header was loaded:", err);
    }
  }
});
function headerManager() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;
  console.log(user);
  document.querySelector(".auth-link")?.classList.add("auth-link-close");
  document.querySelector(".right-section").innerHTML = `
    <div class="right-section-2">
    <div class="cart-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="cart-icon"
      >
        <path
          d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
        />
      </svg>
    </div>

    <div class="header-user-img-container">
      ${
        user.avatar
          ? `<img class="header-user-img" src="${user.avatar}" alt="user-image" />`
          : `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="login-icon"
    >
      <path
        d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z"
      />
    </svg>`
      }
      
    </div>
  </div>`;
}
