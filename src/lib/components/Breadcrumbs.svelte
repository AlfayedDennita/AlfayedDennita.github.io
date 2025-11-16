<script>
  const {
    class: className,
    prevPaths = [],
    currentPage = 'Current',
    ...props
  } = $props();
</script>

<nav class={['breadcrumbs', className]} aria-label="Breadcrumbs" {...props}>
  <ul class="breadcrumbs__list">
    {#if prevPaths}
      {#each prevPaths as path (path.name)}
        <li class="breadcrumbs__item breadcrumbs__item--link">
          <a
            class="breadcrumbs__content breadcrumbs__content--link"
            href={path.url}
            title={path.name}
          >
            <i class={`hn hn-${path.icon}`}></i>
            {path.name}
          </a>
        </li>
      {/each}
    {/if}
    <li class="breadcrumbs__item">
      <p class="breadcrumbs__content">
        {currentPage}
      </p>
    </li>
  </ul>
</nav>

<style>
  .breadcrumbs__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }

  .breadcrumbs__item--link::after {
    content: '/';
    margin-left: 8px;
    font-size: var(--font-size-semi-small);
  }

  .breadcrumbs__content {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: var(--font-size-semi-small);
    text-decoration: none;
    color: var(--color-black-pure);
  }

  .breadcrumbs__content--link {
    border-radius: 2px;
    outline: 2px solid transparent;
    outline-offset: 2px;
    text-decoration: 2px underline dotted transparent;
    text-decoration-skip-ink: none;
    text-underline-offset: 4px;
    color: var(--color-primary-main);
    transition:
      outline-color 0.25s,
      text-decoration-color 0.25s;
  }

  .breadcrumbs__content--link:is(:hover, :focus-visible) {
    text-decoration-color: var(--color-primary-main);
  }

  .breadcrumbs__content--link:focus-visible {
    outline-color: var(--color-secondary-main);
  }
</style>
