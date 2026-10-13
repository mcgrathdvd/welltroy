import { orderTerms } from "./ordering.mjs";
const mailing = "Mailing & Protective Packaging";
const retail = "Retail & Product Packaging";
const packing = "Packing & Fulfillment Supplies";

const customFaq = {
  q: "Can I customize the size and branding?",
  a: "Send your required size, artwork, quantity and destination. We will confirm the available material, printing method and final specification with your quotation."
};
const sampleFaq = {
  q: "Can I request a sample before ordering?",
  a: orderTerms.sample
};

export const additionalProducts = [
  {
    slug: "die-cut-handle-shipping-bags", name: "Die-cut Handle Shipping Bags", group: mailing,
    imageKey: "die-cut-handle-shipping-bags-main", parentSlug: "poly-mailers",
    eyebrow: "Shipping bags with a carry handle",
    intro: "Mint-colored shipping bags combine a die-cut carry handle with a sealing flap. A practical format for apparel, accessories and orders that need to be carried after packing.",
    meta: "Explore mint die-cut handle shipping bags with custom Welltroy branding. Request material, size, film thickness and printing options.",
    highlights: ["Die-cut carry handle", "Sealing flap", "Mint color example", "Logo printing options"],
    sizes: [["Format", "Flexible shipping bag with die-cut handle"], ["Color shown", "Mint green with gold branding"], ["Closure", "Adhesive sealing flap; confirm configuration"], ["Customization", "Size, film thickness and printed artwork on request"]],
    applications: ["Apparel orders", "Accessories", "Retail collections", "E-commerce parcels"],
    specNeeds: ["Usable bag width and height", "Handle position and dimensions", "Film material and thickness", "Seal configuration", "Artwork and print colors"],
    faqs: [{ q: "Do these bags include cushioning?", a: "The illustrated format is a flexible outer bag. Add suitable inner protection when packing fragile or easily scratched products." }, customFaq, sampleFaq]
  },
  {
    slug: "pink-handle-mailers", name: "Pink Handle Mailers", group: mailing,
    imageKey: "pink-handle-mailers-main", parentSlug: "poly-mailers",
    gallery: [{ key: "pink-handle-mailers-packing", caption: "Handle mailer packing example for apparel and accessories." }],
    eyebrow: "Branded mailers for apparel",
    intro: "Pink and beige handle mailers provide a soft color palette for garment deliveries. The integrated carry opening and printed front make them useful for both shipping and customer handover.",
    meta: "Request pink and beige handle mailers for apparel and accessories. Explore custom branding, sizes and sealing options from Welltroy.",
    highlights: ["Pink and beige examples", "Integrated handle", "Printed front", "Apparel packing format"],
    sizes: [["Format", "Handle mailing bag"], ["Colors shown", "Pink and beige"], ["Branding example", "Single-color logo print"], ["Custom specification", "Dimensions, thickness, handle and seal to be confirmed"]],
    applications: ["Fashion orders", "Garment packing", "Accessories", "Retail handover"],
    specNeeds: ["Packed garment dimensions", "Bag width, height and flap", "Handle configuration", "Material and thickness", "Logo artwork and printing coverage"],
    faqs: [{ q: "How should I choose the bag size?", a: "Measure the folded garment or packed order and allow space for insertion and sealing. Include the required carry handle position in your enquiry." }, customFaq, sampleFaq]
  },
  {
    slug: "yellow-kraft-bubble-mailers", name: "Yellow Kraft Bubble Mailers", group: mailing,
    imageKey: "yellow-kraft-bubble-mailers-main", parentSlug: "poly-bubble-mailers",
    eyebrow: "Paper exterior with bubble cushioning",
    intro: "Yellow kraft bubble mailers pair a paper exterior with an internal bubble layer. Choose this compact mailing format for smaller items that need cushioning and a printable outer surface.",
    meta: "Explore yellow kraft bubble mailers with custom logo printing. Request usable inner dimensions, cushioning details and a quotation from Welltroy.",
    highlights: ["Yellow kraft exterior", "Bubble cushioning", "Adhesive sealing flap", "Custom logo printing"],
    sizes: [["Exterior", "Yellow kraft paper"], ["Lining", "Bubble cushioning; confirm thickness"], ["Closure", "Peel-and-seal flap"], ["Dimensions", "Confirm both outer and usable inner dimensions"]],
    applications: ["Accessories", "Small gifts", "Beauty product cartons", "Books and compact items"],
    specNeeds: ["Usable inner dimensions", "Paper weight and bubble structure", "Flap and adhesive details", "Printing artwork", "Packed product and shipping method"],
    faqs: [{ q: "Are outer dimensions the same as usable inner dimensions?", a: "The liner and sealed edges reduce the usable space. Ask for inner measurements before choosing a size for a thick or boxed product." }, customFaq, sampleFaq]
  },
  {
    slug: "printed-snack-pouches", name: "Printed Snack Pouches", group: retail,
    imageKey: "printed-snack-pouches-main", parentSlug: "stand-up-pouches",
    eyebrow: "Colorful stand-up packaging",
    intro: "Printed stand-up pouches offer a colorful presentation for nuts, snacks and other dry products. The illustrated designs show a range of artwork layouts and window options for your own branding.",
    meta: "Explore printed stand-up snack pouches with custom artwork and window options. Request material structure, size and closure details from Welltroy.",
    highlights: ["Stand-up format", "Full-color artwork", "Window options", "Dry-product packaging"],
    sizes: [["Format", "Stand-up pouch with bottom gusset"], ["Artwork", "Multiple color and print-layout examples"], ["Window", "Clear window options shown"], ["Specification", "Material structure, zipper and size confirmed per order"]],
    applications: ["Nuts and dried snacks", "Dry ingredients", "Specialty retail products", "Branded product ranges"],
    specNeeds: ["Product type and filling weight", "Width, height and bottom gusset", "Material barrier requirements", "Zipper and sealing method", "Artwork, window and destination market"],
    faqs: [{ q: "Does this product include the nuts shown?", a: "The product is the packaging pouch. Contents in the images illustrate a possible use and are not included." }, { q: "How do I confirm suitability for food packing?", a: "Share the food type, filling process, storage needs and destination market so the material structure and required food-contact documents can be reviewed." }, customFaq]
  },
  {
    slug: "custom-paper-hang-tags", name: "Custom Paper Hang Tags", group: retail,
    imageKey: "custom-paper-hang-tags-main",
    eyebrow: "Finishing details for your brand",
    intro: "Custom paper hang tags add a branded finishing touch to apparel, accessories and gifts. The orange and ivory example pairs layered cardstock with a black cord and fastener.",
    meta: "Request custom paper hang tags with your logo, artwork and cord options. Explore orange and ivory cardstock examples from Welltroy.",
    highlights: ["Custom printed cardstock", "Orange and ivory example", "Cord attachment", "Apparel and gift branding"],
    sizes: [["Format shown", "Layered rectangular paper tags"], ["Colors shown", "Orange front and ivory backing"], ["Attachment", "Black cord and fastener shown"], ["Customization", "Tag dimensions, paper weight, artwork and attachment"]],
    applications: ["Apparel", "Accessories", "Gift products", "Brand and care information"],
    specNeeds: ["Tag width, height and shape", "Paper weight and number of layers", "Front and back artwork", "Hole position", "Cord and fastener configuration"],
    faqs: [{ q: "Can the back of the tag carry product information?", a: "Include both sides in your artwork brief. Ask us to confirm printing, finishing and space for care instructions, barcodes or product details." }, customFaq, sampleFaq]
  },
  {
    slug: "kraft-padded-mailers", name: "Kraft Padded Mailers", group: mailing,
    imageKey: "kraft-padded-mailers-main", parentSlug: "poly-bubble-mailers",
    eyebrow: "Plain kraft mailing envelopes",
    intro: "Plain kraft padded mailers provide a neutral brown exterior for compact shipments. Confirm the cushioning construction and usable inner space to match the products you plan to send.",
    meta: "Explore plain brown kraft padded mailers. Request cushioning options, usable inner dimensions, custom printing and pricing from Welltroy.",
    highlights: ["Natural kraft color", "Padded mailing format", "Peel-and-seal flap", "Printing options on request"],
    sizes: [["Exterior shown", "Plain brown kraft paper"], ["Cushioning", "Select and confirm the lining structure"], ["Closure", "Adhesive strip with release liner"], ["Dimensions", "Outer dimensions and usable inner space confirmed in quote"]],
    applications: ["Small accessories", "Documents and stationery", "Compact retail orders", "Gift shipments"],
    specNeeds: ["Packed product dimensions", "Lining and cushioning requirement", "Paper specification", "Flap and seal details", "Printing and carton quantity"],
    faqs: [{ q: "Which cushioning liner should I choose?", a: "Share the packed product and shipping conditions. We can review a suitable padded construction and confirm the exact lining before quotation." }, customFaq, sampleFaq]
  },
  {
    slug: "colored-honeycomb-paper-rolls", name: "Honeycomb Paper Color Options", group: packing,
    imageKey: "colored-honeycomb-paper-rolls-main", parentSlug: "honeycomb-paper-rolls",
    gallery: [{ key: "colored-honeycomb-paper-rolls-wrapping", caption: "Expanded honeycomb paper used as a wrapping example." }],
    eyebrow: "Kraft, black and white wrapping paper",
    intro: "Kraft, black and white honeycomb paper rolls combine expandable wrapping with a choice of presentation colors. Stretch the die-cut paper around the product to create a textured protective layer.",
    meta: "Compare kraft, black and white honeycomb paper rolls for protective wrapping. MOQ starts at 500 rolls; request widths, lengths and paper specifications.",
    highlights: ["Kraft, black and white", "Expandable structure", "Roll format", "MOQ from 500 rolls"],
    sizes: [["Colors shown", "Kraft brown, black and white"], ["Catalogue widths", "30 / 38 / 40 / 50 cm; confirm current options"], ["Catalogue roll lengths", "30 / 50 / 100 / 200 / 250 m; confirm specification"], ["Minimum order", "500 rolls"]],
    applications: ["Gift wrapping", "Bottles and homeware", "Cosmetics and soaps", "Packing separation"],
    specNeeds: ["Roll width and length", "Paper color and gsm", "Product fragility", "Tissue interleaf or dispenser needs", "Carton packing"],
    faqs: [{ q: "Can honeycomb paper be used for fragile items?", a: "The expanded paper can provide wrapping and surface separation. Confirm the complete packing method for your product; very fragile, heavy or sharp items may need additional protection." }, customFaq, sampleFaq]
  },
  {
    slug: "white-nut-pouches", name: "White Printed Nut Pouches", group: retail,
    imageKey: "printed-snack-pouches-white", parentSlug: "stand-up-pouches",
    eyebrow: "White pouches with custom artwork",
    intro: "White stand-up pouches give nut and snack ranges a clear, coordinated presentation. Printed illustrations and product information can be adapted to your artwork and packaging specification.",
    meta: "Explore white printed nut and snack pouches with custom artwork. Request pouch dimensions, window options, closures and material details from Welltroy.",
    highlights: ["White pouch base", "Printed product artwork", "Stand-up bottom gusset", "Coordinated range design"],
    sizes: [["Format", "White stand-up pouch"], ["Design examples", "Pistachio, hazelnut and almond packaging artwork"], ["Customization", "Artwork, window layout and closure options"], ["Specification", "Dimensions and material structure confirmed per order"]],
    applications: ["Nut ranges", "Dried snacks", "Specialty food packaging", "Coordinated retail collections"],
    specNeeds: ["Product and desired filling weight", "Pouch width, height and gusset", "Shelf-life and barrier requirements", "Artwork and window placement", "Destination market and food-contact documentation"],
    faqs: [{ q: "Are the foods and printed weights included in the offer?", a: "This listing is for packaging. The food and design examples illustrate the presentation; confirm your own filling weight, artwork and pouch dimensions with the quotation." }, { q: "Can several designs share one pouch specification?", a: "Send the designs and quantity for each version. We will confirm artwork setup, printing and minimum order requirements for the range." }, customFaq]
  }
].map((product) => ({ ...product, isNew: true, sizeLabel: "Product details" }));
