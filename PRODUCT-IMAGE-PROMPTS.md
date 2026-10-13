# Welltroy 产品图生成记录（v12）

生成方式：内置 imagegen。2026-10-10。
用途：网站产品卡片、产品详情、相关产品与行业页面；展示定制配色和品牌印刷效果。
原图：site/src/assets/products/ 下的 10 张 PNG。网站使用 Astro 构建生成的响应式 WebP。

## poly-mailers

文件：site/src/assets/products/poly-mailers.png

生成提示词：

```text
Use case: product-mockup. Create a new premium photorealistic product catalogue image for Welltroy's B2B packaging website. Input 1 is a product construction reference (poly mailing bags), input 2 is the official WELLTROY logo, input 3 is the website hero palette and mood reference only. Produce a SINGLE landscape 4:3 image, no collage, no border, no headings.
A carefully arranged family of 5 flexible POLY MAILERS: two standing flat rectangular adhesive-flap mailing bags with visible top sealing flaps, plus three compact rolls of folded mailing bags placed horizontally at the front. Thin smooth matte plastic, subtle real folds, flattened folded-roll ends as in input 1, not rigid paper or bubble texture. One standing mailer forest green #203c30, one warm ivory #fcfaf6; rolls sage green, warm ivory and muted burnt orange #c84314. One front ivory bag bears a modest faithfully reproduced orange W emblem and the exact uppercase text "WELLTROY" from input 2, naturally printed on its front, no extra wording.
Consistent series art direction: seamless light warm ivory #fcfaf6 studio background and ivory floor, barely visible soft gradient, soft daylight from upper left, delicate grounded shadows, realistic commercial studio photograph, camera at product height in three-quarter front view. Products occupy about 78% of width and 68% of height centered; keep at least 8% safe margin on all edges so nothing is cropped in responsive cards. Natural colors, detailed plausible materials, quiet high-end catalogue aesthetic matched to the hero, no leaves, no decorative objects, no people. No other logos, no certification badges, no environmental claims, no dimension labels, no watermarks. Recreate the form with improved photographic quality; do not reproduce the original neon palette or old text.
```

封口结构修正提示词：

```text
Use case: precise-object-edit. Correct this catalogue photo of poly mailing bags. Keep the color palette, studio lighting, background, logo print, three folded bag rolls, scale and composition. Change ONLY the top construction of the two tall bags at the back: these are ordinary flat shipping POLY MAILERS with an adhesive fold-over flap, NOT ziplock pouches. Remove all resealable zipper rails, transparent zipper bands, tear notches, pouch ridges and bottom stand-up gussets. Use thin flexible smooth mailing-envelope construction with simple plain side seams, straight plain flat bottom and a narrow fold-over adhesive top flap folded shut, with just one subtle flap edge, no press-to-close zipper. Maintain the ivory front bag's existing WELLTROY logo exactly. Products remain realistic thin poly bags. No added text or new objects.
```

## biodegradable-mailers

文件：site/src/assets/products/biodegradable-mailers.png

生成提示词：

```text
Use case: product-mockup. Create a SINGLE premium photorealistic landscape 4:3 B2B product catalogue photo. Input 1 is the correct product construction reference; input 2 the official WELLTROY brand logo; input 3 establishes the exact studio series style. Match input 3's seamless warm ivory #fcfaf6 backdrop and floor, soft upper-left daylight, delicate grounded shadows, quiet photorealistic commercial studio quality, three-quarter front view and natural surface detail. Center the product family, around 78% width and 68% height, with at least 8% safe margin on all four sides. Main palette forest green #203c30, warm ivory, sage, restrained burnt orange #c84314; natural kraft where relevant. Logo is a modest faithful orange W emblem and the exact uppercase "WELLTROY" from input 2 naturally printed on one front-facing product. No decorative plants, extra props, people, watermarks, captions, dimensions, certificates, sustainability claims, slogans or other brand names. Recreate product construction, improve photo quality. NO contact sheet, NO collage. Subject: Four ordinary flat flexible biodegradable mailing envelopes, a small range of sizes in forest green, sage and warm ivory, slightly staggered upright with one flattened envelope leaning at the front. Smooth matte thin-film material, closed straight fold-over adhesive flaps, plain side seams and flat bottoms. These are mailing bags NOT zipper pouches: no zipper rails, no tear notches, no stand-up gussets. The front warm ivory envelope carries the logo. Remove all text from the old reference including '100%' and biodegradable claims. Keep modest natural folds. No rolls in this image.
```

