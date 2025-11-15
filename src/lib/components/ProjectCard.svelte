<script>
  import { isoStringToDateString } from '$lib/utils/formatDate';

  const {
    class: className,
    skeleton = false,
    slug,
    title,
    typeIcon,
    typeName,
    isoCreatedAt,
    description,
    image,
    ...props
  } = $props();
</script>

<li class="project-card" class:project-card--skeleton={skeleton} {...props}>
  <div class="project-card__inner">
    <div class="project-card__image">
      {#if !skeleton}
        {#if image}
          <img
            class="project-card__image-object project-card__image-object--type--image"
            src={`/images/projects/${image.name}`}
            alt={image.alt}
          />
        {:else}
          <p
            class="project-card__image-object project-card__image-object--type--blank"
          >
            No Image
          </p>
        {/if}
      {/if}
    </div>
    <div class="project-card__info">
      <svelte:element
        this={!skeleton ? 'a' : 'div'}
        class="project-card__anchor"
        class:project-card__anchor--skeleton={skeleton}
        href={!skeleton ? `/projects/${slug}/` : undefined}
        title={!skeleton ? title : undefined}
      >
        {#if !skeleton}
          <h3 class="project-card__title">{title}</h3>
        {/if}
      </svelte:element>
      <svelte:element
        this={!skeleton ? 'p' : 'div'}
        class="project-card__type"
        class:project-card__type--skeleton={skeleton}
      >
        {#if !skeleton}
          <i class={['hn', `hn-${typeIcon}`]}></i>
          {typeName}
        {/if}
      </svelte:element>
      <svelte:element
        this={!skeleton ? 'p' : 'div'}
        class="project-card__date"
        class:project-card__date--skeleton={skeleton}
      >
        {#if !skeleton}
          <i class="hn hn-calender-solid project-card__date-icon"></i>
          <time datetime={isoCreatedAt}
            >{isoStringToDateString(isoCreatedAt, false)}</time
          >
        {/if}
      </svelte:element>
      <svelte:element
        this={!skeleton ? 'p' : 'div'}
        class="project-card__description"
        class:project-card__description--skeleton={skeleton}
      >
        {description}
      </svelte:element>
    </div>
  </div>
</li>

<style>
  .project-card {
    --card-border-radius: 16px;

    position: relative;
    min-height: 384px;
    width: 384px;
    max-width: 100%;
    padding: 8px 8px 24px;
    background-color: var(--color-primary-shadow);
    border-radius: var(--card-border-radius);
  }

  @media (min-width: 768px) {
    .project-card {
      max-width: 320px;
    }
  }

  .project-card:not(.project-card--skeleton):nth-child(even) {
    background-color: var(--color-secondary-shadow);
  }

  .project-card--skeleton {
    background-color: var(--color-white-alt-2);
  }

  .project-card__inner {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 16px 16px 32px;
    background-color: var(--color-white-pure);
    border-radius: 8px;
  }

  .project-card__image {
    overflow: hidden;
    width: 100%;
    aspect-ratio: 16 / 9;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-white-alt-1);
    border-radius: 4px;
    font-family: var(--font-family-pixel);
    color: rgba(var(--color-black-alt-2-rgb), 0.5);
  }

  .project-card__image-object--type--image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .project-card__image-object--type--blank {
    user-select: none;
  }

  .project-card__info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .project-card__anchor {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    outline: none;
    font-family: var(--font-family-pixel);
    font-size: var(--font-size-heading-6);
    text-overflow: ellipsis;
    text-transform: uppercase;
    text-decoration: 2px underline dotted transparent;
    text-underline-offset: 4px;
    color: var(--color-black-pure);
    line-clamp: 2;
    -webkit-line-clamp: 2;
    transition: text-decoration-color 0.25s;
  }

  .project-card__anchor:not(.project-card__anchor--skeleton):is(
      :hover,
      :focus-visible
    ) {
    text-decoration-color: var(--color-primary-main);
  }

  .project-card:nth-child(even)
    .project-card__anchor:not(.project-card__anchor--skeleton):is(
      :hover,
      :focus-visible
    ) {
    text-decoration-color: var(--color-secondary-main);
  }

  .project-card__anchor:not(.project-card__anchor--skeleton)::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--card-border-radius);
    outline: 4px solid transparent;
    outline-offset: 4px;
    transition: outline-color 0.25s;
  }

  .project-card__anchor:not(
      .project-card__anchor--skeleton
    ):focus-visible::after {
    outline-color: var(--color-primary-main);
  }

  .project-card:nth-child(even)
    .project-card__anchor:not(
      .project-card__anchor--skeleton
    ):focus-visible::after {
    outline-color: var(--color-secondary-main);
  }

  .project-card__anchor--skeleton {
    margin-bottom: 4px;
    height: 28px;
    background-color: var(--color-white-alt-1);
    border-radius: 4px;
  }

  .project-card__type {
    align-self: flex-start;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    background-color: var(--color-primary-highlight);
    border-radius: 2px;
    font-size: var(--font-size-small);
    color: var(--color-primary-shadow);
  }

  .project-card:nth-child(even)
    .project-card__type:not(.project-card__type--skeleton) {
    background-color: var(--color-secondary-highlight);
    color: var(--color-secondary-shadow);
  }

  .project-card__type--skeleton {
    width: 128px;
    height: 26px;
    background-color: var(--color-white-alt-1);
  }

  .project-card__date {
    align-self: flex-start;
    margin-top: 12px;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px;
    font-size: var(--font-size-small);
    color: var(--color-black-alt-1);
  }

  .project-card__date--skeleton {
    width: 96px;
    height: 18px;
    background-color: var(--color-white-alt-1);
    border-radius: 2px;
  }

  .project-card__description {
    margin-top: 8px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    line-clamp: 4;
    -webkit-line-clamp: 4;
  }

  .project-card__description--skeleton {
    display: block;
    height: 96px;
    background-color: var(--color-white-alt-1);
    border-radius: 4px;
  }
</style>
