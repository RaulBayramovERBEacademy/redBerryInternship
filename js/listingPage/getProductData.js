export async function getData(params = {}) {
  try {
    const baseUrl = "https://api.redseam.redberryinternship.ge/api/products";
    const query = new URLSearchParams();

    // page varsa əlavə et
    if (params.page) {
      query.append("page", params.page);
    }

    // filter varsa əlavə et (nested obyekt kimi)
    if (params.filter) {
      for (const key in params.filter) {
        if (
          params.filter[key] !== undefined &&
          params.filter[key] !== null &&
          params.filter[key] !== ""
        ) {
          query.append(`filter[${key}]`, params.filter[key]);
        }
      }
    }

    // sort varsa əlavə et
    if (params.sort) {
      query.append("sort", params.sort);
    }

    // Hazır URL (query varsa əlavə olunur, yoxdursa sadəcə baseUrl işləyir)
    const url = query.toString() ? `${baseUrl}?${query.toString()}` : baseUrl;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("server error");
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
}
