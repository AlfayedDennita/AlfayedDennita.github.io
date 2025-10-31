<script>
  import { offsetTop } from '$lib/actions/offsetTop';
  import Button from '$lib/components/Button.svelte';
  import ErrorLoad from '$lib/components/ErrorLoad.svelte';

  const { arts } = $props();

  let elementOffsetTop = $state({
    value: undefined,
    update: () => undefined,
  });

  export function getOffsetTop() {
    return elementOffsetTop;
  }
</script>

<section
  use:offsetTop={{
    value: (newValue) => (elementOffsetTop.value = newValue),
    update: (newUpdate) => (elementOffsetTop.update = newUpdate),
  }}
  class="space"
  id="arts"
>
  <header class="space__header">
    <div class="space__title">
      <i class="space__title-icon hn hn-pencil-ruler-solid"></i>
      <h2 class="space__title-text">
        <span class="space__title-text-blue">fayden</span>.<span
          class="space__title-text-yellow">space</span
        >
      </h2>
    </div>
    <p class="space__subtitle">Fayden's Art Exhibition</p>
  </header>

  <div class="space__arts">
    {#if Error.isError(arts)}
      <ErrorLoad message="DeviantArt is currently not responding." />
    {:else}
      <div class="space__gallery">
        {#each { length: 6 }, i}
          <svelte:element
            this={arts[i] ? 'a' : 'div'}
            href={arts[i]?.url}
            target={arts[i] ? '_blank' : undefined}
            rel={arts[i] ? 'external' : undefined}
            title={arts[i]?.title}
            class={['space__art', arts[i] && 'space__art--is-link']}
          >
            {#if arts[i]}
              <img
                src={arts[i].thumbnailUrl}
                class="space__art-image"
                alt={arts[i].title}
              />
              <div class="space__art-message">
                <i class="space__art-message-icon hn hn-external-link-solid"
                ></i>
                <p class="space__art-message-text">See on DeviantArt</p>
              </div>
            {:else}
              <p class="space__art-soon">More soon...</p>
            {/if}
          </svelte:element>
        {/each}
      </div>
    {/if}

    <div class="space__arts-buttons">
      <Button
        tag="a"
        href="https://www.deviantart.com/alfayeddennita/"
        theme="primary"
        target="_blank"
        rel="external"
        title="Visit Fayden's DeviantArt"
      >
        <i class="hn hn-retro-camera-solid"></i>
        Fayden's DeviantArt
        <i class="hn hn-external-link-solid"></i>
      </Button>
      <Button
        tag="a"
        href="https://www.instagram.com/fayden.space/"
        theme="secondary"
        target="_blank"
        rel="external"
        title="Visit Fayden's Instagram"
      >
        <i class="hn hn-instagram"></i>
        Fayden's Instagram
        <i class="hn hn-external-link-solid"></i>
      </Button>
    </div>
  </div>
</section>

<style>
  .space {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 64px;
    padding: 112px 16px;
  }

  .space__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
  }

  .space__title {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .space__title-icon {
    font-size: var(--font-size-heading-3);
  }

  .space__title-text {
    font-family: var(--font-family-pixel);
    font-size: var(--font-size-heading-3);
  }

  .space__title-text-blue {
    color: var(--color-primary-main);
  }

  .space__title-text-yellow {
    color: var(--color-secondary-main);
  }

  .space__subtitle {
    color: var(--color-black-alt-1);
  }

  .space__arts {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 64px;
  }

  .space__gallery {
    overflow: hidden;
    display: grid;
    border-radius: 8px;
  }

  @media (min-width: 768px) {
    .space__gallery {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 992px) {
    .space__gallery {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .space__art {
    --inset-border-color: transparent;

    position: relative;
    overflow: hidden;
    height: 416px;
    aspect-ratio: 4 / 5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    background-color: rgba(var(--color-white-alt-1-rgb), 0.25);
    outline: none;
    text-align: center;
  }

  .space__art--is-link {
    cursor: pointer;
  }

  @media (min-width: 576px) {
    .space__art {
      height: 448px;
    }
  }

  @media (min-width: 768px) {
    .space__art {
      height: 384px;
    }
  }

  .space__art:nth-child(even) {
    background-color: rgba(var(--color-white-alt-1-rgb), 0.5);
  }

  .space__art-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.25s;
  }

  .space__art:is(:hover, :focus-visible) .space__art-image {
    transform: scale(1.25);
  }

  .space__art-message {
    opacity: 0;
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    background-color: rgba(var(--color-black-pure-rgb), 0.75);
    font-family: var(--font-family-pixel);
    color: var(--color-white-pure);
    text-decoration: 2px underline dotted transparent;
    text-underline-offset: 8px;
    user-select: none;
    transition:
      opacity 0.25s,
      text-decoration 0.25s;
  }

  .space__art:is(:hover, :focus-visible) .space__art-message {
    opacity: 1;
    text-decoration-color: var(--color-white-alt-2);
  }

  .space__art-soon {
    font-family: var(--font-family-pixel);
    color: rgba(var(--color-black-alt-2-rgb), 0.5);
    text-transform: lowercase;
    user-select: none;
  }

  .space__arts-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    padding-inline: 32px;
  }
</style>
