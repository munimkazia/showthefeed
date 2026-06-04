export async function onRequestGet(context) {
  const { params, request } = context;
  const username = params.user;
  const url = new URL(request.url);
  
  const isRecent = url.searchParams.get('recent') !== 'false';

  if (!username || username === 'favicon.ico') {
    return context.next();
  }

  // Mimicking the search that the user confirmed works best.
  // We include both x.com and twitter.com to catch the transition.
  let searchQueue = `${username} (site:x.com OR site:twitter.com)`;
  
  // tbs=qdr:w -> Last week
  // sbd:1    -> Sort by date
  // We use qdr:w,sbd:1 as the default for a chronological "feed" feel.
  const timeParam = isRecent ? '&tbs=qdr:w,sbd:1' : '';

  const redirectUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQueue)}${timeParam}`;

  return Response.redirect(redirectUrl, 302);
}
