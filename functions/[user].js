export async function onRequestGet(context) {
  const { params, request } = context;
  const username = params.user;
  const url = new URL(request.url);
  
  const isRecent = url.searchParams.get('recent') !== 'false';

  if (!username || username === 'favicon.ico') {
    return context.next();
  }

  // Returning to the 'site:' operator but simplifying the path.
  // Using the profile root (site:twitter.com/username) is more reliable 
  // for Google's 'Sort by date' than targeting the /status subfolder.
  let searchQueue = `site:twitter.com/${username}`;
  
  // tbs=qdr:w,sbd:1 -> Past week, Sorted by Date.
  const timeParam = isRecent ? '&tbs=qdr:w,sbd:1' : '';

  const redirectUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQueue)}${timeParam}`;

  return Response.redirect(redirectUrl, 302);
}
