import { sortDropdown } from "../js/listingPage/sort.js";
import { renderProducts } from "./listingPage/generateProductsHTML.js";
import { getData } from "./listingPage/getProductData.js";
import { generatePagination } from "./listingPage/pagination.js";
import { filterManager } from "./listingPage/filter.js";
sortDropdown();
filterManager();
(async function () {
  try {
    let productData = await getData();
    renderProducts(productData.data);
    generatePagination(productData, {});
  } catch (err) {
    console.log(err);
  }
})();
