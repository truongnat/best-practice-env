export const _fetch = async (url, method = "GET", body) => {
  return await (
    await fetch(url, {
      method,
      body,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": localStorage.getItem("apiKey"),
      },
    })
  ).json();
};
