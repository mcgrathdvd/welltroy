import { getImage } from "astro:assets";

const sources = import.meta.glob("./assets/products/*.png", { eager: true, import: "default" });

export const productImages = Object.fromEntries(Object.entries(sources).map(([path, source]) => [
  path.split("/").pop().replace(/\.png$/, ""), { imageSource: source }
]));

const additions = import.meta.glob("./assets/new-products/*.{png,jpg}", { eager: true, import: "default" });
export const newProductSources = Object.fromEntries(Object.entries(additions).map(([path, source]) => [
  path.split("/").pop().replace(/\.(png|jpg)$/, ""), source
]));

const cache = new Map();

// Run from component rendering, after the image service module is ready.
export function getProductVisual(source) {
  if (!cache.has(source.src)) cache.set(source.src, (async () => {
    const widths = [...new Set([240, 480, 800, 960, source.width].map(width => Math.min(width, source.width)))].sort((a, b) => a - b);
    const variants = await Promise.all(widths.map((width) => getImage({
      src: source, width, format: "webp", quality: width === source.width ? 88 : 84
    })));
    return {
      image: variants[widths.indexOf(Math.min(960, source.width))].src,
      imageFull: variants[variants.length - 1].src,
      imageSrcSet: variants.map((variant, index) => `${variant.src} ${widths[index]}w`).join(", "),
      imageWidth: Math.min(960, source.width),
      imageHeight: Math.round(source.height * Math.min(960, source.width) / source.width)
    };
  })());
  return cache.get(source.src);
}
