import { sortDropdown } from "../js/listingPage/sort.js";
import { renderProducts } from "./listingPage/generateProductsHTML.js";
import { getData } from "./listingPage/getProductData.js";
import { createPagination } from "./listingPage/pagination.js";
sortDropdown();

(async function () {
  try {
    let productData = await getData();
    renderProducts(productData.data);
    const element = document.querySelector(".pagination ul");
    let totalPages = 20;
    let page = 10;
    element.innerHTML = createPagination(totalPages, page);
  } catch (err) {
    console.log(err);
  }
})();
