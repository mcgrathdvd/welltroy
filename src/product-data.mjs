import { additionalProducts } from "./new-products.mjs";

export const site = {
  name: "Welltroy",
  legalName: "Shenzhen Welltroy Technology Co., Ltd.",
  origin: "https://welltroy.com",
  email: "info@welltroy.com",
  phone: "+86 198 6465 6856",
  whatsapp: "8619864656856",
  address: "4/F Yunsong Bld, Tairan 8th Road, Shatou Street, Futian District, Shenzhen, China"
};

const commonFaq = {
  custom: {
    q: "Can I order a custom size?",
    a: "Custom sizing is available for selected packaging products. Send us the required dimensions and quantity so we can confirm feasibility and minimum order requirements."
  },
  print: {
    q: "Can you print our logo?",
    a: "Logo printing is available for selected products. Options depend on the material, artwork, number of colors and order quantity. Send your artwork for a product-specific recommendation."
  }
};

export const catalogueProducts = [
  {
    slug: "poly-mailers",
    name: "Poly Mailers",
    group: "Mailing & Protective Packaging",
    eyebrow: "Lightweight shipping packaging",
    intro: "Lightweight shipping bags for folded apparel, accessories and other non-fragile goods. Compare 13 catalogue outer sizes, then tell us your packed item dimensions, quantity and artwork to discuss a custom size or printed finish.",
    meta: "Compare 13 poly mailer catalogue sizes for apparel and e-commerce shipping. Ask about custom dimensions, logo printing and a quote from 500 pieces for eligible specifications.",
    highlights: ["13 catalogue sizes", "Compact shipping format", "Multiple colors shown", "Custom enquiries supported"],
    sizeLabel: "Outer dimension (Width × Length + Flap)",
    sizes: [["P01","17 × 25 + 5 cm"],["P02","20 × 25 + 5 cm"],["P03","25 × 30 + 5 cm"],["P04","28 × 37 + 5 cm"],["P05","32 × 40 + 5 cm"],["P06","35 × 40 + 5 cm"],["P07","38 × 47 + 5 cm"],["P08","40 × 50 + 5 cm"],["P09","45 × 55 + 5 cm"],["P10","50 × 55 + 5 cm"],["P12","50 × 65 + 5 cm"],["P13","55 × 60 + 5 cm"],["P14","60 × 75 + 5 cm"]],
    applications: ["Apparel and soft goods", "Accessories and textiles", "E-commerce fulfillment", "Documents and lightweight items"],
    specNeeds: ["Film material and thickness", "Adhesive strip configuration", "Printing method and coverage", "Custom dimensions and colors", "Carton packing details"],
    faqs: [
      {q:"How do I choose a poly mailer size?",a:"Measure the product after folding or packing, then allow room for insertion and sealing. Share the packed dimensions if you would like help comparing catalogue sizes."},
      {q:"Does the listed length include the sealing flap?",a:"The catalogue table shows outer width × length plus a separately listed flap. The usable space inside can be smaller. Send the packed width, length and thickness so we can confirm fit and usable inner dimensions before you order."},
      {q:"Are poly mailers suitable for fragile products?",a:"Poly mailers are a lightweight outer format and do not provide the cushioning of a bubble mailer. Fragile items may need additional protective packaging."},
      {q:"What artwork should I send for logo printing?",a:"Share an editable logo file where possible, your preferred print colors, placement and approximate print area. We will confirm the suitable printing method, artwork requirements and coverage for the selected bag specification."},
      {q:"Can I start with 500 custom poly mailers?",a:"A 500-piece starting quantity applies to eligible bag specifications. Tell us the quantity for each size, color and design so we can confirm the minimum for your exact request."},
      commonFaq.print
    ]
  },
  {
    slug: "biodegradable-mailers",
    name: "Biodegradable Mailers",
    group: "Mailing & Protective Packaging",
    eyebrow: "Material-led mailing option",
    intro: "Mailing bags in a range of standard sizes for brands reviewing alternatives to conventional shipping mailers. Ask for the exact material composition, disposal conditions and available supporting documents before specifying the product for your market.",
    meta: "Explore Welltroy biodegradable mailers in multiple catalogue sizes. Request material details, supporting documents, custom printing options and pricing.",
    highlights: ["13 catalogue sizes", "Printed examples shown", "Custom enquiries supported", "Documentation on request"],
    sizeLabel: "Outer dimension (Width × Length + Flap)",
    sizes: [["BPM01","17 × 25 + 5 cm"],["BPM02","20 × 25 + 5 cm"],["BPM03","25 × 30 + 5 cm"],["BPM04","28 × 37 + 5 cm"],["BPM05","32 × 40 + 5 cm"],["BPM06","35 × 40 + 5 cm"],["BPM07","38 × 47 + 5 cm"],["BPM08","40 × 50 + 5 cm"],["BPM09","45 × 55 + 5 cm"],["BPM10","50 × 55 + 5 cm"],["BPM11","50 × 65 + 5 cm"],["BPM12","55 × 60 + 5 cm"],["BPM13","60 × 75 + 5 cm"]],
    applications: ["Apparel and soft goods", "Accessories", "E-commerce fulfillment", "Brand campaigns with documented material requirements"],
    specNeeds: ["Exact material composition", "Applicable test method or certification", "Intended disposal route", "Storage and shelf life", "Printing compatibility"],
    alert: "Environmental terminology varies by market. Confirm the exact material, test standard and disposal conditions before ordering.",
    faqs: [
      {q:"What makes these mailers biodegradable?",a:"The answer depends on the confirmed material formulation and supporting test documents for the selected product. Ask our team for the applicable specification."},
      {q:"Are they accepted in household recycling or composting systems?",a:"Disposal routes vary by material and local infrastructure. Review the product documentation and local requirements rather than relying on the product name alone."},
      commonFaq.print
    ]
  },
  {
    slug: "poly-bubble-mailers",
    name: "Poly Bubble Mailers",
    group: "Mailing & Protective Packaging",
    eyebrow: "Cushioned mailing protection",
    intro: "Poly bubble mailers combine a flexible outer bag with an internal cushioning layer for compact goods that need more protection than a plain mailer. Compare 15 catalogue outer sizes, then confirm usable inner space and test the complete pack with your product.",
    meta: "Compare 15 poly bubble mailer outer sizes for cushioned shipping. Check usable inner dimensions, bubble structure, sealing and custom printing before requesting a quote.",
    highlights: ["15 catalogue sizes", "Internal cushioning", "Multiple exterior colors", "Compact to medium formats"],
    sizeLabel: "Outer dimension (Width × Length + Flap)",
    sizes: [["BM01","11 × 13 + 4 cm"],["BM02","13 × 15 + 4 cm"],["BM03","15 × 18 + 4 cm"],["BM04","15 × 20 + 4 cm"],["BM05","18 × 23 + 4 cm"],["BM06","20 × 25 + 4 cm"],["BM07","23 × 28 + 5 cm"],["BM08","25 × 30 + 5 cm"],["BM09","26 × 32 + 5 cm"],["BM10","29 × 36 + 5 cm"],["BM11","32 × 40 + 5 cm"],["BM12","35 × 43 + 5 cm"],["BM13","38 × 47 + 5 cm"],["BM14","40 × 45 + 5 cm"],["BM15","40 × 50 + 5 cm"]],
    applications: ["Accessories", "Beauty products", "Jewelry boxes and gifts", "Electronics accessories", "Books and compact homeware"],
    specNeeds: ["Outer film structure", "Bubble size and cushioning thickness", "Usable inner dimensions", "Seal and flap configuration", "Exterior color and printing"],
    faqs: [
      {q:"What is the difference between a poly mailer and a bubble mailer?",a:"A poly mailer is a lightweight shipping bag. A bubble mailer adds an internal cushioning layer for products needing more surface and impact protection."},
      {q:"Are the listed dimensions internal or external?",a:"The catalogue identifies them as outer dimensions. Ask for usable inner dimensions before choosing a model, especially for thicker products."},
      {q:"How much protection does a bubble mailer provide?",a:"Protection depends on the bubble structure, packed product, empty space and shipping conditions. Share the product details so the complete packing method can be reviewed."},
      {q:"Does the listed length include the closing flap?",a:"The catalogue lists outer width and length plus a separate flap measurement. The bubble liner and sealed edges reduce usable space, so confirm the inner dimensions and closure clearance for your packed item."},
      {q:"What should I provide for a printed bubble mailer quote?",a:"Send the packed item's width, length and thickness, expected quantity per size and design, destination, logo artwork and desired print colors. We will confirm print area, method and suitable construction for that specification."},
      {q:"Can I order 500 bubble mailers?",a:"A 500-piece starting quantity applies to eligible bag specifications. Share the exact size, construction and print design so we can confirm the minimum for each version."}
    ]
  },
  {
    slug: "metallic-bubble-mailers",
    name: "Metallic Bubble Mailers",
    group: "Mailing & Protective Packaging",
    eyebrow: "Protective packaging with visual impact",
    intro: "A reflective exterior adds visual impact, while the internal bubble structure helps protect compact products during delivery. Designed for brands that want the arrival experience to feel more distinctive.",
    meta: "Explore metallic bubble mailers in multiple colors and sizes for protective shipping with a distinctive presentation. Request custom options and pricing.",
    highlights: ["9 catalogue sizes", "Reflective exterior", "Internal cushioning", "Multiple colors shown"],
    sizeLabel: "Outer dimension (Width × Length + Flap)",
    sizes: [["MB01","11 × 13 + 4 cm"],["MB02","15 × 13 + 4 cm"],["MB03","15 × 18 + 4 cm"],["MB04","15 × 20 + 4 cm"],["MB05","18 × 23 + 4 cm"],["MB06","20 × 28 + 4 cm"],["MB07","23 × 29 + 4 cm"],["MB08","25 × 30 + 4 cm"],["MB09","35 × 40 + 4 cm"]],
    applications: ["Beauty products", "Jewelry and accessories", "Gift items", "Promotional kits", "Small e-commerce products"],
    specNeeds: ["Surface structure", "Bubble cushioning thickness", "Current color availability", "Printing compatibility", "Usable inner dimensions"],
    faqs: [
      {q:"Is the metallic finish available in custom colors?",a:"The catalogue shows several colors. Confirm current availability, quantity requirements and color variation before ordering."},
      {q:"Can the metallic surface be printed?",a:"Printing depends on the surface, artwork and required finish. Submit your design for a product-specific assessment."},
      {q:"Are these mailers recyclable?",a:"Do not assume recyclability from appearance alone. Request the confirmed material structure and disposal guidance for the selected specification."}
    ]
  },
  {
    slug: "zipper-bags",
    name: "Zipper Bags",
    group: "Retail & Product Packaging",
    eyebrow: "Organize, protect and present",
    intro: "Reclosable inner bags for folded apparel, accessories and product sets. Compare 16 catalogue outer sizes with the item after folding, then confirm usable space, zipper construction and any printed warning text before ordering. Add a suitable outer pack for shipment.",
    meta: "Compare 16 zipper bag catalogue outer sizes for apparel and accessories. Check usable space, closure, finish and logo or warning text before a custom quote.",
    highlights: ["16 catalogue entries", "Reclosable format", "Clear and printed examples", "Custom enquiries supported"],
    sizeLabel: "Catalogue outer dimension",
    sizes: [["Z01","14 × 18 cm"],["Z02","14 × 20 cm"],["Z03","17 × 25 cm"],["Z04","18 × 20 cm"],["Z05","20 × 14 cm"],["Z06","20 × 28 cm"],["Z07","24 × 35 cm"],["Z08","25 × 30 cm"],["Z09","28 × 30 cm"],["Z10","28 × 35 cm"],["Z11","30 × 40 cm"],["Z12","35 × 45 cm"],["Z13","40 × 50 cm"],["Z14","45 × 60 cm"],["Z15","40 × 30 cm"],["Z16","60 × 45 cm"]],
    applications: ["Clothing and knitwear", "Fashion accessories", "Product sets and kits", "Organized storage", "Retail preparation"],
    specNeeds: ["Folded item width, length and thickness", "Model or required usable inner space", "Material and thickness", "Frosted, clear or colored finish", "Zipper, vent holes and warning text", "Quantity per size and artwork"],
    relatedGuide: { title: "Measure clothing for an inner bag and outer mailer", href: "/guides/mailer-size-for-clothing/" },
    faqs: [
      {q:"Are the listed sizes usable inner dimensions?",a:"The 16 catalogue figures are outer dimensions. The zipper and sealed edges reduce usable space. Measure the folded item, include any insert, and request the inner dimensions for the selected model before ordering."},
      {q:"Are these bags suitable as shipping mailers?",a:"Treat this range as inner product packaging unless the chosen construction and delivery method are confirmed for shipping. A zipper closure alone does not make the bag a protective outer mailer."},
      {q:"Which finish and closure can I choose?",a:"Clear and printed examples are shown. Tell us whether you need a frosted, clear or colored appearance and how the bag should open and reclose; material, zipper and finish availability must be confirmed for your size."},
      {q:"Can I add vent holes or warning text?",a:"Send the desired hole position, warning wording, logo artwork and destination market. We will check the selected construction and printing options rather than assuming every option is available on every size."},
      {q:"How should I choose a bag for several garments?",a:"Fold and measure the full packed set, including inserts. Check the usable opening and thickness as well as the flat width and length, then test insertion and closure with a sample."},
      {q:"What should I send for a custom zipper bag quote?",a:"Share the catalogue model or required usable dimensions, folded product dimensions, quantity per size, finish, zipper and vent requirements, artwork, warning text and destination."}
    ]
  },
  {
    slug: "kraft-paper-bags",
    name: "Kraft Paper Bags",
    group: "Retail & Product Packaging",
    eyebrow: "Natural retail presentation",
    intro: "Kraft paper carrier bags in 17 catalogue entries for retail purchases, gifts and branded customer presentation. Compare vertical and horizontal formats against the size of the item or presentation box, then confirm the handle, paper and logo finish for your order.",
    meta: "Compare 17 kraft paper bag catalogue entries in vertical and horizontal formats. Confirm bag depth, handles, paper and logo printing for a custom retail bag quote.",
    highlights: ["17 catalogue entries", "Vertical and horizontal formats", "Handled construction shown", "Retail and gifting uses"],
    sizeLabel: "Catalogue dimension",
    sizes: [["KP01-V","12 × 5.7 × 16 cm"],["KP02-V","15 × 6 × 20 cm"],["KP03-V","16 × 8 × 22 cm"],["KP04-V","18 × 10 × 23 cm"],["KP05-V","20 × 10 × 28 cm"],["KP06-V","25 × 13 × 32 cm"],["KP07-V","26 × 8 × 35 cm"],["KP08-V","28 × 10 × 33 cm"],["KP09-V","30 × 10 × 40 cm"],["KP10-H","22 × 10 × 18 cm"],["KP11-H","27 × 8 × 21 cm"],["KP12-H","30 × 10 × 25 cm"],["KP13-H","32 × 11.5 × 28 cm"],["KP14-H","35 × 13 × 26 cm"],["KP15-H","40 × 12 × 28 cm"],["KP16-H","43 × 13 × 32 cm"],["KP17-H","48 × 14 × 35 cm"]],
    applications: ["Fashion and accessories", "Beauty and personal care", "Gifts and events", "Boutique retail", "Lightweight takeaway products"],
    specNeeds: ["Paper type and gsm", "Handle material and attachment", "Printing method", "Coating or lamination", "Reinforcement and load testing"],
    faqs: [
      {q:"How do I choose the correct paper bag size?",a:"Measure the product width, depth and height, including any presentation box. Allow clearance for insertion and carrying before comparing catalogue formats."},
      {q:"Can kraft paper be printed in full color?",a:"Available methods depend on paper color, surface, artwork and quantity. Light inks and fine color details may reproduce differently on natural kraft paper."},
      {q:"What do the V and H catalogue models mean?",a:"The catalogue groups these examples as vertical and horizontal formats. Confirm the measurement order, usable opening and bottom depth for the model you choose before approving a size."},
      {q:"Which handle and paper weight should I request?",a:"Tell us the packed product weight, whether it includes a box, the intended carrying use and your preferred appearance. Handle material, attachment, paper weight and any reinforcement must be confirmed for the selected specification."},
      {q:"What should I send for a logo paper bag quote?",a:"Share the chosen model or target width, depth and height, quantity per size and artwork, destination, editable logo if available, preferred print colors and any finish requirement. We will confirm the achievable print method and placement."},
      commonFaq.custom
    ]
  },
  {
    slug: "paper-gift-bags",
    name: "Paper & Gift Bags",
    group: "Retail & Product Packaging",
    eyebrow: "Branded customer presentation",
    intro: "Colored paper carrier bags for retail, gifting, events and customer presentation. Match the bag format, handle and print finish to the products your customers take home.",
    meta: "Explore paper and gift bags in multiple sizes and colors for retail, gifting and brand presentation. Request material, handle and printing options.",
    highlights: ["11 catalogue entries", "Vertical and horizontal formats", "Multiple colors shown", "Custom branding enquiries"],
    sizeLabel: "Catalogue dimension",
    sizes: [["PB01-V","15 × 8 × 21 cm"],["PB02-V","21 × 14 × 19 cm"],["PB03-V","21 × 11 × 27 cm"],["PB04-V","26 × 12 × 31.5 cm"],["PB05-V","28 × 15 × 28 cm"],["PB06-V","21 × 14 × 27 cm"],["PB07-V","24 × 17 × 28 cm"],["PB08-V","12 × 10 × 22 cm"],["PB09-H","32 × 11 × 27 cm"],["PB10-H","42 × 13 × 31 cm"],["PB11-H","44 × 14 × 40 cm"]],
    applications: ["Retail purchases", "Gift packaging", "Events and promotional kits", "Beauty and fashion", "Customer presentation"],
    specNeeds: ["Paper stock and gsm", "Paper color and surface", "Handle type", "Printing and specialty finishes", "Reinforcement and load capacity"],
    faqs: [
      {q:"What is the difference between kraft and gift paper bags?",a:"Kraft bags usually emphasize a natural paper appearance, while gift bags may use a broader range of colors and presentation finishes. Compare the exact constructions by specification."},
      {q:"Can you match our brand color?",a:"Color matching depends on the paper and printing process. Provide a Pantone reference and request a physical approval standard when accuracy is important."},
      commonFaq.custom
    ]
  },
  {
    slug: "stand-up-pouches",
    name: "Stand-up Pouches",
    group: "Retail & Product Packaging",
    eyebrow: "Shelf-ready flexible packaging",
    intro: "Stand-up pouch formats for shelf presentation and organized packing, with 8 catalogue dimensions to compare. Tell us what you will pack, the fill weight or volume and your required closure so the material, usable capacity and printing can be checked for your use.",
    meta: "Compare 8 stand-up pouch catalogue dimensions and ask about usable capacity, closure, barrier and custom printing. Food use requires confirmed material documents.",
    highlights: ["8 catalogue formats", "Stand-up bottom", "Resealable styles shown", "Multiple colors and windows"],
    sizeLabel: "Catalogue dimension",
    sizes: [["SP01","9 × 13 + 6 cm"],["SP02","10 × 15 + 6 cm"],["SP03","12 × 20 + 8 cm"],["SP04","14 × 20 + 8 cm"],["SP05","15 × 22 + 8 cm"],["SP06","16 × 24 + 8 cm"],["SP07","18 × 26 + 8 cm"],["SP08","20 × 30 + 8 cm"]],
    applications: ["Beauty and personal care", "Craft and hobby products", "Accessories and kits", "Dry non-food products", "Food only with confirmed compliance"],
    specNeeds: ["Intended contents", "Fill weight or volume", "Barrier and shelf-life requirement", "Closure and window", "Filling and sealing method"],
    alert: "Food suitability depends on the complete material structure, intended contents, storage conditions and destination-market requirements.",
    faqs: [
      {q:"Are these pouches food safe?",a:"Food suitability cannot be determined from shape alone. Request the exact material structure and compliance documents for the intended food and destination market."},
      {q:"How do I choose the correct pouch size?",a:"Provide the product density, fill weight or volume and required headspace. A physical filling test is recommended before confirming production size."},
      {q:"Does a catalogue size tell me how much the pouch holds?",a:"No. The listed dimensions do not establish a usable fill volume. Capacity depends on the bottom construction, material and product density. Share the intended contents and target fill amount, then confirm the final size with a filling test."},
      {q:"Can I choose a zipper or window?",a:"Resealable and window styles are shown as format examples. Tell us which closure and window placement you need; availability depends on the exact material and dimensions and must be confirmed in the quotation."},
      {q:"What details help you quote a printed stand-up pouch?",a:"Send the contents, target fill weight or volume, quantity per size and design, destination, artwork, desired closure and any barrier or shelf-life requirement. For food contents, include the market and applicable documentation needs."},
      commonFaq.print
    ]
  },
  {
    slug: "thermal-labels",
    name: "Thermal Labels",
    group: "Packing & Fulfillment Supplies",
    eyebrow: "Labels for shipping and operations",
    intro: "Label sizes for shipping, order handling and product identification. Confirm the printer, roll configuration, adhesive and application surface before choosing a specification.",
    meta: "Explore thermal labels in 10 catalogue sizes for shipping, fulfillment and product identification. Request roll, adhesive and printer compatibility details.",
    highlights: ["10 catalogue sizes", "30 × 20 to 100 × 150 mm", "Compact and shipping formats", "Roll configuration on request"],
    sizeLabel: "Catalogue size",
    sizes: [["TL01","30 × 20 mm"],["TL02","40 × 30 mm"],["TL03","50 × 30 mm"],["TL04","40 × 70 mm"],["TL05","60 × 40 mm"],["TL06","70 × 50 mm"],["TL07","80 × 60 mm"],["TL08","100 × 70 mm"],["TL09","100 × 100 mm"],["TL10","100 × 150 mm"]],
    applications: ["Shipping labels", "Order handling", "Product identification", "Warehouse and fulfillment workflows"],
    specNeeds: ["Printer make and model", "Roll or fanfold format", "Core and roll diameter", "Labels per roll", "Adhesive and application temperature"],
    faqs: [
      {q:"Will these labels work with my printer?",a:"Compatibility depends on print technology, media width, sensor type, core and roll dimensions. Send the printer model and current label specification for confirmation."},
      {q:"Which adhesive should I choose?",a:"The correct adhesive depends on the application surface and temperature. Share the actual use conditions before ordering."},
      commonFaq.custom
    ]
  },
  {
    slug: "honeycomb-paper-rolls",
    name: "Honeycomb Paper Rolls",
    group: "Packing & Fulfillment Supplies",
    eyebrow: "Expandable paper protection",
    intro: "Expandable paper wrap for surface separation and presentation during packing. Compare four catalogue widths and five roll lengths, then test the stretched sheet, amount used per item and complete shipping pack before choosing a roll specification.",
    meta: "Compare honeycomb paper wrap in four catalogue widths and five roll lengths. Check expanded coverage, paper specification and complete-pack protection before ordering.",
    highlights: ["4 catalogue widths", "5 roll lengths", "Brown, white and black", "Expandable paper structure"],
    sizeLabel: "Catalogue options",
    sizes: [["30 cm wide","30 / 50 / 100 / 200 / 250 m"],["38 cm wide","30 / 50 / 100 / 200 / 250 m"],["40 cm wide","30 / 50 / 100 / 200 / 250 m"],["50 cm wide","30 / 50 / 100 / 200 / 250 m"]],
    applications: ["Cosmetics and personal care", "Handmade soaps and gifts", "Artwork and picture frames", "Glassware and home accessories", "Presentation boxes"],
    specNeeds: ["Product dimensions, weight and fragility", "Roll width and length", "Expected cut length per item", "Paper color and confirmed gsm", "Tissue interleaf or dispenser needs", "Quantity in rolls and destination"],
    alert: "The catalogue states 80 g paper weight and a 1:16 expansion ratio. Confirm the measurement method and exact gsm before ordering.",
    relatedGuide: { title: "See gift and homeware packing checks", href: "/industries/#gifts" },
    faqs: [
      {q:"How do I choose between the four roll widths?",a:"Compare the item dimensions with the width of the paper as it will be used. Wrap a real item to check edge coverage and overlap; width alone does not determine how much roll length the pack will consume."},
      {q:"Does a 30 m roll wrap a fixed number of products?",a:"No. The number depends on product size, cut length, stretch and overlap. Run a packing trial, record paper used per item, then estimate the roll count from your order volume."},
      {q:"How does honeycomb paper protect a product?",a:"The die-cut paper opens into a three-dimensional lattice as it is stretched. It can separate surfaces and help cushion a tested pack, but performance depends on the item and the rest of the packaging."},
      {q:"Can it replace bubble wrap for glassware?",a:"Do not assume equivalent protection. Test the actual item, wrap, carton and shipping route together. Fragile, heavy or sharp products may need a box, interleaf or additional cushioning."},
      {q:"Is this paper biodegradable or recyclable?",a:"The catalogue dimensions do not establish an environmental claim. Request the confirmed paper composition, inks or coatings and supporting documents for the selected specification and market."},
      {q:"What details help you quote honeycomb paper rolls?",a:"Send the product dimensions and fragility, preferred roll width and length, color, paper specification, trial consumption if known, quantity in rolls, dispenser or interleaf needs and destination."}
    ]
  }
];

export const products = [...catalogueProducts, ...additionalProducts];

export const productGroups = [
  {
    name: "Mailing & Protective Packaging",
    short: "Shipping mailers and cushioned formats for delivery protection.",
    slugs: ["poly-mailers", "biodegradable-mailers", "poly-bubble-mailers", "metallic-bubble-mailers"]
  },
  {
    name: "Retail & Product Packaging",
    short: "Flexible and paper formats for organization, display and customer presentation.",
    slugs: ["zipper-bags", "kraft-paper-bags", "paper-gift-bags", "stand-up-pouches"]
  },
  {
    name: "Packing & Fulfillment Supplies",
    short: "Everyday labeling and protective materials for packing operations.",
    slugs: ["thermal-labels", "honeycomb-paper-rolls"]
  }
].map((group) => ({ ...group, slugs: [...group.slugs, ...additionalProducts.filter((product) => product.group === group.name).map((product) => product.slug)] }));
