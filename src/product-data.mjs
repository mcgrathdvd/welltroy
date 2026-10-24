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
    eyebrow: "Custom printed shipping bags for soft goods",
    intro: "Poly mailers are lightweight film shipping bags for folded apparel and other non-fragile orders. Choose a catalogue size or request a custom size, color, logo or pattern, then confirm film thickness, usable inner space and adhesive-flap closure with a packed sample.",
    meta: "Compare 13 poly mailer catalogue outer sizes for apparel shipping. Specify film thickness, color, logo or pattern printing and adhesive flap; confirm fit with a sample.",
    highlights: ["13 catalogue outer sizes", "Peel-and-seal flap option", "Custom color and artwork", "Lightweight soft-goods shipping"],
    sizeLabel: "Outer dimension (Width × Length + Flap)",
    sizes: [["P01","17 × 25 + 5 cm"],["P02","20 × 25 + 5 cm"],["P03","25 × 30 + 5 cm"],["P04","28 × 37 + 5 cm"],["P05","32 × 40 + 5 cm"],["P06","35 × 40 + 5 cm"],["P07","38 × 47 + 5 cm"],["P08","40 × 50 + 5 cm"],["P09","45 × 55 + 5 cm"],["P10","50 × 55 + 5 cm"],["P12","50 × 65 + 5 cm"],["P13","55 × 60 + 5 cm"],["P14","60 × 75 + 5 cm"]],
    applications: ["Folded apparel and textiles", "Soft accessories", "E-commerce order fulfillment", "Books or stationery with added protection", "Non-fragile retail kits"],
    specNeeds: ["Packed item width, length, thickness, weight and quantity per parcel", "Catalogue model or required usable inner width, length and opening", "Film material, thickness, color and matte or gloss preference", "Flap length, adhesive type and any security requirement", "Logo or pattern artwork, print colors and coverage", "Quantity per size and design, destination and sample test needs"],
    alert: "The 13 P-series figures below are catalogue outer dimensions, not usable inner sizes or an automatic match for a custom order. No single load rating applies to every size and film thickness. Confirm film, seams and adhesive for the actual contents, then test the complete shipping pack. Water resistance and recyclability require specification-specific evidence.",
    relatedGuide: { title: "Measure a poly mailer for packed clothing", href: "/guides/mailer-size-for-clothing/" },
    faqs: [
      {q:"How do I choose a poly mailer size?",a:"Fold and pack the actual order first, including any inner bag or insert. Measure packed width, length and thickness; then compare candidate catalogue outer sizes and request usable inner dimensions. Test insertion and flap closure with a sample before approving the size."},
      {q:"Does the listed length include the sealing flap?",a:"The catalogue table gives outer width × length plus a separately listed flap. The flap is not extra usable body length, and the seals reduce inner space. Confirm the opening, internal dimensions and closure clearance for the packed item."},
      {q:"Can you match a brand color or print our logo and pattern?",a:"Color, logo, pattern and matte or gloss appearance can be discussed. Send editable artwork, color references, placement, print coverage and quantity per design. We will confirm film, print method, color proof and finish for the selected bag."},
      {q:"How strong is the bag and how much weight can it carry?",a:"There is no verified weight rating for the whole range. Strength depends on film thickness, dimensions, seals, packed shape and handling. Share the packed weight and route, then test the chosen bag and complete pack."},
      {q:"Are poly mailers waterproof or tamper proof?",a:"A film bag and peel-and-seal flap may help shield contents from ordinary handling, but seams and closure determine actual water ingress and opening evidence. Do not assume a waterproof or tamper-proof rating without a test for the selected construction."},
      {q:"Are poly mailers suitable for fragile products?",a:"A plain poly mailer provides no bubble cushioning. Fragile, heavy, sharp or crushable items may need a bubble mailer, rigid box or other protection. Test the complete pack for its shipping route."},
      {q:"Can these mailers be called recyclable?",a:"That depends on the exact film, ink and adhesive specification and the local collection route. Request material details, then check collection and labeling rules in the destination market before making a recycling claim."},
      {q:"What should I send for a custom poly mailer quote?",a:"Send the packed dimensions and weight, candidate model or usable size target, film and thickness preference, flap and seal requirements, color, artwork, quantity per size and design, destination and any sample tests required."},
      {q:"Can I start with 500 custom poly mailers?",a:"A 500-piece starting quantity applies to eligible bag specifications. Tell us the quantity for each size, color and design so we can confirm the minimum for your exact request."}
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
    eyebrow: "Cushioned poly shipping mailers",
    intro: "Poly bubble mailers pair a flexible film exterior with an inner bubble layer and a sealing flap. Opaque colors, logo printing and heat-sealed side edges are options to discuss. Compare 15 catalogue outer sizes, then confirm the usable opening, liner and seal with a filled sample before shipping.",
    meta: "Compare 15 poly bubble mailer catalogue sizes. Specify film exterior, bubble lining, adhesive flap, color and logo printing; confirm inner fit and protection with a sample.",
    highlights: ["15 catalogue outer sizes", "Bubble-lined construction", "Adhesive flap shown", "Color and logo options"],
    sizeLabel: "Outer dimension (Width × Length + Flap)",
    sizes: [["BM01","11 × 13 + 4 cm"],["BM02","13 × 15 + 4 cm"],["BM03","15 × 18 + 4 cm"],["BM04","15 × 20 + 4 cm"],["BM05","18 × 23 + 4 cm"],["BM06","20 × 25 + 4 cm"],["BM07","23 × 28 + 5 cm"],["BM08","25 × 30 + 5 cm"],["BM09","26 × 32 + 5 cm"],["BM10","29 × 36 + 5 cm"],["BM11","32 × 40 + 5 cm"],["BM12","35 × 43 + 5 cm"],["BM13","38 × 47 + 5 cm"],["BM14","40 × 45 + 5 cm"],["BM15","40 × 50 + 5 cm"]],
    applications: ["Boxed accessories", "Beauty product cartons", "Jewelry in protective boxes", "Electronics accessories", "Small books and stationery"],
    specNeeds: ["Packed item's width, length, thickness, weight and fragility", "Catalogue model or required usable inner width, length and opening", "PE outer film and bubble liner structure or thickness", "Flap length, adhesive type and side-seam requirements", "Opaque color, logo or pattern artwork and printable area", "Quantity per size and design, destination and shipping method"],
    alert: "The proposed film, bubble liner and adhesive must be confirmed for the chosen model. Appearance alone does not establish a waterproof rating, guaranteed impact protection, tamper evidence or recyclability. Ask for the exact material structure and test the complete pack for the intended route. The BM01–BM15 dimensions below are catalogue outer sizes, not usable inner space.",
    relatedGuide: { title: "Compare kraft and poly bubble mailers", href: "/guides/kraft-vs-poly-bubble-mailers/" },
    faqs: [
      {q:"What is the difference between a poly mailer and a poly bubble mailer?",a:"A plain poly mailer is a flexible shipping bag. This range adds an inner bubble layer to cushion the contents, but the level of protection still depends on the product, liner and complete packing method."},
      {q:"Are the 15 listed sizes internal or external?",a:"BM01–BM15 are catalogue outer width × length plus a separate flap. The bubble liner and heat-sealed edges reduce usable space. Request inner width, length and opening for the chosen construction, especially for thick items."},
      {q:"Does the self-adhesive flap show if a parcel has been opened?",a:"A peel-and-seal strip can be specified, but adhesive strength and visible opening evidence depend on the exact flap, adhesive and surface. Ask for a sample and test closure under your packing and shipping conditions; do not assume a security rating."},
      {q:"Are these mailers waterproof or suitable for fragile items?",a:"A film exterior and bubble liner do not by themselves provide water-ingress or impact test results. Check seams and closure if moisture exposure matters. Fragile, heavy, sharp or crushable items may need a rigid box or added protection; test the complete pack."},
      {q:"Can I customize color, logo, pattern or size?",a:"Multiple opaque colors, logo placements and patterns can be discussed. Share your preferred color, artwork, packed item and target dimensions. We will confirm available film, printing, exact size and minimum quantity for each version."},
      {q:"Are poly bubble mailers recyclable?",a:"A general eco-friendly label does not establish the complete film, liner, adhesive or ink structure or local collection route. Request the selected product's material specification and verify recycling guidance for the destination market before making a claim."},
      {q:"What should I send for a custom bubble mailer quote?",a:"Send the packed item's dimensions, weight and fragility, catalogue model or inner-size target, film and bubble requirements, flap and seal preferences, color, editable logo or pattern artwork, quantity per size and design, and destination."},
      {q:"Can I order 500 bubble mailers?",a:"A 500-piece starting quantity applies to eligible bag specifications. Share the exact size, construction, color and print design so we can confirm the minimum for each version."}
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
    intro: "Compare eight 2025 catalogue stand-up pouch dimensions as a starting point for a filled sample. The listed width, height and bottom-gusset figures do not prove usable capacity. For a made-to-order construction, compare material, zipper, window, printing and finish options against the actual contents and filling process.",
    meta: "Compare 8 stand-up pouch catalogue sizes, then check usable fill, bottom gusset, closure, barrier and printing. Explore custom constructions and a sizing guide.",
    highlights: ["8 catalogue formats", "Stand-up bottom", "Resealable styles shown", "Multiple colors and windows"],
    sizeLabel: "Catalogue dimension",
    sizes: [["SP01","9 × 13 + 6 cm"],["SP02","10 × 15 + 6 cm"],["SP03","12 × 20 + 8 cm"],["SP04","14 × 20 + 8 cm"],["SP05","15 × 22 + 8 cm"],["SP06","16 × 24 + 8 cm"],["SP07","18 × 26 + 8 cm"],["SP08","20 × 30 + 8 cm"]],
    applications: ["Beauty and personal care", "Craft and hobby products", "Accessories and kits", "Dry non-food products", "Food only with confirmed compliance"],
    specNeeds: ["Intended contents and fill weight or volume", "Usable opening, headspace and bottom-gusset fit", "Barrier and shelf-life requirement", "Zipper, window, tear notch and finish", "Filling and sealing method", "Exact laminate and destination-market documents", "Quantity per size and design"],
    alert: "Food suitability depends on the complete material structure, intended contents, storage conditions and destination-market requirements.",
    relatedGuide: { title: "Choose a custom stand-up pouch size and structure", href: "/guides/custom-stand-up-pouch-specification/" },
    faqs: [
      {q:"Are these pouches food safe?",a:"Food suitability cannot be determined from shape alone. Request the exact material structure and compliance documents for the intended food and destination market."},
      {q:"How do I choose the correct pouch size?",a:"Provide the product density, fill weight or volume and required headspace. A physical filling test is recommended before confirming production size."},
      {q:"Does a catalogue size tell me how much the pouch holds?",a:"No. The listed dimensions do not establish a usable fill volume. Capacity depends on the bottom construction, material and product density. Share the intended contents and target fill amount, then confirm the final size with a filling test."},
      {q:"Can I choose a zipper or window?",a:"Resealable and window styles are shown as format examples. Tell us which closure and window placement you need; confirm compatibility, barrier effect and the finished sample for the exact material and dimensions."},
      {q:"What is the difference between these and custom stand-up pouches?",a:"This page lists eight catalogue size references. The custom range covers made-to-order construction, material layers, printing and accessories. Use a filled sample to select either route."},
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
    intro: "Die-cut honeycomb wrapping paper opens into a three-dimensional mesh when stretched. Use it to wrap and separate products inside a complete pack. The supplied product sheet lists four widths, five roll lengths, natural/black/white colors and 80 gsm; confirm the chosen combination and trial its coverage with the real item.",
    meta: "Compare honeycomb paper wrap in 30, 38, 40 and 50 cm widths and 30–250 m roll lengths. See packing steps, 80 gsm catalogue reference and quote checks.",
    highlights: ["30 / 38 / 40 / 50 cm widths", "30 / 50 / 100 / 200 / 250 m lengths", "Natural, black and white listed", "80 gsm in supplied product sheet"],
    sizeLabel: "Catalogue options",
    sizes: [["30 cm wide","30 / 50 / 100 / 200 / 250 m"],["38 cm wide","30 / 50 / 100 / 200 / 250 m"],["40 cm wide","30 / 50 / 100 / 200 / 250 m"],["50 cm wide","30 / 50 / 100 / 200 / 250 m"]],
    applications: ["Cosmetics and personal care", "Handmade soaps and gifts", "Artwork and picture frames", "Glassware and home accessories", "Presentation boxes"],
    specNeeds: ["Product dimensions, weight and fragility", "Roll width (30 / 38 / 40 / 50 cm) and length (30 / 50 / 100 / 200 / 250 m)", "Expected cut length per item after a trial", "Natural, black or white color and confirmed paper gsm", "Tissue interleaf or dispenser needs", "Quantity in rolls and destination"],
    alert: "The supplied product sheet lists 80 gsm paper and natural, black and white options. Confirm current availability, exact paper and roll measurement for the chosen specification. Photos of green and red rolls show color examples, not confirmed stock options. Cushioning, recycling and biodegradability need product-specific evidence; test the full shipping pack.",
    relatedGuide: { title: "How to wrap bottles and gifts with honeycomb paper", href: "/guides/honeycomb-paper-wrap-bottles-gifts/" },
    faqs: [
      {q:"What sizes and colors are listed?",a:"The supplied product sheet lists widths of 30, 38, 40 and 50 cm; lengths of 30, 50, 100, 200 and 250 m; and natural, black and white at 80 gsm. Confirm current combinations and tolerances in the quotation. Green and red examples in another image do not establish availability."},
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
