<script>
  const { slug, title, image, typeIcon, typeName, description } = $props();
</script>

<div class="project-card">
  <div class="project-card__container">
    {#if image}
      <img
        src={`/images/projects/${image.name}`}
        class="project-card__image"
        alt={image.alt}
      />
    {:else}
      <p class="project-card__image project-card__image--is-blank">No Image</p>
    {/if}
    <div class="project-card__info">
      <a href={`/projects/${slug}/`} class="project-card__anchor" {title}>
        <h3 class="project-card__title">{title}</h3>
      </a>
      <p class="project-card__type">
        <i class={['hn', `hn-${typeIcon}`]}></i>
        {typeName}
      </p>
      <p class="project-card__description">{description}</p>
    </div>
  </div>
</div>

<style>
  .project-card {
    --card-border-radius: 16px;

    flex-grow: 1;
    position: relative;
    max-width: 352px;
    padding: 8px 8px 24px;
    background-color: var(--color-primary-shadow);
    border-radius: var(--card-border-radius);
  }

  @media (min-width: 768px) {
    .project-card {
      max-width: 320px;
    }
  }

  .project-card:nth-child(even) {
    background-color: var(--color-secondary-shadow);
  }

  .project-card__container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 16px 16px 32px;
    background-color: var(--color-white-pure);
    border-radius: 8px;
  }

  .project-card__image {
    width: 100%;
    aspect-ratio: 16 / 9;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-white-alt-1);
    object-fit: cover;
    object-position: center;
    border-radius: 4px;
    font-family: var(--font-family-pixel);
    color: rgba(var(--color-black-alt-2-rgb), 0.5);
  }

  .project-card__image--is-blank {
    user-select: none;
  }

  .project-card__info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .project-card__anchor {
    outline: none;
    font-family: var(--font-family-pixel);
    font-size: var(--font-size-heading-6);
    color: var(--color-black-pure);
    text-transform: uppercase;
    text-decoration: 2px underline dotted transparent;
    text-underline-offset: 4px;
    transition: text-decoration 0.25s;
  }

  .project-card__anchor:is(:hover, :focus-visible) {
    text-decoration-color: var(--color-primary-main);
  }

  .project-card:nth-child(even)
    .project-card__anchor:is(:hover, :focus-visible) {
    text-decoration-color: var(--color-secondary-main);
  }

  .project-card__anchor::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--card-border-radius);
    outline: 4px solid transparent;
    outline-offset: 4px;
    transition: outline 0.25s;
  }

  .project-card__anchor:focus-visible::after {
    outline-color: var(--color-primary-main);
  }

  .project-card:nth-child(even) .project-card__anchor:focus-visible::after {
    outline-color: var(--color-secondary-main);
  }

  .project-card__type {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    background-color: var(--color-primary-highlight);
    border-radius: 2px;
    font-size: var(--font-size-small);
    color: var(--color-primary-shadow);
  }

  .project-card:nth-child(even) .project-card__type {
    background-color: var(--color-secondary-highlight);
    color: var(--color-secondary-shadow);
  }

  .project-card__description {
    margin-top: 12px;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    line-clamp: 4;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
</style>
