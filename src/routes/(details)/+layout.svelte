<script>
  import { getContext } from 'svelte';

  const getHeaderOffsetHeight = getContext('header-offset-height');
  const getFooterOffsetHeight = getContext('footer-offset-height');

  const { children } = $props();
</script>

<main
  class="main"
  style:--header-offset-height={`${getHeaderOffsetHeight()}px`}
  style:--footer-offset-height={`${getFooterOffsetHeight()}px`}
>
  {@render children?.()}
</main>

<style>
  .main {
    min-height: calc(100dvh - var(--footer-offset-height));
    padding-top: var(--header-offset-height);
  }
</style>