## poly-bubble-mailers

文件：site/src/assets/products/poly-bubble-mailers.png

生成提示词：

```text
Use case: product-mockup. Create a SINGLE premium photorealistic landscape 4:3 B2B product catalogue photo. Input 1 is the correct product construction reference; input 2 the official WELLTROY brand logo; input 3 establishes the exact studio series style. Match input 3's seamless warm ivory #fcfaf6 backdrop and floor, soft upper-left daylight, delicate grounded shadows, quiet photorealistic commercial studio quality, three-quarter front view and natural surface detail. Center the product family, around 78% width and 68% height, with at least 8% safe margin on all four sides. Main palette forest green #203c30, warm ivory, sage, restrained burnt orange #c84314; natural kraft where relevant. Logo is a modest faithful orange W emblem and the exact uppercase "WELLTROY" from input 2 naturally printed on one front-facing product. No decorative plants, extra props, people, watermarks, captions, dimensions, certificates, sustainability claims, slogans or other brand names. Recreate product construction, improve photo quality. NO contact sheet, NO collage. Subject: Five cushioned POLY BUBBLE MAILERS in three sizes, forest green, warm ivory and sage with one muted orange, staggered upright plus two stacked flat envelopes at the front. Flexible matte opaque plastic exterior with clearly visible subtle circular bubble texture, sealed side edges, ordinary adhesive fold-over sealing flaps. One top flap may be slightly open showing the silver-gray bubble cushioning lining, with NO zipper, NO tear notch, NO stand-up base. Front ivory mailer naturally printed with modest orange WELLTROY logo. Only bubble envelopes in the scene.
```

## metallic-bubble-mailers

文件：site/src/assets/products/metallic-bubble-mailers.png

生成提示词：

```text
Use case: product-mockup. Create a SINGLE premium photorealistic landscape 4:3 B2B product catalogue photo. Input 1 is the correct product construction reference; input 2 the official WELLTROY brand logo; input 3 establishes the exact studio series style. Match input 3's seamless warm ivory #fcfaf6 backdrop and floor, soft upper-left daylight, delicate grounded shadows, quiet photorealistic commercial studio quality, three-quarter front view and natural surface detail. Center the product family, around 78% width and 68% height, with at least 8% safe margin on all four sides. Main palette forest green #203c30, warm ivory, sage, restrained burnt orange #c84314; natural kraft where relevant. Logo is a modest faithful orange W emblem and the exact uppercase "WELLTROY" from input 2 naturally printed on one front-facing product. No decorative plants, extra props, people, watermarks, captions, dimensions, certificates, sustainability claims, slogans or other brand names. Recreate product construction, improve photo quality. NO contact sheet, NO collage. Subject: Five flat METALLIC BUBBLE MAILING ENVELOPES, diagonal overlapping arrangement with some slightly leaning upright, metallic forest green, brushed silver, champagne gold and copper-orange. Strongly visible fine circular bubble embossing, realistic shiny reflective flexible foil cushioning texture, crisp plain sealed edges and adhesive fold-over tops; NO zipper rails, NO stand-up pouch base, NO die-cut handles. Orange WELLTROY logo printed modestly on one front silver envelope without interfering with bubble texture. Rich but controlled highlights, avoid neon magenta/purple/blue palette of old reference. Only metallic bubble envelopes in scene.
```

## zipper-bags

文件：site/src/assets/products/zipper-bags.png

生成提示词：

```text
Use case: product-mockup. Create a SINGLE premium photorealistic landscape 4:3 B2B product catalogue photo. Input 1 is the correct product construction reference; input 2 the official WELLTROY brand logo; input 3 establishes the exact studio series style. Match input 3's seamless warm ivory #fcfaf6 backdrop and floor, soft upper-left daylight, delicate grounded shadows, quiet photorealistic commercial studio quality, three-quarter front view and natural surface detail. Center the product family, around 78% width and 68% height, with at least 8% safe margin on all four sides. Main palette forest green #203c30, warm ivory, sage, restrained burnt orange #c84314; natural kraft where relevant. Logo is a modest faithful orange W emblem and the exact uppercase "WELLTROY" from input 2 naturally printed on one front-facing product. No decorative plants, extra props, people, watermarks, captions, dimensions, certificates, sustainability claims, slogans or other brand names. Recreate product construction, improve photo quality. NO contact sheet, NO collage. Subject: Four flat rectangular frosted translucent ZIPPER GARMENT BAGS in staggered sizes, each with a clearly visible thin white resealable zipper across the very top, subtle side seams, no stand-up gusset. Three have neatly folded unbranded simple garments visible through the frosted film, in forest green, ivory and muted burnt orange. One smaller empty frosted bag lies flat at the front with its white zipper clearly visible. Product should look like garment packaging reference, NOT opaque envelopes or food pouches. Print the modest official orange WELLTROY logo on the front frosted garment bag, recognizable without dominating. Soft authentic translucent plastic, no apparel logos or other text.
```

