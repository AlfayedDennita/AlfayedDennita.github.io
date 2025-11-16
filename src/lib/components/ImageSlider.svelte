<script>
  import { tick } from 'svelte';
  import { register as registerSwiperElements } from 'swiper/element';
  import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules';
  import PhotoSwipe from 'photoswipe';
  import PhotoSwipeLightbox from 'photoswipe/lightbox';
  import swiperFreeModeStyles from 'swiper/element/css/free-mode?url';
  import 'swiper/element/css/navigation';
  import 'swiper/element/css/pagination';
  import 'swiper/element/css/thumbs';
  import 'photoswipe/style.css';

  registerSwiperElements();

  const {
    class: className,
    mainFrameClass,
    mainSwiperClass,
    thumbsSwiperClass,
    images = [],
    ...props
  } = $props();

  let windowInnerWidth = $state();
  let isThumbsSwiperShown = $derived(windowInnerWidth >= 576);

  let lightbox = $state();
  let mainSwiper = $state();
  let thumbsSwiper = $state();
  let activeSlideIdx = $state(0);

  function changeMainSwiperActiveSlide(idx) {
    activeSlideIdx = idx;
    mainSwiper?.swiper?.slideTo(activeSlideIdx);
  }

  function handleChangingSwiperActiveIdx(event) {
    activeSlideIdx = event.detail[0].activeIndex;
  }

  function initLightbox() {
    lightbox = new PhotoSwipeLightbox({
      pswpModule: PhotoSwipe,
      gallery: '.main-swiper',
      children: '.main-swiper__anchor',
      loop: false,
      mainClass: 'lightbox',
      arrowPrevSVG:
        '<svg class="pswp__icn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><polygon points="17 5 17 7 16 7 16 8 15 8 15 9 14 9 14 10 13 10 13 11 12 11 12 13 13 13 13 14 14 14 14 15 15 15 15 16 16 16 16 17 17 17 17 19 16 19 16 20 14 20 14 19 13 19 13 18 12 18 12 17 11 17 11 16 10 16 10 15 9 15 9 14 8 14 8 13 7 13 7 11 8 11 8 10 9 10 9 9 10 9 10 8 11 8 11 7 12 7 12 6 13 6 13 5 14 5 14 4 16 4 16 5 17 5"/></svg>',
      arrowNextSVG:
        '<svg class="pswp__icn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><polygon points="17 5 17 7 16 7 16 8 15 8 15 9 14 9 14 10 13 10 13 11 12 11 12 13 13 13 13 14 14 14 14 15 15 15 15 16 16 16 16 17 17 17 17 19 16 19 16 20 14 20 14 19 13 19 13 18 12 18 12 17 11 17 11 16 10 16 10 15 9 15 9 14 8 14 8 13 7 13 7 11 8 11 8 10 9 10 9 9 10 9 10 8 11 8 11 7 12 7 12 6 13 6 13 5 14 5 14 4 16 4 16 5 17 5"/></svg>',
      closeSVG:
        '<svg class="pswp__icn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><polygon points="15 13 16 13 16 14 17 14 17 15 18 15 18 16 19 16 19 17 20 17 20 18 21 18 21 19 22 19 22 20 21 20 21 21 20 21 20 22 19 22 19 21 18 21 18 20 17 20 17 19 16 19 16 18 15 18 15 17 14 17 14 16 13 16 13 15 11 15 11 16 10 16 10 17 9 17 9 18 8 18 8 19 7 19 7 20 6 20 6 21 5 21 5 22 4 22 4 21 3 21 3 20 2 20 2 19 3 19 3 18 4 18 4 17 5 17 5 16 6 16 6 15 7 15 7 14 8 14 8 13 9 13 9 11 8 11 8 10 7 10 7 9 6 9 6 8 5 8 5 7 4 7 4 6 3 6 3 5 2 5 2 4 3 4 3 3 4 3 4 2 5 2 5 3 6 3 6 4 7 4 7 5 8 5 8 6 9 6 9 7 10 7 10 8 11 8 11 9 13 9 13 8 14 8 14 7 15 7 15 6 16 6 16 5 17 5 17 4 18 4 18 3 19 3 19 2 20 2 20 3 21 3 21 4 22 4 22 5 21 5 21 6 20 6 20 7 19 7 19 8 18 8 18 9 17 9 17 10 16 10 16 11 15 11 15 13"/></svg>',
      zoomSVG:
        '<svg class="pswp__icn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><polygon points="16 17 15 17 15 18 13 18 13 19 7 19 7 18 5 18 5 17 4 17 4 16 3 16 3 15 2 15 2 13 1 13 1 7 2 7 2 5 3 5 3 4 4 4 4 3 5 3 5 2 7 2 7 1 13 1 13 2 15 2 15 3 16 3 16 4 17 4 17 5 18 5 18 7 19 7 19 13 18 13 18 15 17 15 17 16 16 16 16 17"/><polygon points="23 20 23 22 22 22 22 23 20 23 20 22 19 22 19 21 18 21 18 20 17 20 17 19 16 19 16 18 17 18 17 17 18 17 18 16 19 16 19 17 20 17 20 18 21 18 21 19 22 19 22 20 23 20"/></svg>',
    });

    lightbox.on('change', () => {
      changeMainSwiperActiveSlide(window.pswp.currIndex);
    });

    lightbox.init();
  }

  function destroyLightbox() {
    lightbox?.destroy();
    lightbox = null;
  }

  function initMainSwiper(node) {
    mainSwiper = node;

    const mainSwiperParams = {
      modules: [Navigation, Pagination, Thumbs, FreeMode],
      navigation: {
        prevEl: '.main-swiper__nav-button--dir--prev',
        nextEl: '.main-swiper__nav-button--dir--next',
      },
      pagination: {
        el: '.main-swiper__pagination',
        clickable: true,
      },
      thumbs: {
        swiper: '.thumbs-swiper',
        slideThumbActiveClass: 'thumbs-swiper__slide--active',
      },
    };

    Object.assign(node, mainSwiperParams);

    node.addEventListener(
      'swiperactiveindexchange',
      handleChangingSwiperActiveIdx
    );

    node.initialize();
  }

  function destroyMainSwiper(node) {
    node.removeEventListener(
      'swiperactiveindexchange',
      handleChangingSwiperActiveIdx
    );

    node.swiper?.destroy();
  }

  function mainSwiperAttachment(images) {
    return async (node) => {
      images;

      initMainSwiper(node);
      await tick();
      initLightbox();

      return () => {
        destroyLightbox();
        destroyMainSwiper(node);
      };
    };
  }

  function initThumbsSwiper(node) {
    thumbsSwiper = node;

    const thumbsSwiperParams = {
      modules: [FreeMode],
      injectStylesUrls: [swiperFreeModeStyles],
      freeMode: {
        enabled: true,
      },
      slidesPerView: 4,
      spaceBetween: 8,
    };

    Object.assign(node, thumbsSwiperParams);

    node.initialize();
  }

  function destroyThumbsSwiper(node) {
    node.swiper?.destroy();
  }

  function thumbsSwiperAttachment(images) {
    return (node) => {
      images;

      initThumbsSwiper(node);

      return () => destroyThumbsSwiper(node);
    };
  }
