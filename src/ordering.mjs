import { coreOrderPolicy, isCoreOrderProduct } from './core-order-policy.mjs';
export { coreOrderPolicy, coreOrderProducts } from './core-order-policy.mjs';

export const catalogue = {
  path: '/catalog/Welltroy-Product-Catalog-2025.pdf',
  label: '2025 Welltroy product catalogue'
};

export const orderTerms = {
  design: 'Free initial design draft within 24 hours after a clear packaging and artwork brief. Final production artwork requires separate written approval.',
  sample: 'Samples are free. Preparation can take as little as 3 days after specifications and artwork are confirmed. The delivery target is within 7 days of confirmation, depending on destination. Confirm the sample type and shipping arrangements, including any delivery charges, before dispatch.',
  production: 'Typically about 15–20 days after payment. Confirm the production start milestone in your quotation; shipping time is additional.',
  payment: 'T/T (bank transfer): 30% deposit and 70% balance. Confirm the balance payment milestone in your written quotation.'
};

export function minimumOrder(slug) {
  if (isCoreOrderProduct(slug)) return `${coreOrderPolicy.pieces} pieces; confirm the breakdown by size, color and design`;
  if (['honeycomb-paper-rolls', 'colored-honeycomb-paper-rolls'].includes(slug)) return 'From 1 roll (1 pc)';
  if (slug === 'thermal-labels') return 'From 500 units; confirm roll or fanfold configuration';
  if (slug === 'custom-stand-up-pouches') return '1,000 pieces shown in supplier example; confirm by specification';
  return 'From 500 pieces for eligible specifications';
}
