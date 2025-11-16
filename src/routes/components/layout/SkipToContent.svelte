<script>
  const { contentId = 'main' } = $props();
</script>

<a class="skip-to-content" href={`#${contentId}`} title="Skip to Content">
  Skip to Content
</a>

<style>
  .skip-to-content {
    z-index: var(--z-index-bottommost);
    opacity: 0;
    position: absolute;
    top: -9999px;
    left: -9999px;
    overflow: hidden;
    width: 0;
    height: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-primary-main);
    border: 2px solid var(--color-primary-shadow);
    border-radius: 4px;
    outline: 2px solid var(--color-secondary-main);
    outline-offset: 2px;
    font-family: var(--font-family-pixel);
    text-align: center;
    text-transform: uppercase;
    text-decoration-skip-ink: none;
    color: var(--color-white-pure);
  }

  .skip-to-content:focus {
    z-index: calc(var(--z-index-topmost) + 1);
    opacity: 1;
    top: 6px;
    left: 6px;
    width: auto;
    height: auto;
    padding: 16px 32px;
  }
</style>
