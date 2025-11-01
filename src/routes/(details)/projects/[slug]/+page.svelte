<script>
  import { onMount, onDestroy } from 'svelte';

  import { watch } from 'runed';
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  import PhotoSwipe from 'photoswipe';
  import PhotoSwipeLightbox from 'photoswipe/lightbox';
  import '@splidejs/svelte-splide/css/default';
  import 'photoswipe/style.css';

  import Button from '$lib/components/Button.svelte';

  const { data } = $props();

  let lightbox = $state();

  function initLightbox() {
    if (data.project.images.length > 0) {
      lightbox = new PhotoSwipeLightbox({
        gallery: '#slides',
        children: '.project__image-anchor',
        pswpModule: PhotoSwipe,
      });

      lightbox.init();
    }
  }

  watch(
    () => data.project.id,
    () => {
      lightbox?.destroy();
      initLightbox();
    }
  );

  onMount(() => {
    initLightbox();
  });

  onDestroy(() => {
    lightbox?.destroy();
  });
</script>

<section class="project">
  <div class="project__container">
    <div class="project__images">
      {#if data.project.images.length > 0}
        {#key data.project.id}
          <Splide
            class="project__slides"
            id="slides"
            aria-labelledby="project-title"
            options={{
              arrows: false,
            }}
          >
            {#each data.project.images as image (image.name)}
              <SplideSlide>
                <a
                  class="project__image-anchor"
                  href={`/images/projects/${image.name}`}
                  data-pswp-width={image.width}
                  data-pswp-height={image.height}
                  title={image.alt}
                >
                  <img
                    class="project__image"
                    src={`/images/projects/${image.name}`}
                    alt={data.project.alt}
                  />
                </a>
              </SplideSlide>
            {/each}
          </Splide>
        {/key}
      {:else}
        <p class="project__no-image">No Image</p>
      {/if}
    </div>
    <div class="project__info">
      <header class="project__header">
        <h1 class="project__title" id="project-title">{data.project.title}</h1>
        <p class="project__type">
          <i class={['hn', `hn-${data.project.type.icon}`]}></i>
          {data.project.type.name}
        </p>
      </header>
      <p class="project__description">{data.project.description}</p>
      {#if data.project.externalLinks.length > 0}
        <ul class="project__links">
          <li>
            <h3 class="project__links-title">
              {`External Link${data.project.externalLinks.length > 1 ? 's' : ''}`}
              <i class="project__links-title-icon hn hn-external-link-solid"
              ></i>
              :
            </h3>
          </li>
          {#each data.project.externalLinks as link (link.name)}
            <li>
              <a
                class="project__link"
                href={link.url}
                target="_blank"
                rel="external"
                title={link.name}
              >
                <i class={['hn', `hn-${link.icon}`]}></i>
                {link.name}
              </a>
            </li>
          {/each}
        </ul>
      {/if}
      {#if data.project.badges.length > 0}
        <ul class="project__badges">
          <li>
            <h3 class="project__badges-title">Tech Stacks:</h3>
          </li>
          {#each data.project.badges as badge (badge.name)}
            <li>
              <img
                class="project__badge"
                src={`https://img.shields.io/badge/${badge.content}`}
                alt={badge.name}
              />
            </li>
          {/each}
        </ul>
      {/if}
    </div>
    <div class="project__nav">
      {#if data.project.prevProject}
        <Button
          tag="a"
          href={`/projects/${data.project.prevProject.slug}`}
          style="flex: 1 0 auto"
          title={data.project.prevProject.title}
        >
          <i class="hn hn-arrow-left-solid"></i>
          Prev:
          {data.project.prevProject.title}
        </Button>
      {/if}
      {#if data.project.nextProject}
        <Button
          tag="a"
          href={`/projects/${data.project.nextProject.slug}`}
          theme="secondary"
          style="flex: 1 0 auto"
          title={data.project.nextProject.title}
        >
          Next:
          {data.project.nextProject.title}
          <i class="hn hn-arrow-right-solid"></i>
        </Button>
      {/if}
    </div>
  </div>
</section>

<style>
  .project__container {
    max-width: 1200px;
    margin-inline: auto;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .project__images {
    width: 100%;
    aspect-ratio: 16 / 9;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-white-alt-1);
    font-family: var(--font-family-pixel);
    color: rgba(var(--color-black-alt-2-rgb), 0.5);
    text-align: center;
    user-select: none;
  }

  .project__image {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: center;
  }

  .project__info {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding-inline: 16px;
  }

  .project__header {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .project__title {
    font-family: var(--font-family-pixel);
    font-size: var(--font-size-heading-3);
    line-height: 1;
  }

  .project__type {
    align-self: flex-start;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    background-color: var(--color-primary-highlight);
    border-radius: 2px;
    font-size: var(--font-size-small);
    font-weight: bold;
    color: var(--color-primary-shadow);
    text-align: center;
  }

  .project__links {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    list-style: none;
  }

  .project__links-title {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: var(--font-size-paragraph);
  }

  .project__links-title-icon {
    font-size: var(--font-size-semi-small);
  }

  .project__link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    border: none;
    outline: none;
    font-size: var(--font-size-semi-small);
    color: var(--color-black-pure);
    text-decoration: 2px underline dotted transparent;
    text-decoration-skip-ink: none;
    text-underline-offset: 4px;
    transition:
      font-weight 0.25s,
      color 0.25s,
      text-decoration 0.25s;
  }

  .project__link:is(:hover, :focus-visible) {
    font-weight: bold;
    color: var(--color-primary-main);
    text-decoration-color: var(--color-primary-main);
  }

  .project__badges {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    list-style: none;
  }

  .project__badges-title {
    font-size: var(--font-size-paragraph);
  }

  .project__badge {
    border-radius: 2px;
  }

  .project__nav {
    margin-top: 16px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    padding-inline: 16px;
  }
</style>
