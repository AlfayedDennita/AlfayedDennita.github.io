<script>
  import { untrack } from 'svelte';
  import { slide } from 'svelte/transition';

  const { class: className, linkedSections = [] } = $props();

  let offsetHeight = $state();
  let windowScrollY = $state();
  let windowInnerWidth = $state();
  let isNavbarListOpen = $state(false);

  $effect(() => {
    offsetHeight;

    untrack(() => {
      for (let section of linkedSections) {
        section.updateOffsetTop?.();
      }
    });
  });

  $effect(() => {
    if (windowInnerWidth >= 576) {
      isNavbarListOpen = false;
    }
  });

  const activeSectionIdx = $derived.by(() => {
    for (let i = linkedSections.length - 1; i >= 0; i--) {
      if (windowScrollY >= linkedSections[i].offsetTop - offsetHeight) {
        return i;
      } else {
        continue;
      }
    }

    return 0;
  });

  export function getOffsetHeight() {
    return offsetHeight;
  }
</script>

<svelte:window
  bind:scrollY={windowScrollY}
  bind:innerWidth={windowInnerWidth}
/>

<nav
  class={['navbar', className]}
  class:navbar--open={isNavbarListOpen}
  bind:offsetHeight
>
  <div class="navbar__inner">
    {#if windowInnerWidth < 576}
      <button
        class="toggle navbar__toggle"
        aria-controls="navbar-list"
        aria-expanded={isNavbarListOpen}
        title={isNavbarListOpen
          ? 'Close Navigation Links'
          : 'Open Navigation Links'}
        onclick={() => (isNavbarListOpen = !isNavbarListOpen)}
      >
        <span class="toggle__text">
          Section:
          <span class="toggle__text-section">
            {#key activeSectionIdx}
              <span class="toggle__text-section-inner" transition:slide>
                #{linkedSections[activeSectionIdx]?.name}
              </span>
            {/key}
          </span>
        </span>
        <i class="hn hn-chevron-down-solid toggle__chevron"></i>
      </button>
    {/if}

    {#if windowInnerWidth >= 576 || isNavbarListOpen}
      <ul class="links" id="navbar-list" transition:slide>
        {#each linkedSections as section, i (section.name)}
          <li class="links__item">
            <a
              class="links__link"
              class:links__link--active={linkedSections[activeSectionIdx]
                .url === section.url}
              href={section.url}
              title={section.name}
              onclick={() => (isNavbarListOpen = !isNavbarListOpen)}
            >
              {section.name}
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</nav>

<style>
  .navbar {
    z-index: var(--z-index-topmost);
    position: sticky;
    top: 0;
    inset-inline: 0;
    background-color: var(--color-white-pure);
  }

  @media (min-width: 576px) {
    .navbar {
      padding-inline: var(--screen-margin-dynamic);
    }
  }

  .navbar::after {
    content: '';
    position: absolute;
    bottom: 0;
    inset-inline: 0;
    height: 2px;
    background: linear-gradient(
      to right,
      var(--color-primary-main),
      var(--color-secondary-main)
    );
    background-size: 200% 100%;
    background-position: 0 50%;
    animation: navbar-after 10s infinite alternate;
  }

  @keyframes navbar-after {
    to {
      background-position: 100% 50%;
    }
  }

  .navbar__inner {
    margin-inline: auto;
    min-height: 48px;
    max-width: var(--breakpoint-xl);
    display: flex;
    flex-direction: column;
  }

  .toggle {
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding: 0 var(--screen-margin);
    background-color: transparent;
    border: none;
    outline: none;
    font-size: var(--font-size-paragraph);
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.25s;
  }

  .toggle:is(:hover, :focus-visible) {
    background-color: rgba(var(--color-white-alt-1-rgb), 0.5);
  }

  .toggle__text {
    flex-grow: 1;
    align-self: stretch;
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: var(--font-family-pixel);
    text-decoration: underline 2px dotted transparent;
    transition: text-decoration-color 0.25s;
  }

  .toggle:focus-visible .toggle__text {
    text-decoration-color: var(--color-black-pure);
  }

  .toggle__text-section {
    overflow: hidden;
    flex-grow: 1;
    align-self: stretch;
    display: flex;
    flex-direction: column;
  }

  .toggle__text-section-inner {
    flex: 1 0 auto;
    height: 48px;
    display: flex;
    align-items: center;
    text-align: left;
  }

  .toggle__chevron {
    font-size: var(--font-size-small);
    transition: transform 0.25s;
  }

  .navbar--open .navbar__toggle .toggle__chevron {
    transform: rotate(180deg);
  }

  .links {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    list-style: none;
  }

  @media (min-width: 576px) {
    .links {
      flex-direction: row;
      justify-content: center;
    }
  }

  .links__link {
    min-height: 48px;
    display: flex;
    align-items: center;
    padding: 8px 20px;
    border: none;
    border-top: 1px solid var(--color-white-alt-1);
    outline: none;
    font-size: var(--font-size-semi-small);
    text-decoration: underline 2px dotted transparent;
    text-decoration-skip-ink: none;
    color: var(--color-black-pure);
    transition:
      padding-left 0.25s,
      background-color 0.25s,
      font-weight 0.25s,
      text-decoration-color 0.25s,
      color 0.25s;
  }

  @media (min-width: 576px) {
    .links__link {
      position: relative;
      justify-content: center;
      border: none;
      font-family: var(--font-family-pixel);
      font-size: var(--font-size-paragraph);
      text-underline-offset: 4px;
    }

    .links__link::after {
      content: '';
      position: absolute;
      top: 0;
      inset-inline: 0;
      height: 4px;
      transition: background-color 0.25s;
    }
  }

  @media (max-width: 575px) {
    .links__item:first-child .links__link {
      border-width: 2px;
      border-color: rgba(var(--color-white-alt-1-rgb), 0.75);
    }
  }

  .links__link:is(:hover, :focus-visible) {
    padding-left: 24px;
    background-color: rgba(var(--color-white-alt-1-rgb), 0.5);
  }

  @media (min-width: 576px) {
    .links__link:is(:hover, :focus-visible) {
      padding-left: 20px;
    }
  }

  .links__link:focus-visible {
    text-decoration-color: var(--color-black-pure);
  }

  .links__link--active {
    font-weight: bold;
    color: var(--color-primary-main);
  }

  @media (min-width: 576px) {
    .links__link--active::after {
      background-color: var(--color-primary-main);
    }
  }

  .links__link--active:focus-visible {
    text-decoration-color: var(--color-primary-main);
  }
</style>
