export async function onRequestGet(context) {
  const { params, request } = context;
  const username = params.user;
  const url = new URL(request.url);
  
  // Default to a 1-week window if no specific param is provided.
  const isRecent = url.searchParams.get('recent') !== 'false';

  if (!username || username === 'favicon.ico') {
    return context.next();
  }

  // site:x.com/username ensures we only get that account.
  let searchQueue = `site:x.com/${username}`;
  
  // We use past week (qdr:w) and sort by date (sbd:1) as the default.
  // This ensures results are visible even if there hasn't been a post today.
  const timeParam = isRecent ? '&tbs=qdr:w,sbd:1' : '';

  const redirectUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQueue)}${timeParam}`;

  return Response.redirect(redirectUrl, 302);
}
