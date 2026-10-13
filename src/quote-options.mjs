// Shared by the form and the mail handler so assisted enquiries stay valid.
export const assistedChoices = [
  { slug: 'multiple-products', name: 'Multiple products' },
  { slug: 'not-sure', name: 'Not sure — help me choose' }
];

export function selectionGuidance(slug) {
  if (slug === 'multiple-products') return {
    help: 'List each product, size and quantity in the requirements below.',
    quantity: 'e.g. 1,000 mailers + 500 paper bags',
    quantityHelp: 'Give quantities by product, or write “See requirements below”.',
    message: 'Products and requirements *',
    placeholder: 'For each product, list the type, quantity, size and printing needs. Example: 1,000 poly mailers, 25 × 30 cm, one-color logo; 500 paper bags, size to be confirmed.',
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
  const rolls = ['honeycomb-paper-rolls', 'colored-honeycomb-paper-rolls'].includes(slug);
  const labels = slug === 'thermal-labels';
  return {
    help: 'Choose a product, or select an assisted enquiry above if you need help.',
    quantity: rolls ? 'e.g. 500 rolls' : labels ? 'e.g. 500 rolls; specify labels per roll' : 'e.g. 1,000 pieces',
    quantityHelp: labels ? 'Specify rolls or fanfold packs and labels per unit; the sales unit will be confirmed.' : rolls ? 'Honeycomb paper starts at 500 rolls. An estimate is welcome.' : 'Most bags and mailers start at 500 pieces. An estimate is welcome.',
    message: 'Packaging and printing requirements',
    placeholder: 'Tell us what you are packing, preferred material, colors, logo printing and required schedule.',
    required: false
  };
}
