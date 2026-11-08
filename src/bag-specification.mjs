export const specificationFields = {
  'poly-bubble-mailers': ['innerSize', 'closure', 'liner', 'packout'],
  'yellow-kraft-bubble-mailers': ['innerSize', 'closure', 'liner', 'packout'],
  'zipper-bags': ['innerSize', 'closure', 'appearance', 'packout']
};
export const specificationLabels = {
  innerSize: 'Requested usable inner size / opening',
  closure: 'Requested closure',
  liner: 'Requested bubble liner / cushioning',
  appearance: 'Requested finish / visibility',
  packout: 'Requested bundle / carton packing'
};
export function detailPhotoRequest(product) {
  if (product === 'poly-bubble-mailers') return 'Please advise which detail photos are available for this bubble mailer: usable opening, outer film and lining, flap/adhesive and bundle/carton packing.';
  if (product === 'yellow-kraft-bubble-mailers') return 'Please advise which detail photos are available for this kraft bubble mailer: usable opening, kraft-paper exterior and bubble lining, flap/adhesive and bundle/carton packing.';
  if (product === 'zipper-bags') return 'Please advise which detail photos are available for this zipper bag: usable space below the closure, zipper/opening, surface/printing and bundle/carton packing.';
  return '';
}
export const bagSpecifications = {
  'yellow-kraft-bubble-mailers': {
    title: 'Confirm the Construction for Your Custom Kraft Bubble Mailer',
    intro: 'Start with your packed item or requested usable inner size. The published range confirms a kraft-paper exterior, bubble cushioning and a peel-and-seal flap; agree the actual dimensions, paper, lining, artwork and quantity for your order.',
    rows: [
      ['Size and opening', 'No numbered catalogue size table is published for this kraft bubble range.', 'Give packed width, length and thickness with units, or a usable inner-size target. Confirm the offered outer size, clear opening, flap and tolerance.'],
      ['Paper exterior', 'Yellow kraft-paper exterior.', 'Request the offered paper specification and weight. Confirm the surface and printing for your own order.'],
      ['Bubble lining', 'Bubble cushioning is part of this format; numerical thickness is not published.', 'Confirm liner material and structure, usable space and any thickness measurement with units and method. Paper weight, film gauge and overall thickness are separate measurements.'],
      ['Closure', 'Self-adhesive peel-and-seal flap.', 'Confirm flap length, adhesive arrangement and the closure around the complete packed item.'],
      ['Logo and artwork', 'Custom logo printing can be requested.', 'Send artwork, print sides, color references, coverage and placement. Confirm the offered print process and physical sample.'],
      ['Quantity and packing', 'MOQ: 500 pieces for this core bubble-mailer format.', 'List quantity by size, color and design; agree the split, pieces per bundle/carton, carton dimensions and delivery scope in your quote.']
    ],
    photoIntro: 'The product image is an appearance reference, not an inner-size measurement or lining test. Ask which close-ups and filled samples are available for your selected construction.',
    photoLink: null, photoLabel: null,
    guide: '/guides/kraft-vs-poly-bubble-mailers/#usable-size', guideLabel: 'Compare paper and film exteriors and usable dimensions'
  },
  'poly-bubble-mailers': {
    title: 'Compare the Specifications for Your Custom Bubble Mailer',
    intro: 'Choose a confirmed catalogue outer size or request a custom size. Use the project references to prepare your brief, then confirm usable space, film, lining, closure, printing and packing together for your order.',
    rows: [
      ['Dimensions', 'BM01–BM15 are confirmed catalogue outer sizes: width × body length + a separate flap. Custom sizes are also available.', 'For a catalogue or custom size, confirm usable inner width, length and clear opening for the selected liner and seams.'],
      ['Outer film & finish', 'LDPE plastic is the standard material for this poly bubble mailer range.', 'Specify your material, color and surface. Confirm them for this order separately from the project reference.'],
      ['Film gauge & bubble lining', 'Outer-film gauge and overall thickness including bubbles are different measurements.', 'Request the offered film gauge, liner structure and overall thickness including bubbles, with units and an agreed measurement method. Confirm numerical values in the quotation.'],
      ['Flap & adhesive', 'Self-adhesive peel-and-seal closure; the flap is separate from the listed body length.', 'Confirm flap length, adhesive arrangement and closure with the complete filled pack.'],
      ['Printing', 'The LUMIÈRE reference shows black brand artwork on pink.', 'Send print sides, artwork, color references, placement and coverage for a product-specific proof.'],
      ['Quantity & packing', 'Order quantities are checked per confirmed size and design.', 'Agree pieces per bundle/carton, carton dimensions and shipping weight in the quotation.']
    ],
    photoIntro: 'The LUMIÈRE and VERDANT STUDIO projects provide different appearance and buyer-brief references. Confirm the construction for your own order before applying a project detail to a new specification.',
    photoLink: '#lumiere-case', photoLabel: 'Review the LUMIÈRE project reference',
    guide: '/guides/choose-a-mailer/#bubble-fit-record', guideLabel: 'Use the bubble mailer packing and sample record'
  },
  'zipper-bags': {
    title: 'Specify Clothing Zipper Bags Before Comparing Quotes',
    intro: 'Choose a confirmed catalogue outer size or request a custom size around the folded garment, labels and inserts. Agree the actual opening, material, finish, closure and packing for each bag version.',
    rows: [
      ['Dimensions', 'Z01–Z16 are confirmed catalogue outer sizes. Custom sizes are also available.', 'For a catalogue or custom size, confirm measurement direction, usable width between seams, clear opening and height below the actual closure.'],
      ['Material & film gauge', 'PE and PVC options are available for garment inner packaging.', 'Name the requested material and single-wall film thickness with units; confirm the offered material and tolerance in writing.'],
      ['Finish & visibility', 'Frosted is the main finish; clear bags are also available.', 'Choose frosted or clear around garment visibility and label readability. Confirm the material/finish combination and logo on a sample.'],
      ['Zipper & opening', 'Slider zippers are the primary closure; alternatives can be reviewed on request.', 'Confirm the slider, zipper position and clear opening for the selected size. Check loading, removal and full closure around the folded item.'],
      ['Artwork, labels & holes', 'Artwork and identification belong to the individual bag version.', 'Provide print sides, label area, approved warning wording and any requested hole positions for a feasibility check.'],
      ['Quantity & packing', 'MOQ: 500 pieces. A garment SKU and a packaging version are different records.', 'List quantity by bag size/design and request bundle/carton counts, carton dimensions and shipping weight.']
    ],
    photoIntro: 'The original catalogue provides the current Z-series size and appearance reference. For the chosen specification, ask which close-up photos and filled samples are available before approving the opening, finish and closure.',
    photoLink: null, photoLabel: null,
    guide: '/guides/apparel-inner-bags-and-shipping-mailers/#sku-record', guideLabel: 'Record garment groups and inner-bag versions'
  }
};
