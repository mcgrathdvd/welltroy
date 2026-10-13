import { getImage } from "astro:assets";

const sources = import.meta.glob("./assets/factory/*.png", { eager: true, import: "default" });

export const factoryPhotos = [
  { image: "bag-production", title: "Bag production", detail: "A wider view of the bag making equipment", alt: "Bag making equipment arranged across a production workshop" },
  { image: "film-handling", title: "Film handling", detail: "Film web and roll handling equipment", alt: "Production equipment with film rollers and printed roll materials" },
  { image: "printing-equipment", title: "Printing equipment", detail: "A closer view of the printing equipment", alt: "Printing equipment with a roll-fed film path" },
  { image: "production-lines", title: "Production lines", detail: "A wider view of roll-fed equipment", alt: "A wide workshop view showing rows of roll-fed production equipment" },
  { image: "printing-workshop", title: "Printing workshop", detail: "Printing equipment and work area", alt: "Printing equipment and a sheet inspection workstation" },
  { image: "printed-rolls", title: "Printed roll handling", detail: "Printed rolls and material handling equipment", alt: "Printed film rolls on production and handling equipment" },
  { image: "roll-fed-production", title: "Roll-fed production", detail: "Roll materials and workshop equipment", alt: "A white roll material passing through workshop equipment" }
].map((photo, index) => ({ ...photo, number: String(index + 1).padStart(2, "0"), source: sources[`./assets/factory/${photo.image}.png`] }));

const cache = new Map();
export function getFactoryVisual(source) {
  if (!cache.has(source.src)) cache.set(source.src, (async () => {
    const widths = [480, 960, source.width];
    const variants = await Promise.all(widths.map((width) => getImage({
      src: source, width, format: "webp", quality: width === source.width ? 90 : 85
    })));
    return {
      image: variants[1].src,
      full: variants[2].src,
      srcset: variants.map((variant, index) => `${variant.src} ${widths[index]}w`).join(", "),
      width: 960,
      height: Math.round(source.height * 960 / source.width)
    };
  })());
  return cache.get(source.src);
}
