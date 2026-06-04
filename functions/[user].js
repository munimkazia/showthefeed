export async function onRequestGet(context) {
  const { params, request } = context;
  const username = params.user;
  const url = new URL(request.url);
  
  const isRecent = url.searchParams.get('recent') !== 'false';

  if (!username || username === 'favicon.ico') {
    return context.next();
  }

  // Strictly targeting x.com as requested.
  let searchQueue = `site:x.com/${username}`;
  
  // Reverting to 24-hour window (qdr:d) with sort-by-date (sbd:1).
  // If sorting is unstable, the 24h window ensures only the most recent indexed items appear.
  const timeParam = isRecent ? '&tbs=qdr:d,sbd:1' : '';

  const redirectUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQueue)}${timeParam}`;

  return Response.redirect(redirectUrl, 302);
}
