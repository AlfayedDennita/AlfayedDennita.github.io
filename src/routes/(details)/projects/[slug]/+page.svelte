<script>
  import { isoStringToDateString } from '$lib/utils/formatDate.js';
  import { setPageData } from '$lib/states/pageData.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
  import ImageSlider from '$lib/components/ImageSlider.svelte';

  const { data } = $props();

  let project = $state();
  let imagesForSlider = $derived.by(() => {
    if (!project) {
      return [];
    }

    return project.images?.map((image) => ({
      url: `/images/projects/${image.name}`,
      ...image,
    }));
  });

  $effect(async () => {
    project = await data.project;

    setPageData({
      title: project.title,
      description: project.description,
      additionalKeywords: project.badges
        ? project.badges.map((badge) => badge.name)
        : undefined,
    });
  });
</script>

<section class="project" aria-labelledby="project-title">
  <div class="project__inner">
    {#await data.project}
      <div class="project__breadcrumbs project__breadcrumbs--skeleton"></div>
    {:then project}
      <Breadcrumbs
        class="project__breadcrumbs"
        prevPaths={[
          {
            name: 'Home',
            url: '/',
            icon: 'home-solid',
          },
          {
            name: 'All Projects',
            url: '/projects/',
            icon: 'bullet-list-solid',
          },
        ]}
        currentPage={project?.title || 'Not Found'}
      />
    {/await}

    {#snippet imageSliderSkeleton(mainFrameText)}
      <div class="project__image-slider project__image-slider--skeleton">
        <div class="project__main-frame project__main-frame--skeleton">
          {mainFrameText}
        </div>
        <div class="project__thumbs-swiper project__thumbs-swiper--skeleton">
          {#each { length: 4 }}
            <div
              class="project__thumbs-swiper-thumb project__thumbs-swiper-thumb--skeleton"
            ></div>
          {/each}
        </div>
      </div>
    {/snippet}

    {#await data.project}
      {@render imageSliderSkeleton()}
    {:then project}
      {#if project}
        <ImageSlider
          class="project__image-slider"
          mainFrameClass="project__main-frame"
          images={imagesForSlider}
        />
      {:else}
        {@render imageSliderSkeleton('Not Found')}
      {/if}
    {/await}

    {#snippet infoSkeleton()}
      <div class="info__header">
        <div class="info__title info__title--skeleton"></div>
        <div class="info__type info__type--skeleton"></div>
      </div>
      <div class="info__description info__description--skeleton"></div>
    {/snippet}

    <div class="info project__info">
      {#await data.project}
        {@render infoSkeleton()}
      {:then project}
        {#if project}
          <header class="info__header">
            <h1 class="info__title" id="project-title">
              {project.title}
            </h1>
            <p class="info__type">
              <i class={['hn', `hn-${project.type.icon}`]}></i>
              {project.type.name}
            </p>
          </header>
          {#if project.createdAt || project.updatedAt}
            <div class="dates info__dates">
              {#if project.createdAt}
                <p class="dates__date">
                  <b>Published:</b>
                  {isoStringToDateString(project.createdAt)}
                </p>
              {/if}
              {#if project.updatedAt}
                <p class="dates__date">
                  <b>Last Updated:</b>
                  {isoStringToDateString(project.updatedAt)}
                </p>
              {/if}
            </div>
          {/if}
          <p class="info__description">{project.description}</p>
          {#if project.externalLinks?.length > 0}
            <section class="links info__links" aria-labelledby="links-title">
              <h3 class="links__title" id="links-title">
                {`External Link${project.externalLinks.length > 1 ? 's' : ''}`}
                <i class="hn hn-external-link-solid links__title-icon"></i>
                :
              </h3>
              <ul class="links__list">
                {#each project.externalLinks as link (link.name)}
                  <li>
                    <a
                      class="links__link"
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
          {#if project.badges?.length > 0}
            <section class="badges info__badges" aria-labelledby="badges-title">
              <h3 class="badges__title" id="badges-title">Tech Stacks:</h3>
              <ul class="badges__list">
                {#each project.badges as badge (badge.name)}
                  <li>
                    <img
                      class="badges__badge"
                      src={`https://img.shields.io/badge/${badge.content}`}
                      alt={badge.name}
                    />
                  </li>
                {/each}
              </ul>
            </section>
          {/if}
        {:else}
          {@render infoSkeleton()}
        {/if}
      {/await}
    </div>

    {#snippet navSkeleton()}
      <div class="nav__button nav__button--skeleton"></div>
      <div class="nav__button nav__button--skeleton"></div>
    {/snippet}

    <div class="nav project__nav">
      {#await data.project}
        {@render navSkeleton()}
      {:then project}
        {#if project}
          {#if project.prevProject}
            <Button
              class="nav__button nav__button--dir--prev"
              href={`/projects/${project.prevProject.slug}`}
              title={project.prevProject.title}
            >
              <i class="hn hn-arrow-left-solid"></i>
              Prev:
              {project.prevProject.title}
            </Button>
          {/if}
          {#if project.nextProject}
            <Button
              class="nav__button nav__button--dir--next"
              href={`/projects/${project.nextProject.slug}`}
              theme="secondary"
              title={project.nextProject.title}
            >
              Next:
              {project.nextProject.title}
              <i class="hn hn-arrow-right-solid"></i>
            </Button>
          {/if}
        {:else}
          {@render navSkeleton()}
        {/if}
      {/await}
    </div>
  </div>
</section>

<style>
  @media (min-width: 576px) {
    .project {
      padding-inline: var(--screen-margin-dynamic);
    }
  }

  .project__inner {
    margin: 0 auto 16px;
    max-width: var(--breakpoint-xl);
    display: grid;
    grid-template-areas:
      'image-slider'
      'breadcrumbs'
      'info'
      'nav';
    grid-template-columns: 100%;
    gap: 32px;
  }

  @media (min-width: 576px) {
    .project__inner {
      padding-block: 16px;
    }
  }

  @media (min-width: 992px) {
    .project__inner {
      grid-template-areas:
        'breadcrumbs breadcrumbs'
        'image-slider info'
        'nav nav';
      grid-template-columns: repeat(2, minmax(0, 1fr));
      padding-block: 32px;
    }
  }

  @media (min-width: 1200px) {
    .project__inner {
      gap: 40px;
    }
  }

  .project :global(.project__breadcrumbs) {
    grid-area: breadcrumbs;
    margin-inline: var(--screen-margin-dynamic);
  }

  .project__breadcrumbs--skeleton {
    height: 24px;
    background-color: var(--color-white-alt-1);
    border-radius: 2px;
  }

  @media (min-width: 992px) {
    .project :global(.project__breadcrumbs) {
      margin-inline: 0;
    }
  }

  .project :global(.project__image-slider) {
    grid-area: image-slider;
  }

  .project__image-slider--skeleton {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  @media (min-width: 576px) {
    .project :global(.project__main-frame) {
      overflow: hidden;
      border-radius: 8px;
    }
  }

  .project__main-frame--skeleton {
    aspect-ratio: 16 / 9;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-white-alt-1);
    font-family: var(--font-family-pixel);
    text-align: center;
    color: rgba(var(--color-black-alt-2-rgb), 0.5);
    user-select: none;
  }

  @media (min-width: 576px) {
    .project__thumbs-swiper--skeleton {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }

    .project__thumbs-swiper-thumb--skeleton {
      aspect-ratio: 16 / 9;
      background-color: var(--color-white-alt-1);
      border-radius: 4px;
    }
  }

  .project__info {
    grid-area: info;
    margin-inline: var(--screen-margin-dynamic);
  }

  @media (min-width: 992px) {
    .project__info {
      margin-inline: 0;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .info__header {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .info__title {
    font-family: var(--font-family-pixel);
    font-size: var(--font-size-heading-3);
    line-height: 1;
  }

  .info__title--skeleton {
    height: 42px;
    background-color: var(--color-white-alt-1);
    border-radius: 4px;
  }

  .info__type {
    align-self: flex-start;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 4px 8px;
    background-color: var(--color-primary-highlight);
    border-radius: 2px;
    font-size: var(--font-size-small);
    font-weight: bold;
    text-align: center;
    color: var(--color-primary-shadow);
  }

  .info__type--skeleton {
    display: inline-block;
    width: 128px;
    height: 26px;
    background-color: var(--color-white-alt-1);
    border-radius: 4px;
  }

  .info__description--skeleton {
    display: inline-block;
    height: 256px;
    background-color: var(--color-white-alt-1);
    border-radius: 4px;
  }

  .dates__date {
    font-size: var(--font-size-small);
    color: var(--color-black-alt-1);
  }

  .links {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .links__title {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: var(--font-size-paragraph);
  }

  .links__title-icon {
    font-size: var(--font-size-semi-small);
  }

  .links__list {
    margin-left: 16px;
  }

  .links__link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: none;
    outline: none;
    font-size: var(--font-size-semi-small);
    text-decoration: 2px underline dotted transparent;
    text-decoration-skip-ink: none;
    text-underline-offset: 4px;
    color: var(--color-black-pure);
    transition:
      font-weight 0.25s,
      color 0.25s,
      text-decoration-color 0.25s;
  }

  .links__link:is(:hover, :focus-visible) {
    font-weight: bold;
    color: var(--color-primary-main);
    text-decoration-color: var(--color-primary-main);
  }

  .badges {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .badges__title {
    font-size: var(--font-size-paragraph);
  }

  .badges__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    list-style: none;
  }

  .badges__badge {
    border-radius: 2px;
  }

  .project__nav {
    grid-area: nav;
    margin-inline: var(--screen-margin-dynamic);
    margin-top: 32px;
  }

  @media (min-width: 992px) {
    .project__nav {
      margin-top: 64px;
      margin-inline: 0;
    }
  }

  .nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  .nav :global(.nav__button) {
    flex-grow: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .nav :global(.nav__button--dir--next) {
    margin-left: auto;
  }

  @media (min-width: 768px) {
    .nav :global(.nav__button) {
      flex-grow: 0;
    }
  }

  .nav__button--skeleton {
    width: 192px;
    height: 48px;
    background-color: var(--color-white-alt-1);
    border-radius: 4px;
  }
</style>
