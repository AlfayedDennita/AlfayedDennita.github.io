<script>
  import { getContext } from 'svelte';

  const headerHeight = getContext('header-height');
  const footerHeight = getContext('footer-height');

  const { children } = $props();
</script>

<main
  class="main"
  style:--header-offset-height={`${headerHeight.offset}px`}
  style:--footer-offset-height={`${footerHeight.offset}px`}
>
  {@render children?.()}
</main>

<style>
  .main {
    min-height: calc(100dvh - var(--footer-offset-height));
    padding-top: var(--header-offset-height);
  }
</style>
