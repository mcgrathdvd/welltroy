/** Plan complete packs from a roll; leftover lengths are not joined across rolls. */
export function calculateHoneycombUsage({ rollMetres, drawCentimetres, allowancePercent, packs }) {
  if (!Number.isFinite(rollMetres) || rollMetres <= 0 || rollMetres > 1000000) throw new RangeError('Enter a roll length greater than 0 and no more than 1,000,000 m.');
  if (!Number.isFinite(drawCentimetres) || drawCentimetres <= 0 || drawCentimetres > 100000000) throw new RangeError('Enter measured unexpanded paper per pack greater than 0 and no more than 100,000,000 cm.');
  if (!Number.isFinite(allowancePercent) || allowancePercent < 0 || allowancePercent > 100) throw new RangeError('Enter an extra paper allowance from 0 to 100%.');
  if (!Number.isSafeInteger(packs) || packs < 1 || packs > 10000000) throw new RangeError('Enter a whole order quantity from 1 to 10,000,000 packs.');
  const allowedDrawCentimetres = drawCentimetres * (1 + allowancePercent / 100);
  const ratio = rollMetres * 100 / allowedDrawCentimetres;
  // Correct only floating-point noise close to an exact whole-pack boundary.
  const nearest = Math.round(ratio);
  const stableRatio = Math.abs(ratio - nearest) <= Number.EPSILON * Math.max(1, Math.abs(ratio)) * 4 ? nearest : ratio;
  const packsPerRoll = Math.floor(stableRatio);
  if (!Number.isSafeInteger(packsPerRoll)) throw new RangeError('The inputs produce an unsupported pack count. Check the measurement units.');
  if (packsPerRoll < 1) throw new RangeError('One complete pack needs more paper than the entered roll contains. Check the units, roll length or trial method.');
  return { allowedDrawCentimetres, packsPerRoll, rollsNeeded: Math.ceil(packs / packsPerRoll) };
}
