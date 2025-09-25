export function filterManager(data, obj) {
  document
    .querySelector(".filter-container")
    .addEventListener("click", function () {
      document
        .querySelector(".filter-dropdown")
        .classList.toggle("filter-dropdown-open");
      document.querySelector(".menu").classList.remove("menu-open");
      document
        .querySelector(".pagination-summary")
        .classList.toggle("pagination-summary-close");
      document
        .querySelector(".product-operations")
        .classList.toggle("product-operations-filter-open");
      document
        .querySelector(".divider")
        .classList.toggle("divider-filter-open");
    });
}
