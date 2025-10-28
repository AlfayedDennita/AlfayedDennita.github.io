export async function load({ fetch }) {
  const projectsRes = await fetch('/data/projects.json');
  const projects = await projectsRes.json();

  const artsRes = await fetch(
    'https://backend.deviantart.com/rss.xml?type=deviation&q=by%3Aalfayeddennita+sort%3Atime+meta%3Aall'
  );
  const artsText = await artsRes.text();
  const artsXml = await new DOMParser().parseFromString(artsText, 'text/xml');
  const artItems = artsXml.querySelectorAll('item');
  const arts = [];

  artItems.forEach((art) => {
    arts.push({
      title: art.querySelector('title').innerHTML,
      url: art.querySelector('link').innerHTML,
      thumbnailUrl: art
        .getElementsByTagNameNS('http://search.yahoo.com/mrss/', 'content')[0]
        .getAttribute('url'),
    });
  });

  return { projects, arts };
}
