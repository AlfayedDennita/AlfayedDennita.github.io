<script>
  const {
    class: className,
    contactOffsetHeight,
    footerOffsetHeight,
    ...props
  } = $props();

  const footerObjectsHeight = $derived(
    `${contactOffsetHeight + footerOffsetHeight}px` || undefined
  );
</script>

<div
  class={['footer-objects', className]}
  style:height={footerObjectsHeight}
  aria-hidden="true"
  {...props}
></div>

<style>
  :global(body):has(.footer-objects) {
    position: relative;
  }

  .footer-objects {
    --position-leaning-tree: -84px calc(100% + 8px);
    --position-tree: calc(100% - 4px) calc(100% - 60px);
    --position-old-man: calc(100% - 32px) calc(100% - 60px);

    position: absolute;
    inset-inline: 0;
    bottom: 0;
    background:
      url('$lib/assets/footer/backgrounds/leaning-tree.webp') no-repeat,
      url('$lib/assets/footer/backgrounds/tree.webp') no-repeat,
      url('$lib/assets/footer/objects/old-man.gif') no-repeat;
    background-size: 256px, 128px, 32px;
    background-position:
      var(--position-leaning-tree), var(--position-tree),
      var(--position-old-man);
    pointer-events: none;
  }

  @media (min-width: 768px) {
    .footer-objects {
      --position-tree: calc(100% - 8%) calc(100% - 60px);
      --position-old-man: calc(100% - 8% - 20px) calc(100% - 60px);
    }
  }

  @media (min-width: 992px) {
    .footer-objects {
      --position-leaning-tree: -128px calc(100% + 8px);
      --position-tree: calc(100% - 15%) calc(100% - 60px);
      --position-old-man: calc(100% - 15% - 20px) calc(100% - 60px);

      background-size: 384px, 128px, 32px;
    }
  }
</style>
