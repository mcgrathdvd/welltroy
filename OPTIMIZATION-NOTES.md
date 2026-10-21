# Mobile product discovery and consented marketing attribution

Base production commit: 2f0510e238bf240d1ac6e3b427b273bd1e2a91b8.

The product image previously appeared below the first mobile screen. The shared template now places the heading, product image, ordering facts and quote action before the longer explanation on mobile. Desktop retains a two-column presentation. Existing artwork and its illustration/reference labels are retained. Specification tables now have captions and explicit row/column headers. Quote links continue to carry the selected product and catalogue size.

The approved homepage illustration has responsive WebP derivatives (480/800px mobile crops and a 1280px desktop variant). The originals remain in place for larger displays and social previews. Run `node scripts/generate-home-images.mjs` to regenerate derivatives from the existing source. Their measured file sizes are approximately 29KB, 55KB and 51KB, versus 153KB for the original; this is an asset-size comparison, not a Core Web Vitals result.

Primary quote actions in the homepage hero, product hero and desktop contact pill use “Request a Custom Quote”. Compact header/mobile controls retain shorter wording. Existing brand colors and navigation are preserved.

## Analytics behavior

GA still loads only on the production hostname after explicit consent. All advertising consent states remain denied. Neither this release nor its tests change GA4 account settings, create advertising audiences or enable collection on localhost/preview hosts.

Public UTM values are mapped explicitly to GA's `campaign_source`, `campaign_medium` and `campaign_name`. Raw queries/fragments remain excluded from `page_location`. Campaign values must be registered in `src/campaigns.mjs`:

- Sources: google, bing, linkedin, facebook, instagram, pinterest, newsletter, whatsapp.
- Media: cpc, ppc, paid_search, paid_social, email, social, referral.
- Names: any existing product slug, packaging, custom-packaging, samples, catalogue.

All three values must match exactly; unknown/duplicate values are discarded. Add a planned public campaign label to the source allowlist before sending traffic to it. Do not use recipient/customer names, email addresses, order numbers, contact IDs or free-text labels.

Example public campaign URL:

    https://welltroy.com/products/poly-mailers/?utm_source=google&utm_medium=cpc&utm_campaign=poly-mailers

The whitelisted campaign record is written to sessionStorage only after consent, expires after 30 minutes, and is cleared on refusal/withdrawal. It can carry attribution from a landing page to a subsequent quote page in the same tab. A new external visit or unrecognised explicit UTM visit clears the old record. No raw URL, referrer path, contact information or form content is stored in that record. Stored labels are revalidated before use.

New events:

| Event | Public fields | Meaning |
|---|---|---|
| quote_cta_click | product_slug, placement | Quote link clicked; not a received enquiry. |
| select_size | product_slug, model | A real catalogue model selected from a quote link; never the free-text size field. |
| download_catalogue | document | Original PDF clicked or print/save guide button clicked. A print-button click does not prove a file was saved. |
| sample_interest | product_slug, sample_type | Sample preference selected; not a confirmed sample order. |

Static page titles replace the generic “Welltroy” analytics title. Existing success/error events and their server-confirmation conditions are retained. All event details remain filtered. Test links must be checked in GA4 DebugView and reports after deployment; frontend unit tests do not prove ingestion or CRM attribution. Register new custom dimensions in GA4 only if needed for reporting (for example placement/model/sample_type/document); do not treat clicks as quote conversions.

## Validation and deployment

Run the existing Node tests plus `tests/campaigns.test.mjs`, then the standard Astro production build. Check phone widths 320/390px and desktop 1280px; follow a P03 quote link and verify prefilled product/model. Check all generated internal links and image references.

Deploy through the existing GitHub → Cloudflare Pages integration. This change retains the existing Pages Functions, SMTP transport, Turnstile checks, payment terms, legacy category redirects, canonical URLs, titles/descriptions and corrected WebPage-based product structured data. Do not deploy a static-only `dist` upload that omits the existing Functions. No new secret, dependency or service is required.

Material/thickness specifications, certification documents, customer cases and real product photography require verified business inputs. This release does not invent those facts or reinstate unsupported Product prices/ratings.
