export async function onRequest(context) {
  const url = new URL(context.request.url);
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
    return Response.redirect(url.toString(), 301);
  }
  if (url.hostname === 'www.welltroy.com') {
    url.hostname = 'welltroy.com';
    url.protocol = 'https:';
    return Response.redirect(url.toString(), ['GET', 'HEAD'].includes(context.request.method) ? 301 : 308);
  }
  return context.next();
}
