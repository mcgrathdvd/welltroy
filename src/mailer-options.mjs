// Catalogue dimensions remain the source of truth; inches are display references.
export function approximateInches(size) {
  const match = /^(\d+(?:\.\d+)?) × (\d+(?:\.\d+)?) \+ (\d+(?:\.\d+)?) cm$/.exec(size);
  if (!match) return null;
  return `${match.slice(1).map(value => (Number(value) / 2.54).toFixed(2)).slice(0, 2).join(' × ')} + ${(Number(match[3]) / 2.54).toFixed(2)} in`;
}

export const mailerOrderOptions = {
  'poly-mailers': {
    name: 'Poly Mailers',
    starting: 'Ask us to assess a catalogue size with a simple one- or two-color logo. Screen printing is our main starting method for this artwork.',
    material: 'Choose a single-wall thickness reference of 60, 70, 80, 90 or 100 microns; confirm the offered film, color and tolerance for your size.',
    artwork: 'Send vector artwork, print colors, front/back placement and coverage. Confirm the print area around seams, flap and adhesive.',
    sample: 'Pack the actual folded order, including inserts. Check insertion, usable space, seams and flap closure.',
    more: 'Custom dimensions, film colors, all-over artwork or another printing method need a separate feasibility and minimum-quantity check.'
  },
  'poly-bubble-mailers': {
    name: 'Poly Bubble Mailers',
    starting: 'Ask us to assess an existing bag format with a logo. The decoration method is selected for the film, artwork, coverage and sample requirements.',
    material: 'Confirm the outer film, bubble liner, color, flap and adhesive as one complete construction.',
    artwork: 'Send the logo, print colors, sides and placement. A small logo and fully printed custom film can follow different production routes.',
    sample: 'Pack the actual product and retail box. Check the usable opening, liner, closure and complete-pack protection.',
    more: 'Custom dimensions, a different material structure, full-surface printing or custom film colors may have different setup and quantity requirements.'
  },
  'metallic-bubble-mailers': {
    name: 'Metallic Bubble Mailers',
    starting: 'Ask us to assess a catalogue format and available reflective finish with your logo. Confirm print compatibility on the selected surface.',
    material: 'Confirm the exterior structure, color and finish reference, bubble liner, flap and adhesive.',
    artwork: 'Send the logo, print colors, sides and coverage. Review the proof on the actual reflective surface before approval.',
    sample: 'Check color and print appearance, usable inner space, insertion and closure with your actual contents.',
    more: 'Custom colors, a different finish, custom dimensions and full-coverage artwork need a separate feasibility and minimum-quantity check.'
  }
};
