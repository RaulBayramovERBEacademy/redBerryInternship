export async function getData(params = {}) {
  try {
    const baseUrl = "https://api.redseam.redberryinternship.ge/api/products";
    const query = new URLSearchParams();
    if (params.page) {
      query.append("page", params.page);
    }

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

    if (params.sort) {
      query.append("sort", params.sort);
    }

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
