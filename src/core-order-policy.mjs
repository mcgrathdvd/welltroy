// Business-confirmed core range MOQ. A size/artwork split is agreed in the quote.
export const coreOrderPolicy = Object.freeze({
  pieces: 500,
  summary: 'The MOQ is 500 pieces for Welltroy poly mailers, bubble mailers and garment zipper bags.',
  breakdown: 'List the quantity for each size, color and design so we can confirm how the order is split, the available printing route and setup costs.',
  configuration: 'A 500-piece MOQ does not establish every material and print combination.',
  quantityHelp: 'MOQ: 500 pieces. List quantities by size, color and design; the order breakdown and printing route are confirmed in your quote.'
});

export const coreOrderProducts = [
  {slug:'poly-mailers', name:'Poly Mailers', material:'PE film', closure:'Self-adhesive peel-and-seal flap', check:'Confirm single-wall film thickness, usable inner space and the filled-pack closure.'},
  {slug:'poly-bubble-mailers', name:'Poly Bubble Mailers', material:'LDPE plastic exterior with bubble cushioning', closure:'Self-adhesive peel-and-seal flap', check:'Confirm usable inner dimensions, liner and measurement method; overall thickness including bubbles is separate from film gauge.'},
  {slug:'yellow-kraft-bubble-mailers', name:'Kraft Bubble Mailers', material:'Kraft-paper exterior with bubble cushioning', closure:'Self-adhesive peel-and-seal flap', check:'Confirm paper weight, bubble structure, outer and usable inner dimensions.'},
  {slug:'metallic-bubble-mailers', name:'Metallic & Holographic Bubble Mailers', material:'Reflective or holographic exterior with bubble cushioning; confirm the exact layer structure', closure:'Confirm flap and adhesive for the selected finish', check:'Approve the actual finish, printing, usable space and filled sample.'},
  {slug:'zipper-bags', name:'Garment Zipper Bags', material:'PE or PVC options; frosted is the main finish, with clear also available', closure:'Primarily slider zipper; alternatives reviewed on request', check:'Inner packaging for folded clothing. Confirm space below the zipper and use a suitable outer shipping pack.'}
];

export function isCoreOrderProduct(slug) {
  return coreOrderProducts.some(product => product.slug === slug);
}
