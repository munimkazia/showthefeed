export async function onRequestGet(context) {
  const { params, request } = context;
  const username = params.user;
  const url = new URL(request.url);
  
  const isRecent = url.searchParams.get('recent') !== 'false';

  if (!username || username === 'favicon.ico') {
    return context.next();
  }

  // Mimicking the exact search pattern that works manually.
  // Using "twitter" instead of "site:x.com" often yields better "Latest" results in Google.
  let searchQueue = `${username} twitter status`;
  
  // tbs=qdr:w -> Last week
  // sbd:1    -> Sort by date
  // We use this exact combination as it is the most reliable way to force Google's chronological sort.
  const timeParam = isRecent ? '&tbs=qdr:w,sbd:1' : '';

  const redirectUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQueue)}${timeParam}`;

  return Response.redirect(redirectUrl, 302);
}
