<script>
  import { onMount, onDestroy } from 'svelte';
  import { watch } from 'runed';

  import { register as registerSwiperElements } from 'swiper/element';
  import { Navigation, Pagination } from 'swiper/modules';
  import PhotoSwipe from 'photoswipe';
  import PhotoSwipeLightbox from 'photoswipe/lightbox';

  import swiperNavigationStyles from 'swiper/element/css/navigation?url';
  import 'swiper/element/css/pagination';
  import 'photoswipe/style.css';

  import Button from '$lib/components/Button.svelte';

  registerSwiperElements();

  const { data } = $props();

  let swiper = $state();
  let lightbox = $state();
  let activeSlideIdx = $state(0);

  function handleChangeSwiperActiveIndex(event) {
    activeSlideIdx = event.detail[0].activeIndex;
  }

  function initSwiper() {
    if (swiper) {
      const swiperParams = {
        modules: [Navigation, Pagination],
        injectStylesUrls: [swiperNavigationStyles],
        pagination: {
          el: '.project__swiper-pagination',
          bulletElement: 'button',
          clickable: true,
        },
      };

      Object.assign(swiper, swiperParams);

      swiper.addEventListener(
        'swiperactiveindexchange',
        handleChangeSwiperActiveIndex
      );

      swiper.initialize();
    }
  }

  function destroySwiper() {
    swiper.removeEventListener(
      'swiperactiveindexchange',
      handleChangeSwiperActiveIndex
    );

    swiper?.swiper?.destroy();
  }

  function initLightbox() {
    if (data.project.images.length > 0) {
      lightbox = new PhotoSwipeLightbox({
        pswpModule: PhotoSwipe,
        gallery: '.project__swiper',
        children: '.project__image-anchor',
        loop: false,
        mainClass: 'project__pswp',
        arrowPrevSVG:
          '<svg xmlns="http://www.w3.org/2000/svg" class="pswp__icn" id="arrow-left-solid" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><polygon points="1 13 1 11 2 11 2 10 3 10 3 9 4 9 4 8 5 8 5 7 6 7 6 6 7 6 7 5 8 5 8 4 9 4 9 3 10 3 10 2 11 2 11 1 12 1 12 2 13 2 13 3 14 3 14 4 13 4 13 5 12 5 12 6 11 6 11 7 10 7 10 8 9 8 9 9 8 9 8 10 23 10 23 14 8 14 8 15 9 15 9 16 10 16 10 17 11 17 11 18 12 18 12 19 13 19 13 20 14 20 14 21 13 21 13 22 12 22 12 23 11 23 11 22 10 22 10 21 9 21 9 20 8 20 8 19 7 19 7 18 6 18 6 17 5 17 5 16 4 16 4 15 3 15 3 14 2 14 2 13 1 13"/></svg>',
        arrowNextSVG:
          '<svg xmlns="http://www.w3.org/2000/svg" class="pswp__icn" id="arrow-left-solid" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><polygon points="1 13 1 11 2 11 2 10 3 10 3 9 4 9 4 8 5 8 5 7 6 7 6 6 7 6 7 5 8 5 8 4 9 4 9 3 10 3 10 2 11 2 11 1 12 1 12 2 13 2 13 3 14 3 14 4 13 4 13 5 12 5 12 6 11 6 11 7 10 7 10 8 9 8 9 9 8 9 8 10 23 10 23 14 8 14 8 15 9 15 9 16 10 16 10 17 11 17 11 18 12 18 12 19 13 19 13 20 14 20 14 21 13 21 13 22 12 22 12 23 11 23 11 22 10 22 10 21 9 21 9 20 8 20 8 19 7 19 7 18 6 18 6 17 5 17 5 16 4 16 4 15 3 15 3 14 2 14 2 13 1 13"/></svg>',
        closeSVG:
          '<svg xmlns="http://www.w3.org/2000/svg" class="pswp__icn" id="times-solid" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><polygon points="15 13 16 13 16 14 17 14 17 15 18 15 18 16 19 16 19 17 20 17 20 18 21 18 21 19 22 19 22 20 21 20 21 21 20 21 20 22 19 22 19 21 18 21 18 20 17 20 17 19 16 19 16 18 15 18 15 17 14 17 14 16 13 16 13 15 11 15 11 16 10 16 10 17 9 17 9 18 8 18 8 19 7 19 7 20 6 20 6 21 5 21 5 22 4 22 4 21 3 21 3 20 2 20 2 19 3 19 3 18 4 18 4 17 5 17 5 16 6 16 6 15 7 15 7 14 8 14 8 13 9 13 9 11 8 11 8 10 7 10 7 9 6 9 6 8 5 8 5 7 4 7 4 6 3 6 3 5 2 5 2 4 3 4 3 3 4 3 4 2 5 2 5 3 6 3 6 4 7 4 7 5 8 5 8 6 9 6 9 7 10 7 10 8 11 8 11 9 13 9 13 8 14 8 14 7 15 7 15 6 16 6 16 5 17 5 17 4 18 4 18 3 19 3 19 2 20 2 20 3 21 3 21 4 22 4 22 5 21 5 21 6 20 6 20 7 19 7 19 8 18 8 18 9 17 9 17 10 16 10 16 11 15 11 15 13"/></svg>',
        zoomSVG:
          '<svg xmlns="http://www.w3.org/2000/svg" class="pswp__icn" id="search-solid" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><polygon points="16 17 15 17 15 18 13 18 13 19 7 19 7 18 5 18 5 17 4 17 4 16 3 16 3 15 2 15 2 13 1 13 1 7 2 7 2 5 3 5 3 4 4 4 4 3 5 3 5 2 7 2 7 1 13 1 13 2 15 2 15 3 16 3 16 4 17 4 17 5 18 5 18 7 19 7 19 13 18 13 18 15 17 15 17 16 16 16 16 17"/><polygon points="23 20 23 22 22 22 22 23 20 23 20 22 19 22 19 21 18 21 18 20 17 20 17 19 16 19 16 18 17 18 17 17 18 17 18 16 19 16 19 17 20 17 20 18 21 18 21 19 22 19 22 20 23 20"/></svg>',
      });

      lightbox.on('change', () => {
        activeSlideIdx = window.pswp.currIndex;
        swiper.swiper.slideTo(activeSlideIdx);
      });

      lightbox.init();
    }
  }

  watch(
    () => swiper,
    () => {
      initSwiper();
    }
  );

  watch(
    () => data.project.id,
    () => {
      lightbox?.destroy();
      initLightbox();
    }
  );

  onMount(() => {
    initSwiper();
    initLightbox();
  });

  onDestroy(() => {
    destroySwiper();
    lightbox?.destroy();
  });
