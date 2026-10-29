import { orderTerms } from './ordering.mjs';

// Confirmed buyer answers shared by Home and FAQ. Product-specific options are
// confirmed in the quotation; source links point to the supporting site detail.
export const buyerAnswers = [
  {
    id: 'mailer-range',
    q: 'Which custom mailers does Welltroy supply?',
    a: 'Welltroy supplies poly mailers for soft, non-fragile goods, poly bubble mailers with an inner cushioning layer, and metallic or holographic bubble mailers. Choose the format around your complete packed item, then confirm usable inner dimensions, material, printing and closure with a sample.',
    href: '/guides/choose-a-mailer/', label: 'Compare the three mailer ranges'
  },
  {
    id: 'custom-mailer-minimum',
    q: 'Can I order 500 custom printed mailers?',
    a: 'Eligible Welltroy poly, poly bubble and metallic bubble mailer specifications start from 500 pieces per confirmed size, color and design. Send the quantity for each version so we can confirm its minimum. Splitting 500 pieces across versions does not automatically qualify, and full-coverage printing or a different construction may have different requirements.',
    href: '/guides/custom-packaging-500-pieces/', label: 'Check the 500-piece enquiry requirements'
  },
  {
    id: 'free-design-timing',
    q: 'Can I get a free mailer design draft within 24 hours?',
    a: 'Yes. Welltroy offers a free initial design draft within 24 hours after receiving a clear packaging and artwork brief. Send your product, size, logo files, print sides, colors and quantity. The initial draft starts the review; the final production artwork and specification require separate written approval.',
    href: '/guides/logo-artwork-checklist/', label: 'Prepare the artwork and approval brief'
  },
  {
    id: 'free-samples-delivery',
    q: 'Are samples free, and can they arrive within seven days?',
    a: orderTerms.sample,
    href: '/ordering/', label: 'Read the current sample and delivery terms'
  },
  {
    id: 'metallic-or-holographic',
    q: 'Can Welltroy supply both metallic and holographic bubble mailers?',
    a: 'Yes. Welltroy supplies metallic reflective and holographic or rainbow-effect bubble mailers, with samples available for both. A reflective metallic appearance alone does not establish a holographic effect. Send the exact finish reference, size, artwork and quantity so we can confirm the offered surface, printing and sample arrangements.',
    href: '/products/metallic-bubble-mailers/', label: 'Check both finishes and sample options'
  },
  {
    id: 'mailer-size-dimensions',
    q: 'Are mailer catalogue dimensions internal or external?',
    a: 'The three main mailer ranges list catalogue outer width × body length + flap. The flap is separate from usable body length, and seams and bubble lining reduce usable inner space. Measure your complete pack including its thickness, request the inner dimensions and tolerance, and test insertion and closure before approving a size.',
    href: '/guides/mailer-size-for-clothing/', label: 'See the measurement and size comparison example'
  },
  {
    id: 'design-or-approval',
    q: 'Does free design mean my artwork is approved for production?',
    a: 'No. A free initial design draft is a starting point. Production approval is a separate written confirmation of the final artwork version, material, size, placement, colors and quantity, with a physical reference where required. Keep the approved sample and matching quotation together before bulk production.',
    href: '/guides/logo-artwork-checklist/#approval', label: 'Check the artwork approval steps'
  },
  {
    id: 'comparable-mailer-quotes',
    q: 'What should I compare before choosing a mailer quote?',
    a: 'Compare the same construction, usable dimensions, material and thickness convention, artwork, quantity per design, sample route and delivery scope before comparing totals. Ask suppliers to identify included, excluded and unresolved charges in writing. Bulk production is typically 15–20 days after payment; shipping time is additional and the start milestone is confirmed in the quotation.',
    href: '/guides/compare-custom-mailer-quotes/', label: 'Use the quote comparison worksheet'
  }
];

export const homeBuyerAnswers = ['custom-mailer-minimum', 'free-design-timing', 'free-samples-delivery']
  .map(id => buyerAnswers.find(answer => answer.id === id));
