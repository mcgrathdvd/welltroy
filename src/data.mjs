import { products as records, site, productGroups } from "./product-data.mjs";
import { productImages, newProductSources } from "./product-images.mjs";

export { site, productGroups };
export const products = records.map((product) => product.isNew ? {
  ...product,
  imageSource: newProductSources[product.imageKey],
  gallery: (product.gallery || []).map((photo) => ({ ...photo, imageSource: newProductSources[photo.key] }))
} : { ...product, ...productImages[product.slug] });
export const catalogueProducts = products.filter((product) => !product.isNew);
export const newProducts = products.filter((product) => product.isNew);
