import { getData } from "./getProductData.js";
import { renderProducts } from "./generateProductsHTML.js";
import { generatePagination } from "./pagination.js";
export function sortDropdown() {
  const select = document.querySelector(".select");
  const caret = document.querySelector(".caret");
  const menu = document.querySelector(".menu");
  const options = document.querySelectorAll(".menu li");
  const selected = document.querySelector(".selected");
  const sortMap = {
    ["New products first"]: "created_at",
    ["Price, low to high"]: "price",
    ["Price, high to low"]: "-price",
  };
  select.addEventListener("click", function () {
    select.classList.toggle("select-clicked");
    menu.classList.toggle("menu-open");
    caret.classList.toggle("caret-rotate");
    document
      .querySelector(".filter-dropdown")
      .classList.remove("filter-dropdown-open");
  });
  options.forEach((option) => {
    option.addEventListener("click", async function (e) {
      e.stopPropagation();
      selected.innerHTML = option.innerHTML;
      select.classList.remove("select-clicked");
      menu.classList.remove("menu-open");
      caret.classList.remove("caret-rotate");
      options.forEach((option) => {
        option.classList.remove("active");
      });
      option.classList.add("active");
      const sortParam = sortMap[option.innerText];
      try {
        let obj = { sort: sortParam };
        const data = await getData(obj);
        renderProducts(data.data);
        generatePagination(data, obj);
      } catch (error) {
        console.log(error);
      }
    });
  });
}
