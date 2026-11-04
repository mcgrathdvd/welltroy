export const specificationFields = {
  'poly-bubble-mailers': ['innerSize', 'closure', 'liner', 'packout'],
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
  if (product === 'zipper-bags') return 'Please advise which detail photos are available for this zipper bag: usable space below the closure, zipper/opening, surface/printing and bundle/carton packing.';
  return '';
}
export const bagSpecifications = {
  'poly-bubble-mailers': {
    title: 'Compare the Specifications for Your Custom Bubble Mailer',
    intro: 'Choose a confirmed catalogue outer size or request a custom size. Use the project references to prepare your brief, then confirm usable space, film, lining, closure, printing and packing together for your order.',
    rows: [
      ['Dimensions', 'BM01–BM15 are confirmed catalogue outer sizes: width × body length + a separate flap. Custom sizes are also available.', 'For a catalogue or custom size, confirm usable inner width, length and clear opening for the selected liner and seams.'],
      ['Outer film & finish', 'The LUMIÈRE project brief describes co-extruded PE and a matte pink exterior.', 'Specify your material, color and surface. Confirm them for this order separately from the project reference.'],
      ['Film gauge & bubble lining', 'Outer film and bubble lining are separate parts of the construction.', 'State film gauge and liner requirements separately, with units and an agreed measurement method.'],
      ['Flap & adhesive', 'The flap is a separate part of the catalogue size notation.', 'Confirm flap length, adhesive arrangement and closure with the complete filled pack.'],
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
      ['Material & film gauge', 'The catalogue presents a reclosable inner-bag format.', 'Name the requested material and single-wall film thickness with units; confirm the offered material and tolerance in writing.'],
      ['Finish & visibility', 'Clear and printed examples are shown in the catalogue.', 'Describe garment visibility and label readability. Request a clear, frosted or colored appearance for review and confirm the offered finish on a sample.'],
      ['Zipper & opening', 'The range is presented as reclosable inner packaging.', 'Describe how it should open and reclose. Check loading, removal and full closure around the folded item.'],
      ['Artwork, labels & holes', 'Artwork and identification belong to the individual bag version.', 'Provide print sides, label area, approved warning wording and any requested hole positions for a feasibility check.'],
      ['Quantity & packing', 'A garment SKU and a packaging version are different records.', 'List quantity by bag size/design and request bundle/carton counts, carton dimensions and shipping weight.']
    ],
    photoIntro: 'The original catalogue provides the current Z-series size and appearance reference. For the chosen specification, ask which close-up photos and filled samples are available before approving the opening, finish and closure.',
    photoLink: null, photoLabel: null,
    guide: '/guides/apparel-inner-bags-and-shipping-mailers/#sku-record', guideLabel: 'Record garment groups and inner-bag versions'
  }
};
