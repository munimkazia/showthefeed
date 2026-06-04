export async function onRequestGet(context) {
  const { params, request } = context;
  const username = params.user;
  const url = new URL(request.url);
  
  // Default to a 24-hour window if no specific param is provided,
  // or allow the user to specify a broader window.
  const isRecent = url.searchParams.get('recent') !== 'false';

  if (!username || username === 'favicon.ico') {
    return context.next();
  }

  // searchQueue: site:x.com/username ensures we only get that account.
  // We use x.com instead of twitter.com as x.com is the current primary domain.
  let searchQueue = `site:x.com/${username}`;
  
  // Google Time Parameters (tbs):
  // qdr:h (past hour)
  // qdr:d (past 24 hours)
  // qdr:w (past week)
  // sbd:1 (sort by date) - Note: sbd:1 often requires a qdr parameter to be present.
  
  // We use past 24 hours (qdr:d) and sort by date (sbd:1) for the best "feed" experience.
  const timeParam = isRecent ? '&tbs=qdr:d,sbd:1' : '';

  const redirectUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQueue)}${timeParam}`;

  return Response.redirect(redirectUrl, 302);
}
