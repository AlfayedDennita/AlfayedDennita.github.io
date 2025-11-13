import { SvelteSet } from 'svelte/reactivity';

const defaultKeywords = [
  'Alfayed Dennita',
  'Muhammad Alfayed Dennita',
  'Fayden',
  'Fayden World',
  'personal',
];

const defaultPageData = {
  title: 'Fayden World by Alfayed Dennita',
  description:
    "Fayden World is Alfayed Dennita's main personal website that contains public personal information, such as personal description, software development portfolio, art gallery, and contact details.",
  keywords: defaultKeywords.join(', '),
};

export let pageData = $state({
  title: defaultPageData.title,
  description: defaultPageData.description,
  keywords: defaultPageData.keywords,
});

export function setPageData({ title, description, additionalKeywords = [] }) {
  pageData.title = title ? `${title} - Fayden World` : defaultPageData.title;
  pageData.description = description || defaultPageData.description;

  if (additionalKeywords) {
    const keywords = [
      ...new SvelteSet([...defaultKeywords, ...additionalKeywords]),
    ].join(', ');
    pageData.keywords = keywords;
  }
}
