const BASE_URL_1 = "https://api.api-store.workers.dev/api/bazardor";
const BASE_URL_2 = "https://api.abcz.workers.dev/api/bazardor";

// try the first url, if it fails use the second one
async function getData(path) {
  try {
    const res = await fetch(BASE_URL_1 + path);
    if (!res.ok) throw new Error("failed");
    return await res.json();
  } catch (err) {
    const res2 = await fetch(BASE_URL_2 + path);
    if (!res2.ok) return null;
    return await res2.json();
  }
}

export async function getProducts() {
  const data = await getData("/products");
  return data || [];
}

export async function getProductsByCategory(slug) {
  const data = await getData("/products?category=" + slug);
  return data || [];
}

export async function getProduct(slug) {
  // api single product uses id, so find by slug from all products
  const all = await getProducts();
  const found = all.find((p) => p.slug === slug);
  if (!found) return null;
  const detail = await getData("/products/" + found.id);
  return detail || found;
}

export async function getCategories() {
  const data = await getData("/categories");
  return data || [];
}

export async function getCategory(slug) {
  const all = await getCategories();
  const found = all.find((c) => c.slug === slug);
  return found || null;
}
