const element = document.querySelector(".pagination ul");

export function createPagination(totalPages, page) {
  //page 3
  let liTag = "";
  let active;
  let beforePage = page - 1; //2
  let afterPage = page + 1; //4
  if (page > 1) {
    liTag += `<li class="btn prev"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
  }
  if (page > 2) {
    liTag += `<li class="first numb"><span>1</span></li>`;
    if (page > 3) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }
  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }
  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      continue;
    }
    if (plength == 0) {
      plength = plength + 1;
    }
    if (page == plength) {
      active = "active";
    } else {
      active = "";
    }
    liTag += `<li class="numb ${active}" ><span>${plength}</span></li>`;
  }
  if (page < totalPages - 1) {
    if (page < totalPages - 2) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb"><span>${totalPages}</span></li>`;
  }
  if (page < totalPages) {
    liTag += `<li class="btn next" ><span>Next <i class="fas fa-angle-right"></i></span></li>`;
  }
  element.querySelectorAll("li").forEach((li) => {
    li.addEventListener("click", () => {
      if (li.classList.contains("numb")) {
        const newPage = parseInt(li.innerText);
        createPagination(totalPages, newPage);
      } else if (li.classList.contains("prev")) {
        createPagination(totalPages, page - 1);
      } else if (li.classList.contains("next")) {
        createPagination(totalPages, page + 1);
      } else if (li.classList.contains("first")) {
        createPagination(totalPages, 1);
      } else if (li.classList.contains("last")) {
        createPagination(totalPages, totalPages);
      }
    });
  });
  element.innerHTML = liTag;
  return liTag;
}
