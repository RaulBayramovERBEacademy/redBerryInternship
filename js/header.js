document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.querySelector("header");
  if (headerContainer) {
    fetch("/header.html")
      .then((res) => res.text())
      .then((html) => {
        headerContainer.innerHTML = html;
        document.querySelector(".auth-link").addEventListener("click", () => {
          window.location.href = "auth.html";
        });
        document
          .querySelector(".left-section")
          .addEventListener("click", () => {
            window.location.href = "index.html";
          });
      })
      .catch((err) => console.error("Header yüklenirken xəta:", err));
  }
});
