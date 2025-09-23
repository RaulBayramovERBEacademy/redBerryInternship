import { sortDropdown } from "../js/listingPage/sort.js";
import { renderProducts } from "./listingPage/generateProductsHTML.js";
import { getData } from "./listingPage/getProductData.js";
sortDropdown();
(async function () {
  try {
    let productData = await getData();
    renderProducts(productData.data);
  } catch (err) {
    console.log(err);
  }
})();
