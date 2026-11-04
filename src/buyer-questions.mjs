// Editorial buyer questions informed by the saved US-market research, not a frequency ranking.
// Product specifications and approval remain specific to the buyer's quotation and sample.
export const buyerQuestions = {
  'poly-mailers': [
    { q: 'Where should a shipping label go on a custom printed poly mailer?', a: 'Reserve a label area in the artwork using your actual label dimensions. Apply the intended label to a filled, closed sample and check that it stays flat, adheres to the selected film and remains readable. Keep branding and the opening method clear of the label area; confirm the layout before approving printing.' },
    { q: 'Can I calculate US postage from the catalogue bag size?', a: 'The catalogue size helps select a bag; it is not a postage quote. Record the empty bag dimensions and the filled, sealed parcel dimensions and weight. Follow the measurement and pricing instructions for your chosen carrier and service, which may use different measurement bases. Check postage separately from the cost of buying and delivering the empty bags.' }
  ],
  'poly-bubble-mailers': [
    { q: 'What should I check when applying a shipping label to a bubble mailer?', a: 'Test your actual label on the selected exterior with the contents inside and the flap closed. Review adhesion, wrinkles, placement and barcode readability after handling the sample. Keep the label clear of the opening and avoid folding it over an edge. A bubble liner does not establish compatibility with every label adhesive.' },
    { q: 'Does the catalogue bubble mailer size determine the filled parcel size?', a: 'No. The catalogue describes the flat outer width and body length, with the flap listed separately. Contents, lining and closure change the shape of the finished parcel. Keep both the original bag measurements and the filled, sealed pack measurements and weight; use the measurement rules for the shipping service you select.' }
  ],
  'metallic-bubble-mailers': [
    { q: 'Will shipping labels stick to a holographic bubble mailer?', a: 'Compatibility depends on the actual label adhesive and the selected surface. Send the label dimensions and intended position, then test your label on a filled sample. Check adhesion, wrinkles and barcode readability after the agreed handling check. Confirm the offered finish and printing layout rather than assuming every reflective or holographic surface behaves the same way.' },
    { q: 'Can a digital proof confirm the finish and label performance?', a: 'A digital proof helps review wording, artwork, placement and the space reserved for a label. It cannot confirm the physical surface effect, label adhesion, filled fit or closure. Ask which existing or custom sample represents your proposed order, record any differences, and approve the relevant physical checks separately.' }
  ],
  'zipper-bags': [
    { q: 'How do I check a garment barcode label inside a zipper bag?', a: 'Put the actual folded garment, label and inserts into the proposed sample. Check label position and visibility through the offered finish, then try the intended scanner as part of your packing workflow. Confirm loading and full reclosure without moving or covering the label. This is an inner-pack identification check; choose and label the outer shipping pack separately.' }
  ]
};
