export async function onRequestGet(context) {
  const { params, request } = context;
  const username = params.user;
  const url = new URL(request.url);
  
  const isRecent = url.searchParams.get('recent') !== 'false';

  if (!username || username === 'favicon.ico') {
    return context.next();
  }

  // To get the latest tweets (and not just the profile page), 
  // we target the /status/ path where individual tweets live.
  // This allows Google's "Sort by date" (sbd:1) to work accurately.
  let searchQueue = `site:x.com/${username}/status OR site:twitter.com/${username}/status`;
  
  // tbs=qdr:w -> Last week
  // sbd:1    -> Sort by date (newest first)
  const timeParam = isRecent ? '&tbs=qdr:w,sbd:1' : '';

  const redirectUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQueue)}${timeParam}`;

  return Response.redirect(redirectUrl, 302);
}