## kraft-paper-bags

文件：site/src/assets/products/kraft-paper-bags.png

生成提示词：

```text
Use case: product-mockup. Create a SINGLE premium photorealistic landscape 4:3 B2B product catalogue photo. Input 1 is the correct product construction reference; input 2 the official WELLTROY brand logo; input 3 establishes the exact studio series style. Match input 3's seamless warm ivory #fcfaf6 backdrop and floor, soft upper-left daylight, delicate grounded shadows, quiet photorealistic commercial studio quality, three-quarter front view and natural surface detail. Center the product family, around 78% width and 68% height, with at least 8% safe margin on all four sides. Main palette forest green #203c30, warm ivory, sage, restrained burnt orange #c84314; natural kraft where relevant. Logo is a modest faithful orange W emblem and the exact uppercase "WELLTROY" from input 2 naturally printed on one front-facing product. No decorative plants, extra props, people, watermarks, captions, dimensions, certificates, sustainability claims, slogans or other brand names. Recreate product construction, improve photo quality. NO contact sheet, NO collage. Subject: Four rectangular KRAFT PAPER SHOPPING BAGS in several sizes with open tops, proper flat rectangular bases and folded side gussets. Natural tan kraft paper dominates, with one forest green and one warm ivory bag and a small muted burnt-orange bag; realistic uncoated paper grain, braided rope handles like input 1. Bags form a balanced staggered three-quarter group, all handles fully visible and naturally attached, no added gift boxes. Front tan bag bears a modest faithful official orange WELLTROY logo. Differentiate from bright neon retail bags: restrained earthy palette, strong realistic folded construction.
```

## paper-gift-bags

文件：site/src/assets/products/paper-gift-bags.png

生成提示词：

```text
Use case: product-mockup. Create a SINGLE premium photorealistic landscape 4:3 B2B product catalogue photo. Input 1 is the correct product construction reference; input 2 the official WELLTROY brand logo; input 3 establishes the exact studio series style. Match input 3's seamless warm ivory #fcfaf6 backdrop and floor, soft upper-left daylight, delicate grounded shadows, quiet photorealistic commercial studio quality, three-quarter front view and natural surface detail. Center the product family, around 78% width and 68% height, with at least 8% safe margin on all four sides. Main palette forest green #203c30, warm ivory, sage, restrained burnt orange #c84314; natural kraft where relevant. Logo is a modest faithful orange W emblem and the exact uppercase "WELLTROY" from input 2 naturally printed on one front-facing product. No decorative plants, extra props, people, watermarks, captions, dimensions, certificates, sustainability claims, slogans or other brand names. Recreate product construction, improve photo quality. NO contact sheet, NO collage. Subject: Five colored PAPER GIFT BAGS with TWISTED PAPER HANDLES matching the paper handle construction of input 1, rectangular bases, side gussets and open tops. Tall forest-green bag behind, medium warm-ivory and sage bags, one small muted burnt-orange bag and one natural tan bag folded flat in front. All handles stay fully within frame. Clean matte paper with subtle tactile grain, elegant gift/retail presentation. Front warm-ivory bag has a modest faithful orange WELLTROY emblem and wordmark, no other text or imagery. Only paper gift bags, no gift boxes, ribbons, foliage, clothing or food.
```

## stand-up-pouches

文件：site/src/assets/products/stand-up-pouches.png

生成提示词：

