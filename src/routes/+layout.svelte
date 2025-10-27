<script>
  import '@hackernoon/pixel-icon-library/fonts/iconfont.css';
  import '$lib/styles/global.css';
  import Header from './components/Header.svelte';

  let { children } = $props();

  const staticKeywords = new Set([
    'Alfayed Dennita',
    'Muhammad Alfayed Dennita',
    'Fayden',
    'Fayden World',
    'personal',
  ]);

  let pageData = $state({
    title: 'Fayden World by Alfayed Dennita',
    description:
      "Fayden World is Alfayed Dennita's main personal website that contains public personal information, such as personal description, software development portfolio, art gallery, and contact details.",
    additionalKeywords: new Set(['portfolio', 'projects', 'contacts']),
  });

  const keywords = $derived(
    [...staticKeywords.union(pageData.additionalKeywords)].join(', ')
  );
</script>

<svelte:head>
  <meta name="description" content={pageData.description} />
  <meta name="keywords" content={keywords} />
  <title>{pageData.title}</title>
</svelte:head>

<Header />

{@render children?.()}
