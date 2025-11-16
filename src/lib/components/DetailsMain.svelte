<script>
  const {
    class: className,
    headerOffsetHeight,
    footerOffsetHeight,
    children,
    ...props
  } = $props();
</script>

<main
  class={['main', className]}
  style:--header-offset-height={`${headerOffsetHeight}px`}
  style:--footer-offset-height={`${footerOffsetHeight}px`}
  id="main"
  {...props}
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
