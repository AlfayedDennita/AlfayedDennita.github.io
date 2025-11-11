<script>
  import { getContext } from 'svelte';

  const { children } = $props();

  const getHeaderOffsetHeight = getContext('header-offset-height');
  const getFooterOffsetHeight = getContext('footer-offset-height');
</script>

<main
  class="main"
  style:--header-offset-height={`${getHeaderOffsetHeight()}px`}
  style:--footer-offset-height={`${getFooterOffsetHeight()}px`}
  id="main"
>
  {@render children?.()}
</main>

<style>
  .main {
    scroll-margin-top: calc(var(--header-offset-height) * -1);
    min-height: calc(100dvh - var(--footer-offset-height));
    padding-top: var(--header-offset-height);
  }
</style>
