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
    slug: "custom-stand-up-pouches", name: "Custom Stand Up Pouches", group: retail,
    imageKey: "custom-stand-up-pouches-main", parentSlug: "stand-up-pouches",
    eyebrow: "Made-to-order flexible packaging",
    intro: "Build a stand-up pouch around the actual product, filling process and shelf life. Choose the bottom gusset, closure, material structure, print and finish together, then approve a filled sample before production. The image shows color and size examples; it does not establish one standard specification for every pouch.",
    meta: "Specify custom stand-up pouches by fill amount, material barrier, zipper or window, artwork and finish. Compare samples and request a product-specific quote.",
    imageDescription: "Range of colorful custom stand-up pouch examples in different sizes",
    imageNote: "Supplier range image. Colors and sizes are examples; confirm the selected construction and proof before ordering.",
    highlights: ["Custom size and bottom gusset", "Material and barrier options", "Zipper, window and notch options", "Digital or gravure printing to confirm"],
    sizes: [["Format", "Stand-up pouch with bottom gusset; specify filled shape and usable capacity"], ["Size", "Width × total height × bottom gusset, with the measurement convention confirmed on a dieline"], ["Materials", "Layer structure selected for contents, sealing, barrier and destination-market requirements"], ["Closures and features", "Zipper, tear notch, clear window and other fittings subject to the chosen construction"], ["Print and finish", "Digital or gravure process; matte, gloss and specialty effects reviewed against artwork and quantity"]],
    applications: ["Dry food and snack packaging with approved materials", "Beauty and personal care", "Pet products", "Craft and hobby refills", "Retail kits and accessories"],
    specNeeds: ["Contents, fill weight or volume, product density and target shelf life", "Width, total height, bottom gusset and required usable opening", "Material structure, barrier, food-contact and recycling requirements", "Zipper, tear notch, window, valve, spout or handle as applicable", "Filling temperature, sealing method and machine compatibility", "Editable front, back and gusset artwork; print colors and finish", "Quantity per size and design, destination and sample requirements"],
    alert: "The supplier images show possible materials and a 'recyclable' label, but do not establish that every custom construction is recyclable or suitable for food. Confirm the exact laminate, test documents and local collection route for the chosen specification. Heat or retort use needs separate validation.",
    relatedGuide: { title: "Plan the size, material and artwork of a stand-up pouch", href: "/guides/custom-stand-up-pouch-specification/" },
    faqs: [
      { q: "How do I measure a custom stand-up pouch?", a: "Specify width, total height and bottom gusset on an approved dieline. The zipper, top seal, side seals and gusset reduce usable space. Fill a sample with the real product to verify capacity and shelf presentation." },
      { q: "Which material should I choose?", a: "Start with the contents, moisture or oxygen sensitivity, filling and sealing process, intended shelf life and destination market. Ask for the exact layer structure and relevant tests for the selected pouch. A material name or photo alone is insufficient." },
      { q: "Can I order a recyclable or food-contact pouch?", a: "Potential options depend on the complete laminate, inks, adhesives, closures and local recycling system or food-contact rules. State the market and required standard, then request specification-specific documents before making a claim." },
      { q: "Are zippers, windows and specialty finishes available together?", a: "The images show examples of zippers, windows, notches and several finishes. Compatibility depends on the pouch structure, size, artwork and production method; confirm the exact combination on a proof and sample." },
      { q: "What artwork files should I send?", a: "Send editable AI, EPS or PDF artwork when possible, with front, back and gusset panels, fonts or outlines, color references and a dieline. PSD or other formats may need conversion. Confirm bleed, safe area and print method with the final proof." },
      { q: "What is needed for a quote?", a: "Send product and fill details, proposed dimensions, material and barrier needs, closure, finish, artwork, quantity per size and design, destination and any compliance documents or sample tests required." }
    ]
  },
  {
    slug: "printed-snack-pouches", name: "Printed Snack Pouches", group: retail,
    imageKey: "printed-snack-pouches-main", parentSlug: "stand-up-pouches",
    eyebrow: "Colorful stand-up packaging",
    intro: "Printed snack pouches use a stand-up bottom for shelf display and room for brand artwork. Specify the actual snack, fill weight, shelf-life target and filling method before choosing a barrier structure, zipper or window; artwork examples do not confirm food-contact suitability.",
    meta: "Plan printed stand-up snack pouches by fill weight, barrier, zipper or window, artwork and destination-market documentation. Request a filled sample before production.",
    highlights: ["Stand-up bottom", "Custom printed panels", "Window options to confirm", "Food-contact structure to verify"],
    sizes: [["Format", "Stand-up pouch with bottom gusset; confirm usable fill volume"], ["Artwork", "Front, back and gusset design reviewed on the final dieline"], ["Window", "Clear window examples shown; confirm position and barrier effect"], ["Specification", "Material layers, zipper, seal and food-contact documents selected per product"]],
    applications: ["Nuts and dried snacks", "Dry ingredients", "Specialty retail products", "Branded product ranges"],
    specNeeds: ["Snack type, fill weight, shelf-life target and storage conditions", "Width, total height, bottom gusset and usable opening", "Oxygen, moisture and light barrier requirements", "Zipper, tear notch, window and heat-seal method", "Artwork for front, back and gusset; quantity per design", "Destination market and food-contact documentation"],
    relatedGuide: { title: "Plan a custom stand-up pouch specification", href: "/guides/custom-stand-up-pouch-specification/" },
    faqs: [{ q: "Does this product include the snacks shown?", a: "This listing is for packaging only. Filled or printed examples illustrate possible presentation and do not establish a standard capacity." }, { q: "How do I confirm suitability for food packing?", a: "Share the food type, filling process, storage and shelf-life needs and destination market. Review the exact laminate and required food-contact documents, then test the filled pouch." }, { q: "Does a clear window change the barrier?", a: "It may. State the product's light, oxygen and moisture sensitivities; confirm the window film and complete pouch structure before approving shelf-life claims." }, customFaq]
  },
  {
    slug: "custom-paper-hang-tags", name: "Custom Paper Hang Tags", group: retail,
    imageKey: "custom-paper-hang-tags-main",
    eyebrow: "Finishing details for your brand",
    intro: "Plan a paper hang tag around the product information it must carry and the way it attaches. The orange and ivory image is an edited design reference; confirm the actual tag dimensions, paper, print, hole position and cord or fastener with your quotation.",
    meta: "Plan custom paper hang tags for apparel and gifts. Confirm tag size, two-sided artwork, paper, hole position and attachment before requesting a quote.",
    imageDescription: "Edited design reference showing orange and ivory paper hang tags with Welltroy branding",
    imageNote: "Edited product image for design reference. Branding, paper, attachment and final construction require approval on your specification.",
    highlights: ["Custom printed cardstock", "Orange and ivory example", "Cord attachment", "Apparel and gift branding"],
    sizes: [["Format shown", "Layered rectangular paper tags; confirm required width and height"], ["Colors shown", "Orange front and ivory backing in the edited reference"], ["Attachment", "Black cord and fastener shown; confirm hole and attachment"], ["Customization", "Paper, artwork, print finish and quantity confirmed per order"]],
    applications: ["Apparel", "Accessories", "Gift products", "Brand and care information"],
    specNeeds: ["Required width, height, shape and quantity", "Paper weight and number of layers", "Front and back artwork and print colors", "Hole position and diameter", "Cord and fastener configuration", "Destination and any required care or barcode text"],
    relatedGuide: { title: "Prepare logo and two-sided print artwork", href: "/guides/logo-artwork-checklist/" },
    faqs: [
      { q: "Are the pictured tag dimensions a standard size?", a: "No dimensions are confirmed by the design reference. Send your target width and height, shape and the product it will attach to; request a physical proof before a production size is approved." },
      { q: "Can the back carry care information or a barcode?", a: "Include both sides in your artwork brief. Confirm the available print area, readable type and barcode requirements on a proof. The tag itself does not establish compliance with any market labeling rules." },
      { q: "How should I specify the hole and cord?", a: "Provide the intended attachment point, hole location and preferred cord or fastener, then test the assembled tag on the actual product. The image shows one example, not a promise of every combination." },
      { q: "Can you match our brand colors and finish?", a: "Send editable artwork and color references. Paper stock, printing method and finish affect the result; approve a proof or sample for the chosen specification." },
      { q: "Is the Welltroy branding in the image an actual production sample?", a: "The displayed branding was edited onto a product image as a design reference. It does not document a completed order or establish a specific print method." },
      { q: "What should I send for a hang tag quote?", a: "Share dimensions or a die line, paper and layer preference, artwork for both sides, hole and attachment details, quantity per design, destination and any required information or barcode." }
    ]
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
    intro: "Kraft, black and white honeycomb paper rolls start from 1 complete roll (1 pc). Choose the width, length and color, then trial the expanded wrap with your actual product and complete pack before planning repeat quantities.",
    meta: "Honeycomb paper color options from 1 roll (1 pc). Compare kraft, black and white, widths and lengths; confirm the specification and trial your packing method.",
    highlights: ["Kraft, black and white", "Expandable structure", "Roll format", "MOQ from 1 roll (1 pc)"],
    sizes: [["Colors shown", "Kraft brown, black and white"], ["Catalogue widths", "30 / 38 / 40 / 50 cm; confirm current options"], ["Catalogue roll lengths", "30 / 50 / 100 / 200 / 250 m; confirm specification"], ["Minimum order", "1 complete roll (1 pc)"]],
    applications: ["Gift wrapping", "Bottles and homeware", "Cosmetics and soaps", "Packing separation"],
    specNeeds: ["Roll width and length", "Paper color and gsm", "Product fragility", "Tissue interleaf or dispenser needs", "Carton packing"],
    faqs: [{ q: "Can I buy one roll of the honeycomb paper color options?", a: "Yes. The minimum is 1 complete roll (1 pc). Confirm the current color, width, roll length and paper specification with your quotation; the unit is a roll, not a cut sheet. Delivery arrangements and charges are confirmed separately." }, { q: "Can honeycomb paper be used for fragile items?", a: "The expanded paper can provide wrapping and surface separation. Confirm the complete packing method for your product; very fragile, heavy or sharp items may need additional protection." }, customFaq, sampleFaq]
  },
  {
    slug: "white-nut-pouches", name: "White Printed Nut Pouches", group: retail,
    imageKey: "printed-snack-pouches-white", parentSlug: "stand-up-pouches",
    eyebrow: "White pouches with custom artwork",
    intro: "White printed pouches can give a nut range a consistent visual system while each flavor or ingredient uses its own artwork. Keep the same pouch dimensions only after testing the actual fill, headspace and seal for every product; confirm barrier and food-contact requirements by market.",
    meta: "Specify coordinated white printed nut pouches by fill amount, barrier, seal, artwork versions and food-contact documentation. Compare filled samples before ordering.",
    highlights: ["White pouch base", "Printed product artwork", "Stand-up bottom gusset", "Coordinated range design"],
    sizes: [["Format", "White stand-up pouch; usable capacity confirmed by fill trial"], ["Design examples", "Pistachio, hazelnut and almond artwork shown"], ["Customization", "Versioned front and back artwork, zipper and window to confirm"], ["Specification", "Barrier, seal, dimensions and food-contact documents confirmed per order"]],
    applications: ["Nut ranges", "Dried snacks", "Specialty food packaging", "Coordinated retail collections"],
    specNeeds: ["Nut type, fill weight and shelf-life target for each SKU", "Pouch width, total height, gusset and usable opening", "Oxygen, moisture and light barrier needs", "Zipper, window and seal method", "Artwork version and quantity for each SKU", "Destination market and food-contact documentation"],
    relatedGuide: { title: "Plan a custom stand-up pouch specification", href: "/guides/custom-stand-up-pouch-specification/" },
    faqs: [{ q: "Are the foods and printed weights included in the offer?", a: "This listing is for packaging. The food and printed weights are presentation examples; confirm your own fill amount, artwork and pouch dimensions." }, { q: "Can several designs share one pouch specification?", a: "They may share a base construction after each nut product passes a filling and seal test. Send artwork and quantity for each version so print setup and minimums can be confirmed." }, { q: "What barrier should a nut pouch have?", a: "The answer depends on the nut product, processing, target shelf life and storage. State oxygen, moisture and light needs, then review the exact laminate and test data before making a shelf-life claim." }, customFaq]
  }
].map((product) => ({ ...product, isNew: true, sizeLabel: "Product details" }));
