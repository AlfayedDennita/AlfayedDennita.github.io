export async function getArts(fetch, devMode = false) {
  if (devMode) {
    return [];
  }

  try {
    const res = await fetch(
      'https://backend.deviantart.com/rss.xml?type=deviation&q=by%3Aalfayeddennita+sort%3Atime+meta%3Aall'
    );
    const text = await res.text();
    const xml = await new DOMParser().parseFromString(text, 'text/xml');
    const items = xml.querySelectorAll('item');

    const arts = [];

    items.forEach((art) => {
      arts.push({
        title: art.querySelector('title').innerHTML,
        url: art.querySelector('link').innerHTML,
        thumbnailUrl: art
          .getElementsByTagNameNS('http://search.yahoo.com/mrss/', 'content')[0]
          .getAttribute('url'),
      });
    });

    return arts;
  } catch (error) {
    return error;
  }
}
