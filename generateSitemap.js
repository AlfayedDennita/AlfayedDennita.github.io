import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import projects from './static/data/projects.json' with { type: 'json' };

const xmlPath = './static/sitemap.xml';

const links = [
  {
    url: '/',
    changeFreq: 'monthly',
    priority: 1.0,
  },
];

const projectsPerPage = 6;
const projectsTotalPages = Math.ceil(projects.length / projectsPerPage);

for (let i = 1; i <= projectsTotalPages; i++) {
  links.push({
    url: `/projects/?page=${i}`,
    changeFreq: 'monthly',
    priority: 0.9,
  });
}

for (const project of projects) {
  const link = {
    url: `/projects/${project.slug}/`,
    changeFreq: 'monthly',
    priority: 0.8,
  };

  const images = [];

  if (project.images) {
    for (const image of project.images) {
      images.push({
        url: `/images/projects/${image.name}`,
        title: image.alt,
        caption: image.alt,
      });
    }

    link.img = images;
  }

  links.push(link);
}

(async () => {
  try {
    const stream = new SitemapStream({ hostname: process.env.PROD_HOSTNAME });
    const sitemapXml = await streamToPromise(Readable.from(links).pipe(stream));

    fs.writeFileSync(path.resolve(xmlPath), sitemapXml.toString());

    console.log(`Sitemap generated successfully! Path: ${xmlPath}`);
  } catch (error) {
    console.log('Failed to generate sitemap!');
    console.error(error);
  }
})();
