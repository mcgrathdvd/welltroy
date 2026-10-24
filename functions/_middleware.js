function protectResponse(response, url) {
  // Upstream redirects and asset responses can have immutable headers.
  const protectedResponse = new Response(response.body, response);
  const headers = protectedResponse.headers;
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  if (url.protocol === 'https:' && ['welltroy.com', 'www.welltroy.com'].includes(url.hostname)) {
    // Host-only: do not impose HTTPS policy on unrelated mail or other subdomains.
    headers.set('Strict-Transport-Security', 'max-age=15768000');
  }
  if (url.hostname === 'welltroy.pages.dev' || url.hostname.endsWith('.welltroy.pages.dev')) {
    headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  if (/^text\/html(?:;|$)/i.test(headers.get('Content-Type') || '')) {
    headers.set('X-Frame-Options', 'DENY');
    // Keep Turnstile/GA/fonts working; script-src and frame-src need a separate audited policy.
    const policy = "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'";
    const existing = headers.get('Content-Security-Policy');
    headers.set('Content-Security-Policy', existing ? `${existing}, ${policy}` : policy);
  }
  return protectedResponse;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const requestUrl = new URL(url);
  const legacyPages = {
    '/product-catelog': '/catalogue/',
    '/web-agency-gb-contact-us': '/about/#contact',
    '/web-agency-gb-about-us': '/about/',
    // Exact retired product URLs observed in Search Console. Unmatched old
    // products keep their real status rather than redirecting to a guessed range.
    '/product/customized-printed-metallic-bubble-envelope-bags-waterproof-packaging-poly-bubble-mailers': '/products/metallic-bubble-mailers/',
    '/product/packaging-kraft-paper-shopping-bag': '/products/kraft-paper-bags/',
    '/product/custom-luxury-large-coffee-kraft-craft-black-brown-christmas-paper-bags-gift-shopping-bag': '/products/kraft-paper-bags/',
    '/product/custom-printed-shopping-paper-bags-luxury-branded-gift-paper-bags': '/products/paper-gift-bags/'
  };
  const destination = legacyPages[url.pathname.replace(/\/$/, '')];
  if (destination && ['GET', 'HEAD'].includes(context.request.method)) {
    const target = new URL(destination, 'https://welltroy.com');
    target.search = url.search;
    return protectResponse(Response.redirect(target.toString(), 301), requestUrl);
  }
  const legacyCategories = {
    '/product-category/mailer-shipping-bags': 'group-1',
    '/product-category/product-packaging': 'group-2'
  };
  const group = legacyCategories[url.pathname.replace(/\/$/, '')];
  if (group && ['GET', 'HEAD'].includes(context.request.method)) {
    url.hostname = 'welltroy.com';
    url.protocol = 'https:';
    url.port = '';
    url.pathname = '/products/';
    url.hash = group;
    return protectResponse(Response.redirect(url.toString(), 301), requestUrl);
  }
  if (url.hostname === 'www.welltroy.com') {
    url.hostname = 'welltroy.com';
    url.protocol = 'https:';
    return protectResponse(Response.redirect(url.toString(), ['GET', 'HEAD'].includes(context.request.method) ? 301 : 308), requestUrl);
  }
  return protectResponse(await context.next(), requestUrl);
}
