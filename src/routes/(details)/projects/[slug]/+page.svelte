<script>
  import { onMount, onDestroy } from 'svelte';
  import { watch } from 'runed';

  import { register as registerSwiperElements } from 'swiper/element';
  import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules';
  import PhotoSwipe from 'photoswipe';
  import PhotoSwipeLightbox from 'photoswipe/lightbox';

  import swiperFreeModeStyles from 'swiper/element/css/free-mode?url';
  import 'swiper/element/css/navigation';
  import 'swiper/element/css/pagination';
  import 'swiper/element/css/thumbs';
  import 'photoswipe/style.css';

  import Button from '$lib/components/ui/Button.svelte';

  registerSwiperElements();

  const { data } = $props();

  let swiper = $state();
  let swiperThumbs = $state();
  let lightbox = $state();
  let activeSlideIdx = $state(0);
  let windowInnerWidth = $state();

  function handleChangeSwiperActiveIndex(event) {
    activeSlideIdx = event.detail[0].activeIndex;
  }

  function initSwiper() {
    if (swiper) {
      const swiperParams = {
        modules: [Navigation, Pagination, Thumbs, FreeMode],
        navigation: {
          prevEl: '.project__swiper-nav-button--is-prev',
          nextEl: '.project__swiper-nav-button--is-next',
        },
        pagination: {
          el: '.project__swiper-pagination',
          clickable: true,
        },
        thumbs: {
          swiper: '.project__thumbs',
        },
      };

      Object.assign(swiper, swiperParams);

      swiper.addEventListener(
        'swiperactiveindexchange',
        handleChangeSwiperActiveIndex
      );

      swiper.initialize();

      const swiperThumbsParams = {
        modules: [FreeMode],
        injectStylesUrls: [swiperFreeModeStyles],
        freeMode: {
          enabled: true,
        },
        slidesPerView: 4,
        spaceBetween: 8,
      };

      Object.assign(swiperThumbs, swiperThumbsParams);

      swiperThumbs.initialize();
    }
  }

  function destroySwiper() {
    if (swiper) {
      swiper.removeEventListener(
        'swiperactiveindexchange',
        handleChangeSwiperActiveIndex
      );

      swiper.swiper?.destroy();
    }
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

<svelte:window bind:innerWidth={windowInnerWidth} />

<section class="project" aria-labelledby="project-title">
  <div class="project__container">
    <nav class="project__breadcrumbs">
      <ul class="project__breadcrumbs-list">
        <li
          class="project__breadcrumbs-list-item project__breadcrumbs-list-item--is-link"
        >
          <a
            class="project__breadcrumbs-item project__breadcrumbs-item--is-link"
            href="/"
            title="Home"
          >
            <i class="hn hn-home-solid"></i>
            Home
          </a>
        </li>
        <li
          class="project__breadcrumbs-list-item project__breadcrumbs-list-item--is-link"
        >
          <a
            class="project__breadcrumbs-item project__breadcrumbs-item--is-link"
            href="/projects"
            title="All Projects"
          >
            <i class="hn hn-bullet-list-solid"></i>
            Projects
          </a>
        </li>
        <li class="project__breadcrumbs-list-item">
          <p class="project__breadcrumbs-item">
            {data.project.title}
          </p>
        </li>
      </ul>
    </nav>

    <section class="project__images">
      <div class="project__images-frame">
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
                    title={`View "${image.alt}"`}
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

              <button
                slot="container-end"
                class="project__swiper-nav-button project__swiper-nav-button--is-prev swiper-button-prev"
                type="button"
                aria-label="Previous Image"
                title="Previous Image"
              ></button>
              <button
                slot="container-end"
                class="project__swiper-nav-button project__swiper-nav-button--is-next swiper-button-next"
                type="button"
                aria-label="Next Image"
                title="Next Image"
              ></button>
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

      {#key data.project.id}
        <swiper-container
          bind:this={swiperThumbs}
          class="project__thumbs"
          init="false"
        >
          {#each data.project.images as image, i (image.name)}
            <swiper-slide lazy="true">
              <button
                class="project__thumb"
                type="button"
                title={`Go to Image #${i + 1}`}
              >
                <img
                  class="project__thumb-image"
                  src={`/images/projects/${image.name}`}
                  alt={data.project.alt}
                  loading="lazy"
                />
              </button>
            </swiper-slide>
          {/each}
        </swiper-container>
      {/key}
    </section>

    <div class="project__info">
      <header class="project__header">
        <h1 class="project__title" id="project-title">
          {data.project.title}
        </h1>
        <p class="project__type">
          <i class={['hn', `hn-${data.project.type.icon}`]}></i>
          {data.project.type.name}
        </p>
      </header>
      <p class="project__description">{data.project.description}</p>
      {#if data.project.externalLinks.length > 0}
        <section
          class="project__links"
          aria-labelledby="project-external-links"
        >
          <h3 class="project__links-title" id="project-external-links">
            {`External Link${data.project.externalLinks.length > 1 ? 's' : ''}`}
            <i class="project__links-title-icon hn hn-external-link-solid"></i>
            :
          </h3>
          <ul class="project__links-list">
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
        </section>
      {/if}
      {#if data.project.badges.length > 0}
        <section class="project__badges">
          <h3 class="project__badges-title">Tech Stacks:</h3>
          <ul class="project__badges-list">
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
        </section>
      {/if}
    </div>

    <div class="project__nav">
      {#if data.project.prevProject}
        <Button
          class="project__nav-button project__nav-button--is-prev"
          href={`/projects/${data.project.prevProject.slug}`}
          title={data.project.prevProject.title}
        >
          <i class="hn hn-arrow-left-solid"></i>
          Prev:
          {data.project.prevProject.title}
        </Button>
      {/if}
      {#if data.project.nextProject}
        <Button
          class="project__nav-button project__nav-button--is-next"
          href={`/projects/${data.project.nextProject.slug}`}
          theme="secondary"
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
    display: grid;
    grid-template-columns: 100%;
    grid-template-areas:
      'images'
      'breadcrumbs'
      'info'
      'nav';
    gap: 32px;
  }

  @media (min-width: 576px) {
    .project__container {
      margin-bottom: 64px;
      padding: 16px;
    }
  }

  @media (min-width: 768px) {
    .project__container {
      padding: 32px 64px;
    }
  }

  @media (min-width: 992px) {
    .project__container {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-template-areas:
        'breadcrumbs breadcrumbs'
        'images info'
        'nav nav';
      padding: 32px;
    }
  }

  .project__breadcrumbs {
    grid-area: breadcrumbs;
    padding-inline: 16px;
  }

  @media (min-width: 992px) {
    .project__breadcrumbs {
      width: 100%;
      padding: 0;
    }
  }

  .project__breadcrumbs-list {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .project__breadcrumbs-list-item--is-link::after {
    content: '/';
    margin-left: 8px;
    font-size: var(--font-size-semi-small);
  }

  .project__breadcrumbs-item {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: var(--font-size-semi-small);
    color: var(--color-black-pure);
    text-decoration: none;
  }

  .project__breadcrumbs-item--is-link {
    border-radius: 2px;
    outline: 2px solid transparent;
    outline-offset: 2px;
    color: var(--color-primary-main);
    text-decoration: 2px underline dotted transparent;
    text-decoration-skip-ink: none;
    text-underline-offset: 4px;
    transition:
      outline 0.25s,
      text-decoration 0.25s;
  }

  .project__breadcrumbs-item--is-link:is(:hover, :focus-visible) {
    text-decoration-color: var(--color-primary-main);
  }

  .project__breadcrumbs-item--is-link:focus-visible {
    outline-color: var(--color-secondary-main);
  }

  .project__content {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  @media (min-width: 992px) {
    .project__content {
      --shadow-gap: 16px;

      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0;
    }
  }

  .project__images {
    grid-area: images;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  @media (min-width: 1200px) {
    .project__images {
      margin-right: 8px;
    }
  }

  .project__images-frame {
    overflow: hidden;
    width: 100%;
    aspect-ratio: 16 / 9;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-white-alt-1);
    font-family: var(--font-family-pixel);
    color: rgba(var(--color-black-alt-2-rgb), 0.5);
    text-align: center;
  }

  @media (min-width: 576px) {
    .project__images-frame {
      border-radius: 8px;
    }
  }

  .project__thumb {
    overflow: hidden;
    border: none;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    transition: border 0.25s;
  }

  .project__thumb:focus-visible {
    border: 2px solid var(--color-secondary-main);
  }

  .project__thumb-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: center;
    filter: brightness(0.8);
    transition: filter 0.25s;
  }

  .project__thumb:is(:hover, :focus-visible) .project__thumb-image {
    filter: brightness(1);
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

  .project__swiper-nav-button {
    --swiper-navigation-sides-offset: 0;
    --swiper-navigation-color: var(--color-white-pure);

    top: 0;
    inset-block: 0;
    background: none;
    border: none;
    outline: none;
    padding: 16px;
    transition: background 0.25s;
  }

  .project__swiper-nav-button:hover {
    background-color: rgba(var(--color-black-pure-rgb), 0.1);
  }

  .project__swiper-nav-button:focus-visible {
    background-color: rgba(var(--color-black-pure-rgb), 0.4);
  }

  .project__swiper-nav-button:global(.swiper-button-disabled) {
    opacity: inherit;
  }

  .project__swiper-nav-button:global(.swiper-button-disabled)
    :global(.swiper-navigation-icon) {
    opacity: 0.2;
  }

  .project__swiper-nav-button :global(.swiper-navigation-icon) {
    height: 16px;
  }

  .project__swiper-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .project__swiper-pagination :global(.swiper-pagination-bullet) {
    border: 2px solid transparent;
    transition:
      background 0.25s,
      border 0.25s;
  }

  .project__swiper-pagination :global(.swiper-pagination-bullet:hover) {
    --swiper-pagination-bullet-inactive-color: var(--color-white-alt-2);
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

  .project__no-image {
    user-select: none;
  }

  .project__info {
    grid-area: info;
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding-inline: 16px;
  }

  @media (min-width: 992px) {
    .project__info {
      padding: 0;
    }
  }

  @media (min-width: 1200px) {
    .project__info {
      margin-left: 8px;
    }
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
    flex-direction: column;
    gap: 8px;
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

  .project__links-list {
    padding-left: 16px;
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
    flex-direction: column;
    gap: 8px;
  }

  .project__badges-title {
    font-size: var(--font-size-paragraph);
  }

  .project__badges-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    list-style: none;
  }

  .project__badge {
    border-radius: 2px;
  }

  .project__nav {
    grid-area: nav;
    overflow: hidden;
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    padding-inline: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @media (min-width: 768px) {
    .project__nav {
      margin-top: 64px;
      padding: 0;
    }
  }

  .project__nav :global(.project__nav-button) {
    flex-grow: 1;
  }

  @media (min-width: 768px) {
    .project__nav :global(.project__nav-button) {
      flex-grow: 0;
    }
  }

  .project__nav :global(.project__nav-button--is-next) {
    margin-left: auto;
  }
</style>
