document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.querySelector("header");
  if (headerContainer) {
    fetch("/header.html")
      .then((res) => res.text())
      .then((html) => {
        headerContainer.innerHTML = html;
      })
      .catch((err) => console.error("Header yüklenirken xəta:", err));
  }
});
