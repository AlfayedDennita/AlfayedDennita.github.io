<script>
  import { getContext } from 'svelte';
  import { page } from '$app/state';
  import Button from '$lib/components/ui/Button.svelte';
  import DetailsMain from '$lib/components/DetailsMain.svelte';

  const getHeaderOffsetHeight = getContext('header-offset-height');
  const getFooterOffsetHeight = getContext('footer-offset-height');
</script>

<DetailsMain
  class="details-main"
  headerOffsetHeight={getHeaderOffsetHeight()}
  footerOffsetHeight={getFooterOffsetHeight()}
>
  <section class="error details-main__error" aria-labelledby="error-title">
    <div class="error__inner">
      <h1 class="error__title" id="error-title">Error: {page.status}</h1>
      <p class="error__message">{page.error.message}</p>
      <div class="error__cta">
        <Button
          class="error__cta-button"
          href="/"
          theme="secondary"
          title="Back to Home"
        >
          <i class="hn hn-home-solid"></i>
          Back to Home
        </Button>
      </div>
    </div>
  </section>
</DetailsMain>

<style>
  :global(.details-main):has(.error) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .details-main__error {
    flex-grow: 1;
  }

  .error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-inline: var(--screen-margin-dynamic);
  }

  .error__inner {
    margin-inline: auto;
    max-width: var(--breakpoint-xl);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding-block: 32px;
    text-align: center;
  }

  .error__title {
    max-width: var(--breakpoint-md);
    font-family: var(--font-family-pixel);
    font-size: var(--font-size-heading-1);
    text-transform: uppercase;
    color: var(--color-primary-main);
    line-height: 1;
  }

  .error__message {
    max-width: var(--breakpoint-md);
  }

  .error__cta {
    margin-top: 16px;
    transition: padding-top 0.25s;
  }

  .error__cta:has(:global(.error__cta-button:active)) {
    padding-top: 4px;
  }
</style>
