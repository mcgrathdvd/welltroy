export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === 'www.welltroy.com') {
    url.hostname = 'welltroy.com';
    url.protocol = 'https:';
    return Response.redirect(url.toString(), ['GET', 'HEAD'].includes(context.request.method) ? 301 : 308);
  }
  return context.next();
}
