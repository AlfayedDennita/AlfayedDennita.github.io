import { PUBLIC_MODE, PUBLIC_DEVIANTART_RSS_URL } from '$env/static/public';

export async function getArts(fetch, artsLimit = 6) {
  if (PUBLIC_MODE === 'dev') {
    return [];
  }

  const res = await fetch(PUBLIC_DEVIANTART_RSS_URL);
  const text = await res.text();
  const xml = await new DOMParser().parseFromString(text, 'text/xml');
  const items = xml.querySelectorAll('item');

  const arts = [];

  for (let [i, art] of items.entries()) {
    arts.push({
      title: art.querySelector('title').innerHTML,
      url: art.querySelector('link').innerHTML,
      thumbnailUrl: art
        .getElementsByTagNameNS('http://search.yahoo.com/mrss/', 'content')[0]
        .getAttribute('url'),
    });

    if (i === artsLimit - 2) {
      break;
    }
  }

  return arts;
}
