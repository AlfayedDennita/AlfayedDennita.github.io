<script>
  import { trackOffsetTop } from '$lib/attachments/trackOffsetTop';
  import Button from '$lib/components/ui/Button.svelte';
  import SectionHeader from '$lib/components/SectionHeader.svelte';
  import ErrorLoad from '$lib/components/ErrorLoad.svelte';

  const { class: className, arts, navbarOffsetHeight = 0, ...props } = $props();

  let offsetTop = $state({
    value: undefined,
    update: () => undefined,
  });

  export function getOffsetTop() {
    return offsetTop.value;
  }

  export function getUpdateOffsetTop() {
    return offsetTop.update;
  }
</script>

<section
  class={['space', className]}
  style:--navbar-offset-height={`${navbarOffsetHeight}px`}
  id="arts"
  aria-labelledby="arts-title"
  {@attach trackOffsetTop(
    (newOffsetTop) => (offsetTop.value = newOffsetTop),
    (update) => (offsetTop.update = update)
  )}
  {...props}
>
  <div class="space__inner">
    <SectionHeader
      sectionId="arts"
      icon="pencil-ruler-solid"
      subtitle="Fayden's Art Exhibition"
    >
      {#snippet titleLeft()}
        fayden
      {/snippet}
      .
      {#snippet titleRight()}
        space
      {/snippet}
    </SectionHeader>

    {#await arts}
      <ul class="arts space__arts">
        {#each { length: 6 }, i}
          <li class="arts__art">
            <div class="arts__art-object"></div>
          </li>
        {/each}
      </ul>
    {:then arts}
      <ul class="arts space__arts">
        {#each { length: 6 }, i}
          <li class="arts__art">
            <svelte:element
              this={arts[i] ? 'a' : 'div'}
              class="arts__art-object"
              class:arts__art-object--link={arts[i]}
              href={arts[i]?.url}
              target={arts[i] ? '_blank' : undefined}
              rel={arts[i] ? 'external' : undefined}
              title={arts[i]?.title}
            >
              {#if arts[i]}
                <img
                  class="arts__art-image"
                  src={arts[i].thumbnailUrl}
                  alt={arts[i].title}
                />
                <div class="arts__art-message">
                  <i class="hn hn-external-link-solid arts__art-message-icon"
                  ></i>
                  <p class="arts__art-message-text">See on DeviantArt</p>
                </div>
              {:else}
                <p class="arts__art-soon">More soon...</p>
              {/if}
            </svelte:element>
          </li>
        {/each}
      </ul>
    {:catch}
      <ErrorLoad message="DeviantArt is currently not responding." />
    {/await}

    <div class="space__ctas">
      <Button
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
    scroll-margin-top: calc(var(--navbar-offset-height) - 1px);
    padding-inline: var(--screen-margin-dynamic);
  }

  .space__inner {
    margin: 0 auto;
    max-width: var(--breakpoint-xl);
    display: flex;
    flex-direction: column;
    gap: 64px;
    padding-block: 96px;
  }

  .space__arts {
    align-self: center;
  }

  .arts {
    overflow: hidden;
    display: grid;
    border-radius: 8px;
    list-style: none;
  }

  @media (min-width: 768px) {
    .arts {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 992px) {
    .arts {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .arts__art {
    display: contents;
  }

  .arts__art-object {
    position: relative;
    overflow: hidden;
    height: 384px;
    max-width: 100%;
    aspect-ratio: 4 / 5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    background-color: rgba(var(--color-white-alt-1-rgb), 0.5);
    outline: none;
    text-align: center;
  }

  .arts__art-object--link {
    cursor: pointer;
  }

  .arts__art:nth-child(even) .arts__art-object {
    background-color: rgba(var(--color-white-alt-2-rgb), 0.5);
  }

  .arts__art-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.25s;
  }

  .arts__art-object--link:is(:hover, :focus-visible) .arts__art-image {
    transform: scale(1.25);
  }

  .arts__art-message {
    position: absolute;
    inset: 0;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    background-color: rgba(var(--color-black-pure-rgb), 0.75);
    font-family: var(--font-family-pixel);
    text-decoration: 2px underline dotted transparent;
    text-underline-offset: 8px;
    color: var(--color-white-pure);
    user-select: none;
    transition:
      opacity 0.25s,
      text-decoration-color 0.25s;
  }

  .arts__art-object--link:is(:hover, :focus-visible) .arts__art-message {
    opacity: 1;
    text-decoration-color: var(--color-white-alt-2);
  }

  .arts__art-soon {
    font-family: var(--font-family-pixel);
    text-transform: lowercase;
    color: rgba(var(--color-black-alt-2-rgb), 0.5);
    user-select: none;
  }

  .space__ctas {
    align-self: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }
</style>
