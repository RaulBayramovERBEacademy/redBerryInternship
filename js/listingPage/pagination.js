import { getData } from "./getProductData.js";
import { renderProducts } from "./generateProductsHTML.js";
export function generatePagination(data, obj) {
  let lastPage = data.meta.last_page;
  let currentPage = data.meta.current_page;
  document.querySelector(".pagination-summary").innerHTML = `Showing ${
    currentPage === 1 ? "1" : String(currentPage * 10 + 1)
  }–${currentPage === 1 ? "10" : String(currentPage * 10 + 10)} of ${
    data.meta.total
  } result`;

  let links = "";

  let pages = [];

  pages.push(1);
  if (lastPage >= 2) pages.push(2);

  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i > 2 && i < lastPage - 1) {
      pages.push(i);
    }
  }

  if (lastPage > 3) pages.push(lastPage - 1);
  if (lastPage > 2) pages.push(lastPage);

  pages = [...new Set(pages)].sort((a, b) => a - b);

  for (let i = 0; i < pages.length; i++) {
    if (i > 0 && pages[i] - pages[i - 1] > 1) {
      links += `<li class="dots">...</li>`;
    }

    if (pages[i] === currentPage) {
      links += `<li class="link active" value="${pages[i]}">${pages[i]}</li>`;
    } else {
      links += `<li class="link" value="${pages[i]}">${pages[i]}</li>`;
    }
  }
  let ul = document.querySelector(".pagination ul");
  ul.innerHTML = links;
  ul.querySelectorAll("li.link").forEach((li) => {
    li.addEventListener("click", async () => {
      obj.page = parseInt(li.getAttribute("value"));
      const newData = await getData(obj);
      renderProducts(newData.data);
      generatePagination(newData, obj);
    });
  });

  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  prevBtn.disabled = currentPage <= 1;
  nextBtn.disabled = currentPage >= lastPage;

  prevBtn.onclick = async () => {
    if (currentPage > 1) {
      obj.page = currentPage - 1;
      const newData = await getData(obj);
      renderProducts(newData.data);
      generatePagination(newData, obj);
    }
  };

  nextBtn.onclick = async () => {
    if (currentPage < lastPage) {
      obj.page = currentPage + 1;
      const newData = await getData(obj);
      renderProducts(newData.data);
      generatePagination(newData, obj);
    }
  };
}