</script>

<svelte:window bind:innerWidth={windowInnerWidth} />

<section class={['image-slider', className]} {...props}>
  <div class={['image-slider__main-frame', mainFrameClass]}>
    {#if images.length > 0}
      {#key isThumbsSwiperShown}
        <swiper-container
          class={['main-swiper image-slider__main-swiper', mainSwiperClass]}
          init="false"
          {@attach mainSwiperAttachment(images)}
        >
          {#each images as image, i (image.name)}
            <swiper-slide>
              <a
                class="main-swiper__anchor"
                href={image.url}
                data-pswp-width={image.width}
                data-pswp-height={image.height}
                data-cropped="true"
                title={image.alt ? `View "${image.alt}"` : undefined}
                tabindex={i === activeSlideIdx ? 0 : -1}
              >
                <img
                  class="main-swiper__image"
                  src={image.url}
                  alt={image.alt}
                />
              </a>
            </swiper-slide>
          {/each}

          <button
            slot="container-end"
            class="swiper-button-prev main-swiper__nav-button main-swiper__nav-button--dir--prev"
            type="button"
            aria-label="Previous Image"
            title="Previous Image"
          ></button>
          <button
            slot="container-end"
            class="swiper-button-next main-swiper__nav-button main-swiper__nav-button--dir--next"
            type="button"
            aria-label="Next Image"
            title="Next Image"
          ></button>
          <div
            slot="container-end"
            class="swiper-pagination main-swiper__pagination"
          ></div>
        </swiper-container>
      {/key}
    {:else}
      <p class="image-slider__no-image">No Image</p>
    {/if}
  </div>

  {#if isThumbsSwiperShown}
    <swiper-container
      class={['thumbs-swiper image-slider__thumb-swiper', thumbsSwiperClass]}
      init="false"
      {@attach thumbsSwiperAttachment(images)}
    >
      {#each images as image, i (image.name)}
        <swiper-slide
          class="thumbs-swiper__thumb"
          role="button"
          tabindex="0"
          title={`Go to Image No. ${i + 1}`}
          onkeydown={(event) => {
            if (event.key === ' ') {
              event.preventDefault();
            }
          }}
          onkeyup={(event) => {
            if (['Enter', ' '].includes(event.key)) {
              event.preventDefault();
              changeMainSwiperActiveSlide(i);
            }
          }}
        >
          <img class="thumbs-swiper__image" src={image.url} alt={image.alt} />
        </swiper-slide>
      {/each}
    </swiper-container>
  {/if}
</section>

<style>
  .image-slider {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .image-slider__main-frame {
    aspect-ratio: 16 / 9;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-white-alt-1);
    font-family: var(--font-family-pixel);
    text-align: center;
    color: rgba(var(--color-black-alt-2-rgb), 0.5);
  }

  .main-swiper {
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

  .main-swiper__nav-button {
    --swiper-navigation-sides-offset: 0;
    --swiper-navigation-color: var(--color-white-pure);

    top: 0;
    inset-block: 0;
    padding: 16px;
    background: none;
    border: none;
    outline: none;
    transition: background-color 0.25s;
  }

  .main-swiper__nav-button:hover {
    background-color: rgba(var(--color-black-pure-rgb), 0.05);
  }

  .main-swiper__nav-button:focus-visible {
    background-color: rgba(var(--color-black-pure-rgb), 0.1);
  }

  .main-swiper__nav-button:global(.swiper-button-disabled) {
    opacity: inherit;
  }

  .main-swiper__nav-button:global(.swiper-button-disabled)
    :global(.swiper-navigation-icon) {
    opacity: 0.2;
  }

  .main-swiper__nav-button :global(.swiper-navigation-icon) {
    height: 16px;
    stroke: var(--color-black-alt-2);
    stroke-width: 0.4px;
  }

  .main-swiper__pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main-swiper__pagination :global(.swiper-pagination-bullet) {
    border: 2px solid transparent;
    transition:
      background-color 0.25s,
      border-color 0.25s;
  }

  .main-swiper__pagination :global(.swiper-pagination-bullet:hover) {
    --swiper-pagination-bullet-inactive-color: var(--color-white-alt-2);
  }

  .main-swiper__pagination :global(.swiper-pagination-bullet-active) {
    border-color: var(--color-secondary-main);
  }

  .main-swiper__anchor {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
  }

  .main-swiper__anchor::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: transparent;
    user-select: none;
    transition: background-color 0.25s;
  }

  .main-swiper__anchor:focus-visible::after {
    background-color: rgba(var(--color-primary-main-rgb), 0.5);
  }

  .main-swiper__image {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: center;
  }

  .image-slider__no-image {
    user-select: none;
  }

  .thumbs-swiper {
    width: 100%;
  }

  .thumbs-swiper__thumb {
    position: relative;
    overflow: hidden;
    border: none;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    transition: border 0.25s;
  }

  .thumbs-swiper__thumb::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: transparent;
    user-select: none;
    transition: background-color 0.25s;
  }

  .thumbs-swiper__thumb:focus-visible::after {
    background-color: rgba(var(--color-secondary-main-rgb), 0.5);
  }

  .thumbs-swiper__image {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: center;
    filter: brightness(0.5);
    transition: filter 0.25s;
  }

  .thumbs-swiper__thumb:is(:hover, :focus-visible) .thumbs-swiper__image {
    filter: brightness(1);
  }

  :global(.thumbs-swiper__slide--active) .thumbs-swiper__image {
    filter: brightness(1);
  }

  :global(.lightbox .pswp__button) {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid transparent;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.25s;
  }

  :global(.lightbox .pswp__button:focus-visible) {
    border-color: var(--color-secondary-main);
  }

  :global(.lightbox .pswp__icn) {
    position: static;
    margin: 0;
    width: 20px;
    height: 20px;
  }

  :global(.lightbox .pswp__button--arrow .pswp__icn) {
    width: 32px;
    height: 32px;
  }
</style>
