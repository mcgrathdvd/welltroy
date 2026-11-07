import { coreOrderPolicy } from './core-order-policy.mjs';
// Shared by the form and the mail handler so assisted enquiries stay valid.
export const assistedChoices = [
  { slug: 'multiple-products', name: 'Multiple products' },
  { slug: 'not-sure', name: 'Not sure — help me choose' }
];

export function selectionGuidance(slug) {
  if (slug === 'multiple-products') return {
    help: 'List each product, size and quantity in the requirements below.',
    quantity: 'e.g. 1,000 poly mailers + 500 garment bags',
    quantityHelp: 'Give quantities by product, or write “See requirements below”.',
    message: 'Products and requirements *',
    placeholder: 'List each product separately. Example: 500 frosted garment slider bags plus 1,000 PE poly mailers. Include folded garment dimensions, usable bag sizes if known, material, logo printing and quantity for each size/design. We can help choose the inner and outer sizes.',
    required: true
  };
  if (slug === 'not-sure') return {
    help: 'Describe what you need to pack and we can help compare suitable formats.',
    quantity: 'Estimated quantity, or “Not sure”',
    quantityHelp: 'An estimate is enough. Write “Not sure” if you need guidance.',
    message: 'What do you need to pack? *',
    placeholder: 'Tell us about your goods, approximate size or weight, shipping or retail use, and any branding needs.',
    required: true
  };
  const core = {
    'zipper-bags': {
      help: 'For folded clothing: frosted is the main finish; clear bags are also available. Slider zippers are the primary closure. Add a separate outer mailer for shipping.',
      placeholder: 'Folded garment width × length × thickness, with units; frosted or clear; slider zipper or another closure request; PE/PVC preference or ask for advice; logo and quantity by size/design. Include any inner-space target, inserts, warning text and required arrival date.'
    },
    'poly-mailers': {
      help: 'PE outer shipping bags with a self-adhesive peel-and-seal flap. Measure the complete packed order, including any garment inner bag.',
      placeholder: 'Packed item dimensions and weight; model or usable inner-size target; PE single-wall thickness if known; flap, color, logo and quantity by size/design. Include inner bags or inserts, destination and required arrival date.'
    },
    'poly-bubble-mailers': {
      help: 'LDPE plastic bubble mailers with peel-and-seal closure. Specify usable inner space and cushioning separately from the catalogue outer size.',
      placeholder: 'Packed item dimensions, weight and fragility; usable opening and inner size if known; bubble cushioning and closure; color, logo and quantity by size/design. State thickness units and measurement method if requesting a specific value.'
    },
    'metallic-bubble-mailers': {
      help: 'Compare the actual metallic or holographic finish, bubble construction, usable space and print compatibility for your order.',
      placeholder: 'Metallic or holographic finish reference; packed item dimensions and weight; usable inner-size target; artwork, print sides and quantity by size/design. Ask for a sample of the offered finish and confirm delivery scope.'
    },
    'yellow-kraft-bubble-mailers': {
      help: 'Kraft-paper exterior with bubble cushioning and peel-and-seal closure. Request usable inner dimensions for your complete packed item.',
      placeholder: 'Packed item dimensions, weight and protection needs; usable inner-size target; kraft paper and bubble lining requirements; flap, logo and quantity by size/design. Include destination and required arrival date.'
    }
  };
  if (Object.hasOwn(core, slug)) return {
    ...core[slug],
    quantity: 'e.g. 500 pieces, or Not sure',
    quantityHelp: coreOrderPolicy.quantityHelp,
    message: 'Product specifications and printing requirements',
    required: false
  };
  const rolls = ['honeycomb-paper-rolls', 'colored-honeycomb-paper-rolls'].includes(slug);
  const labels = slug === 'thermal-labels';
  return {
    help: 'Choose a product, or select an assisted enquiry above if you need help.',
    quantity: rolls ? 'e.g. 1 roll' : labels ? 'e.g. 500 rolls; specify labels per roll' : 'e.g. 1,000 pieces',
    quantityHelp: labels ? 'Specify rolls or fanfold packs and labels per unit; the sales unit will be confirmed.' : rolls ? 'Honeycomb paper starts at 1 roll (1 pc). Enter the quantity in rolls.' : 'Most bags and mailers start at 500 pieces. An estimate is welcome.',
    message: 'Packaging and printing requirements',
    placeholder: 'Tell us what you are packing, preferred material, colors, logo printing and required schedule.',
    required: false
  };
}
