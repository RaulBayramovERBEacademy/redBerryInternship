export function filterManager(obj, refreshProducts) {
  document
    .querySelector(".filter-title-icon")
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

  const applyBtn = document.querySelector(".filter-apply");
  applyBtn.addEventListener("click", async function () {
    let from = document.getElementById("price-from").value;
    let to = document.getElementById("price-to").value;

    obj.filter = {};

    if (from) obj.filter.price_from = Number(from);
    if (to) obj.filter.price_to = Number(to);

    document
      .querySelector(".filter-dropdown")
      .classList.remove("filter-dropdown-open");
    await refreshProducts(obj);
  });
}
