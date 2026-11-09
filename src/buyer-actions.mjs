// Fixed public identifiers only; never use link text, query values or form data.
export const customerProjects = new Map([
  ['strawberry-apparel', {product:'poly-mailers', section:'poly-mailer-case'}],
  ['lumiere', {product:'poly-bubble-mailers', section:'lumiere-case'}],
  ['verdant-studio', {product:'poly-bubble-mailers', section:'verdant-case'}]
]);
export const buyerResources = new Map([
  ['poly-mailer-logo-brief', {product:'poly-mailers', path:'/downloads/poly-mailer-logo-quote-brief.txt'}],
  ['clothing-fit-record', {product:'poly-mailers', path:'/downloads/clothing-mailer-fit-record.txt'}],
  ['bubble-mailer-brief', {product:'poly-bubble-mailers', path:'/downloads/bubble-mailer-quote-brief.txt'}],
  ['packaging-quality-brief', {product:'multiple-products', path:'/downloads/packaging-quality-review-brief.txt'}],
  ['mailer-sample-check', {product:'multiple-products', path:'/downloads/mailer-label-and-sample-check.txt'}],
  ['bubble-quote-comparison', {product:'poly-bubble-mailers', path:'/downloads/bubble-mailer-quote-comparison.txt'}],
  ['garment-selection-brief', {product:'multiple-products', path:'/downloads/garment-bag-selection-brief.txt'}],
  ['garment-sample-record', {product:'zipper-bags', path:'/downloads/garment-bag-sample-approval.txt'}],
  ['garment-pack-quote-comparison', {product:'multiple-products', path:'/downloads/garment-inner-outer-quote-comparison.txt'}],
  ['bulk-packaging-arrival-inspection', {product:'multiple-products', path:'/downloads/bulk-packaging-arrival-inspection.txt'}]
]);

export function buyerLinkAction(href, origin) {
  try {
    const url = new URL(href, origin);
    if (!['http:','https:'].includes(url.protocol) || url.origin !== origin) return null;
    for (const [projectId, project] of customerProjects) {
      if (url.pathname === `/products/${project.product}/` && url.hash === `#${project.section}`) {
        return {name:'customer_project_open', details:{project_id:projectId}};
      }
    }
    for (const [resourceId, resource] of buyerResources) {
      if (url.pathname === resource.path) {
        return {name:'buyer_resource_download', details:{resource_id:resourceId}};
      }
    }
  } catch { /* malformed links do not affect navigation */ }
  return null;
}

export function projectForQuote(section, product) {
  for (const [projectId, project] of customerProjects) {
    if (project.section === section && project.product === product) return projectId;
  }
  return null;
}
