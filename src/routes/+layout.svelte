<script>
  import { setContext } from 'svelte';
  import { pageData } from '$lib/states/pageData.svelte';
  import Header from './components/layout/Header.svelte';
  import Footer from './components/layout/Footer.svelte';
  import BackToTop from './components/layout/BackToTop.svelte';
  import '@hackernoon/pixel-icon-library/fonts/iconfont.css';
  import '$lib/styles/base.css';

  const { children } = $props();

  let header = $state();
  let footer = $state();
  setContext('header-offset-height', () => header?.getOffsetHeight());
  setContext('footer-offset-height', () => footer?.getOffsetHeight());
</script>

<svelte:head>
  <meta name="description" content={pageData.description} />
  <meta name="keywords" content={pageData.keywords} />
  <title>{pageData.title}</title>
</svelte:head>

<Header bind:this={header} />
{@render children?.()}
<Footer bind:this={footer} />
<BackToTop />
