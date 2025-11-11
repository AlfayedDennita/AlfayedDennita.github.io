<script>
  let windowScrollY = $state();
  let isShown = $derived(windowScrollY > 1080);
</script>

<svelte:window bind:scrollY={windowScrollY} />

<button
  class="back-to-top"
  class:back-to-top--shown={isShown}
  type="button"
  tabindex={isShown ? 0 : -1}
  aria-label="Back to Top"
  title="Back to Top"
  onclick={() => (windowScrollY = 0)}
>
  <i class="hn hn-arrow-up-solid"></i>
</button>

<style>
  .back-to-top {
    z-index: var(--z-index-topmost);
    visibility: hidden;
    opacity: 0;
    position: fixed;
    right: var(--screen-margin-dynamic);
    bottom: var(--screen-margin-dynamic);
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-primary-main);
    border: 4px solid rgba(var(--color-primary-shadow-rgb), 0.25);
    border-radius: 8px;
    outline: 2px solid transparent;
    outline-offset: 2px;
    font-size: var(--font-size-heading-6);
    color: var(--color-white-pure);
    cursor: pointer;
    transition:
      visibility 0.25s,
      opacity 0.25s,
      border-color 0.25s,
      outline-color 0.25s;
  }

  .back-to-top:focus-visible {
    outline-color: var(--color-secondary-main);
  }

  .back-to-top:is(:hover, :focus-visible) {
    border-color: rgba(var(--color-primary-shadow-rgb), 0.75);
  }

  .back-to-top--shown {
    visibility: visible;
    opacity: 1;
  }
</style>
