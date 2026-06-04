export async function onRequestGet(context) {
  const { params, request } = context;
  const username = params.user;
  const url = new URL(request.url);
  const isRecent = url.searchParams.get('recent') === 'true';

  if (!username || username === 'favicon.ico') {
    return next();
  }

  // Target: Google search for tweets from the specific user
  let searchQueue = `site:x.com/${username}`;
  
  // Google parameter for "past 24 hours" is &tbs=qdr:d
  const timeParam = isRecent ? '&tbs=qdr:d' : '';

  const redirectUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQueue)}${timeParam}`;

  return Response.redirect(redirectUrl, 302);
}
