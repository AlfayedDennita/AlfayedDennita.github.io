<script>
  import { onMount, tick } from 'svelte';
  import { slide } from 'svelte/transition';

  const { linkedSections } = $props();

  let windowScrollY = $state();
  let windowInnerWidth = $state();
  let isNavbarListOpen = $state(false);
  let isNavbarSliding = $state(false);

  const navbarSlidingDuration = 400;

  async function updateLinkedSectionsOffsetTop() {
    await tick();
    for (let section of linkedSections) {
      section.offsetTop?.update();
    }
  }

  $effect(() => {
    if (windowInnerWidth >= 576) {
      setTimeout(async () => {
        await updateLinkedSectionsOffsetTop();
      }, navbarSlidingDuration);
    }
  });

  const activeSectionIdx = $derived.by(() => {
    for (let [i, section] of linkedSections.entries()) {
      if (i < linkedSections.length - 1) {
        if (
          windowScrollY >= section.offsetTop?.value - 48 &&
          windowScrollY < linkedSections[i + 1].offsetTop?.value - 48
        ) {
          return i;
        } else {
          continue;
        }
      } else if (windowScrollY >= section.offsetTop?.value - 48) {
        return i;
      } else {
        continue;
      }
    }

    return 0;
  });

  async function handleClickLink(event, i) {
    event.preventDefault();

    if (!isNavbarSliding) {
      windowScrollY = linkedSections[i].offsetTop?.value - 48;
      isNavbarListOpen = false;
    }
  }

  onMount(async () => {
    await updateLinkedSectionsOffsetTop();
  });
</script>

<svelte:window
  bind:scrollY={windowScrollY}
  bind:innerWidth={windowInnerWidth}
/>

<nav class={['navbar', `navbar--is-${isNavbarListOpen ? 'open' : 'closed'}`]}>
  <div class="navbar__container">
    {#if windowInnerWidth < 576}
      <button
        class="navbar__toggle"
        title={isNavbarListOpen ? 'Close Navigations' : 'Open Navigations'}
        onclick={() => (isNavbarListOpen = !isNavbarListOpen)}
      >
        <span class="navbar__toggle-text">
          <span>Section:</span>
          <span class="navbar__toggle-text-section-wrapper">
            {#key activeSectionIdx}
              <span transition:slide class="navbar__toggle-text-section">
                #{linkedSections[activeSectionIdx].name}
              </span>
            {/key}
          </span>
        </span>
        <i class="navbar__toggle-chevron hn hn-chevron-down-solid"></i>
      </button>
    {/if}

    {#if windowInnerWidth >= 576 || isNavbarListOpen}
      <ul
        class={[
          'navbar__list',
          `navbar__list--is-${isNavbarListOpen ? 'open' : 'closed'}`,
        ]}
        transition:slide={{ duration: navbarSlidingDuration }}
        onintrostart={() => (isNavbarSliding = true)}
        onoutrostart={() => (isNavbarSliding = true)}
        onintroend={() => {
          setTimeout(() => {
            isNavbarSliding = false;
          }, 100);
        }}
        onoutroend={() => {
          setTimeout(() => {
            isNavbarSliding = false;
          }, 100);
        }}
        {@attach async () => {
          await updateLinkedSectionsOffsetTop();

          return async () => {
            await updateLinkedSectionsOffsetTop();
          };
        }}
      >
        {#each linkedSections as section, i (section.name)}
          <li class="navbar__list-item">
            <a
              href={section.url}
              class={[
                'navbar__link',
                linkedSections[activeSectionIdx].url === section.url &&
                  'navbar__link--is-active',
                isNavbarSliding && 'navbar__link--is-disabled',
              ]}
              title={section.name}
              disabled={isNavbarSliding}
              onclick={(event) => handleClickLink(event, i)}
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
    z-index: 9999;
    position: sticky;
    top: 0;
    inset-inline: 0;
    background-color: var(--color-white-pure);
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

  .navbar__container {
    min-height: 48px;
    display: flex;
    flex-direction: column;
  }

  .navbar__toggle {
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding: 0 16px;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: var(--font-size-paragraph);
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.25s;
  }

  .navbar__toggle:is(:hover, :focus-visible) {
    background-color: rgba(var(--color-white-alt-1-rgb), 0.5);
  }

  .navbar__toggle-text {
    flex-grow: 1;
    align-self: stretch;
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: var(--font-family-pixel);
    text-decoration: underline 2px dotted transparent;
    transition: text-decoration 0.25s;
  }

  .navbar__toggle:focus-visible .navbar__toggle-text {
    text-decoration-color: var(--color-black-pure);
  }

  .navbar__toggle-text-section-wrapper {
    overflow: hidden;
    flex-grow: 1;
    align-self: stretch;
    display: flex;
    flex-direction: column;
  }

  .navbar__toggle-text-section {
    flex: 1 0 auto;
    height: 48px;
    display: flex;
    align-items: center;
    text-align: left;
  }

  .navbar__toggle-chevron {
    font-size: var(--font-size-small);
    transition: transform 0.25s;
  }

  .navbar--is-open .navbar__toggle-chevron {
    transform: rotate(180deg);
  }

  .navbar__list {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    list-style: none;
  }

  @media (min-width: 576px) {
    .navbar__list {
      flex-direction: row;
      justify-content: center;
    }
  }

  .navbar__link {
    min-height: 48px;
    display: flex;
    align-items: center;
    padding: 8px 20px;
    border: none;
    border-top: 1px solid var(--color-white-alt-1);
    outline: none;
    font-size: var(--font-size-semi-small);
    color: var(--color-black-pure);
    text-decoration: underline 2px dotted transparent;
    text-decoration-skip-ink: none;
    transition:
      padding 0.25s,
      background 0.25s,
      font-weight 0.25s,
      color 0.25s,
      text-decoration 0.25s;
  }

  @media (min-width: 576px) {
    .navbar__link {
      position: relative;
      justify-content: center;
      border: none;
      font-family: var(--font-family-pixel);
      font-size: var(--font-size-paragraph);
      text-underline-offset: 4px;
    }

    .navbar__link::after {
      content: '';
      position: absolute;
      top: 0;
      inset-inline: 0;
      height: 4px;
      transition: background 0.25s;
    }
  }

  @media (max-width: 575px) {
    .navbar__list-item:first-child .navbar__link {
      border-width: 2px;
      border-color: rgba(var(--color-white-alt-1-rgb), 0.75);
    }
  }

  .navbar__link:is(:hover, :focus-visible) {
    padding-left: 24px;
    background-color: rgba(var(--color-white-alt-1-rgb), 0.5);
  }

  @media (min-width: 576px) {
    .navbar__link:is(:hover, :focus-visible) {
      padding-left: 20px;
    }
  }

  .navbar__link:focus-visible {
    text-decoration-color: var(--color-black-pure);
  }

  .navbar__link--is-active {
    font-weight: bold;
    color: var(--color-primary-main);
  }

  @media (min-width: 576px) {
    .navbar__link--is-active::after {
      background-color: var(--color-primary-main);
    }
  }

  .navbar__link--is-active:focus-visible {
    text-decoration-color: var(--color-primary-main);
  }

  .navbar__link--is-disabled {
    cursor: not-allowed;
  }
</style>
