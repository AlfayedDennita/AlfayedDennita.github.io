<script>
  import '@hackernoon/pixel-icon-library/fonts/iconfont.css';
  import '$lib/styles/global.css';
  import { setContext } from 'svelte';

  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';

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

  let footerOffsetHeight = $state({ height: undefined });
  setContext('footer-offset-height', footerOffsetHeight);
</script>

<svelte:head>
  <meta name="description" content={pageData.description} />
  <meta name="keywords" content={keywords} />
  <title>{pageData.title}</title>
</svelte:head>

<Header />
{@render children?.()}
<Footer bind:footerOffsetHeight={footerOffsetHeight.height} />