</script>

<section class="project" aria-labelledby="project-title">
  <div class="project__container">
    <div class="project__images">
      {#if data.project.images.length > 0}
        {#key data.project.id}
          <swiper-container
            bind:this={swiper}
            class="project__swiper"
            init="false"
          >
            {#each data.project.images as image, i (image.name)}
              <swiper-slide lazy="true">
                <a
                  class="project__image-anchor"
                  href={`/images/projects/${image.name}`}
                  data-pswp-width={image.width}
                  data-pswp-height={image.height}
                  data-cropped="true"
                  title={image.alt}
                  tabindex={i === activeSlideIdx ? 0 : -1}
                >
                  <img
                    class="project__image"
                    src={`/images/projects/${image.name}`}
                    alt={data.project.alt}
                    loading="lazy"
                  />
                </a>
              </swiper-slide>
            {/each}
            <div
              slot="container-end"
              class="project__swiper-pagination swiper-pagination"
            ></div>
          </swiper-container>
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

  .project__swiper {
    --swiper-pagination-bottom: 16px;
    --swiper-pagination-bullet-width: 12px;
    --swiper-pagination-bullet-height: 12px;
    --swiper-pagination-color: var(--color-primary-main);
    --swiper-pagination-bullet-inactive-color: rgba(
      var(--color-white-alt-2-rgb),
      0.4
    );
    --swiper-pagination-bullet-inactive-opacity: 1;

    width: 100%;
  }

  .project__swiper-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .project__swiper-pagination :global(.swiper-pagination-bullet) {
    border: 2px solid transparent;
    outline: 2px solid transparent;
    outline-offset: 2px;
    transition:
      background 0.25s,
      border 0.25s,
      outline 0.25s;
  }

  .project__swiper-pagination :global(.swiper-pagination-bullet:focus-visible) {
    --swiper-pagination-bullet-inactive-color: var(--color-white-alt-2);

    outline-color: var(--color-white-pure);
  }

  .project__swiper-pagination :global(.swiper-pagination-bullet-active) {
    border-color: var(--color-secondary-main);
  }

  :global(.project__pswp .pswp__button) {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid transparent;
    border-radius: 4px;
    outline: none;
    transition: border 0.25s;
  }

  :global(.project__pswp .pswp__button:focus-visible) {
    border-color: var(--color-secondary-main);
  }

  :global(.project__pswp .pswp__icn) {
    position: static;
    margin: 0;
    width: 20px;
    height: 20px;
  }

  :global(.project__pswp .pswp__button--arrow .pswp__icn) {
    width: 32px;
    height: 32px;
  }

  .project__image-anchor {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
  }

  .project__image-anchor::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: transparent;
    user-select: none;
    transition: background 0.25s;
  }

  .project__image-anchor:focus-visible:after {
    background-color: rgba(var(--color-primary-main-rgb), 0.6);
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
