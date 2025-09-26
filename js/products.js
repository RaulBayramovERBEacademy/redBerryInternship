import { sortDropdown } from "../js/listingPage/sort.js";
import { renderProducts } from "./listingPage/generateProductsHTML.js";
import { getData } from "./listingPage/getProductData.js";
import { generatePagination } from "./listingPage/pagination.js";
import { filterManager } from "./listingPage/filter.js";

(async function () {
  try {
    let obj = {};
    filterManager(obj, refreshProducts);
    sortDropdown(obj, refreshProducts);
    await refreshProducts(obj, refreshProducts);
  } catch (err) {
    console.log(err);
  }
})();
async function refreshProducts(obj) {
  let productData = await getData(obj);
  renderProducts(productData.data);
  generatePagination(productData, obj);
}