```text
Use case: product-mockup. Create a SINGLE premium photorealistic landscape 4:3 B2B product catalogue photo. Input 1 is the correct product construction reference; input 2 the official WELLTROY brand logo; input 3 establishes the exact studio series style. Match input 3's seamless warm ivory #fcfaf6 backdrop and floor, soft upper-left daylight, delicate grounded shadows, quiet photorealistic commercial studio quality, three-quarter front view and natural surface detail. Center the product family, around 78% width and 68% height, with at least 8% safe margin on all four sides. Main palette forest green #203c30, warm ivory, sage, restrained burnt orange #c84314; natural kraft where relevant. Logo is a modest faithful orange W emblem and the exact uppercase "WELLTROY" from input 2 naturally printed on one front-facing product. No decorative plants, extra props, people, watermarks, captions, dimensions, certificates, sustainability claims, slogans or other brand names. Recreate product construction, improve photo quality. NO contact sheet, NO collage. Subject: Five RESEALABLE STAND-UP POUCHES in varying sizes with clearly visible bottom gussets so they stand independently, top press-to-close zipper and small tear notches. Matte forest green, ivory, sage and muted burnt orange plus one natural kraft. Two have neat rectangular clear windows showing a few neutral wooden craft beads, others opaque. Front warm ivory pouch bears the official orange WELLTROY logo above its window. Shape and functional structure should match input 1, broad enough for filling, no spouts, no handles, no ordinary mailing flaps. Elegant realistic laminate texture, no product descriptions or certification labels.
```

## thermal-labels

文件：site/src/assets/products/thermal-labels.png

生成提示词：

```text
Use case: product-mockup. Create a SINGLE premium photorealistic landscape 4:3 B2B product catalogue photo. Input 1 is the correct product construction reference; input 2 the official WELLTROY brand logo; input 3 establishes the exact studio series style. Match input 3's seamless warm ivory #fcfaf6 backdrop and floor, soft upper-left daylight, delicate grounded shadows, quiet photorealistic commercial studio quality, three-quarter front view and natural surface detail. Center the product family, around 78% width and 68% height, with at least 8% safe margin on all four sides. Main palette forest green #203c30, warm ivory, sage, restrained burnt orange #c84314; natural kraft where relevant. Logo is a modest faithful orange W emblem and the exact uppercase "WELLTROY" from input 2 naturally printed on one front-facing product. No decorative plants, extra props, people, watermarks, captions, dimensions, certificates, sustainability claims, slogans or other brand names. Recreate product construction, improve photo quality. NO contact sheet, NO collage. Subject: Five WHITE BLANK THERMAL LABEL ROLLS on visible tan cardboard cores in a balanced compact arrangement: three upright rolls in two sizes, two horizontal rolls in front, and one short strip of three blank rectangular die-cut labels curving gently onto the ivory floor. All labels remain white, clean die-cut boundaries and pale neutral liner edges, no teal or blue saturated trim. One front roll has a small removable forest-green packaging belly band carrying the modest official orange WELLTROY logo from input 2. This branded band is outer packaging only: the thermal label stock itself is blank, no orange direct-thermal print, no Chinese text, no shipping addresses, no invented barcodes. Keep true paper-roll geometry and realistic wound edges.
```

## honeycomb-paper-rolls

文件：site/src/assets/products/honeycomb-paper-rolls.png

生成提示词：

```text
Use case: product-mockup. Create a SINGLE premium photorealistic landscape 4:3 B2B product catalogue photo. Input 1 is the correct product construction reference; input 2 the official WELLTROY brand logo; input 3 establishes the exact studio series style. Match input 3's seamless warm ivory #fcfaf6 backdrop and floor, soft upper-left daylight, delicate grounded shadows, quiet photorealistic commercial studio quality, three-quarter front view and natural surface detail. Center the product family, around 78% width and 68% height, with at least 8% safe margin on all four sides. Main palette forest green #203c30, warm ivory, sage, restrained burnt orange #c84314; natural kraft where relevant. Logo is a modest faithful orange W emblem and the exact uppercase "WELLTROY" from input 2 naturally printed on one front-facing product. No decorative plants, extra props, people, watermarks, captions, dimensions, certificates, sustainability claims, slogans or other brand names. Recreate product construction, improve photo quality. NO contact sheet, NO collage. Subject: Four EXPANDABLE HONEYCOMB KRAFT PAPER WRAP ROLLS: two natural tan kraft, one warm white and one charcoal black, with plain cardboard cores, arranged compactly with two upright and two horizontal. Extend a short unrolled portion of the front natural kraft paper toward the foreground to visibly demonstrate the true opened three-dimensional hexagonal honeycomb lattice. This is die-cut expandable paper cushioning, NOT plastic bubble wrap, NOT solid decorative sheet, NOT mesh fabric. A removable warm-ivory paper band around the front horizontal natural-kraft roll bears a modest faithful official orange WELLTROY logo; the honeycomb paper is unprinted. Preserve natural brown/white/black material palette, subtly complement brand greens through a plain deep-green roll band on one rear roll. No extra packaged objects, no certification claims.
```


