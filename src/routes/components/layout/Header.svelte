<script>
  import { page } from '$app/state';
  import Button from '$lib/components/ui/Button.svelte';

  let offsetHeight = $state();
  let isBGMPaused = $state(true);

  export function getOffsetHeight() {
    return offsetHeight;
  }
</script>

<header class="header" bind:offsetHeight>
  <a class="title" href="/" title="Fayden World">
    <svelte:element
      this={page.route.id === '/' ? 'h1' : 'h2'}
      class="title__text"
    >
      <span class="title__text-left">Fayden</span>
      <span class="title__text-right">World</span>
    </svelte:element>
  </a>

  <div class="bgm header__bgm">
    <audio
      src="/audios/hello-planet.mp3"
      volume={0.5}
      bind:paused={isBGMPaused}
      loop
    ></audio>
    <div class="bgm__info">
      <p class="bgm__info-title">
        <i class="hn hn-music-solid bgm__info-title-icon"></i>
        BGM is {isBGMPaused ? 'Paused' : 'Playing'}
      </p>
      <p class="bgm__info-song">
        <b>*Hello, Planet.</b> by
        <a
          class="bgm__info-artist"
          href="https://sasakure.uk.com/"
          target="_blank"
          rel="external"
          title="sasakure.UK"
        >
          sasakure.UK
        </a>
      </p>
    </div>
    <Button
      theme="secondary"
      square
      title={isBGMPaused ? 'Play BGM' : 'Pause BGM'}
      onclick={() => (isBGMPaused = !isBGMPaused)}
    >
      {#if isBGMPaused}
        <i class="hn hn-play-solid"></i>
      {:else}
        <i class="hn hn-pause-solid"></i>
      {/if}
    </Button>
  </div>
</header>

<style>
  .header {
    z-index: var(--z-index-topmost);
    position: absolute;
    top: 0;
    inset-inline: 0;
    width: 100%;
    height: 96px;
    max-width: var(--breakpoint-xxl);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding-inline: 16px;
  }

  @media (max-width: 256px) {
    .header {
      justify-content: center;
    }
  }

  @media (min-width: 768px) {
    .header {
      height: 112px;
      padding-inline: 24px;
    }
  }

  @media (min-width: 992px) {
    .header {
      height: 128px;
      padding-inline: 32px;
    }
  }

  .title {
    min-height: 48px;
    display: flex;
    gap: 8px;
    border-radius: 4px;
    outline: 2px solid transparent;
    outline-offset: 2px;
    text-decoration: none;
    transition:
      gap 0.25s,
      padding-left 0.25s,
      background-color 0.25s,
      outline-color 0.25s;
  }

  .title:is(:hover, :focus-visible) {
    gap: 12px;
    padding-left: 12px;
    background-color: rgba(var(--color-secondary-main-rgb), 0.1);
  }

  .title:focus-visible {
    outline-color: var(--color-secondary-main);
  }

  .title__text {
    display: contents;
    font-family: var(--font-family-pixel);
    font-size: var(--font-size-heading-5);
    color: var(--color-primary-main);
  }

  @media (min-width: 576px) {
    .title__text {
      font-size: var(--font-size-heading-4);
    }
  }

  .title__text-left {
    display: flex;
    align-items: center;
  }

  .title__text-right {
    display: flex;
    align-items: center;
    padding-inline: 8px;
    background-color: var(--color-secondary-main);
    border-radius: 4px;
    color: var(--color-white-pure);
  }

  .bgm {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  @media (max-width: 256px) {
    .header__bgm {
      display: none;
    }
  }

  .bgm__info {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
    text-align: right;
  }

  @media (max-width: 320px) {
    .header__bgm .bgm__info {
      display: none;
    }
  }

  .bgm__info-title {
    font-family: var(--font-family-pixel);
    font-size: var(--font-size-semi-small);
    text-transform: uppercase;
  }

  @media (min-width: 576px) {
    .bgm__info-title {
      font-size: var(--font-size-paragraph);
    }
  }

  .bgm__info-title-icon {
    font-size: var(--font-size-very-small);
    line-height: 1.8;
    vertical-align: middle;
  }

  @media (min-width: 576px) {
    .bgm__info-title-icon {
      font-size: var(--font-size-small);
      line-height: 1.7;
    }
  }

  .bgm__info-song {
    font-size: var(--font-size-small);
  }

  .bgm__info-artist {
    border-radius: 2px;
    outline: 2px solid transparent;
    text-decoration-color: transparent;
    text-decoration-skip-ink: none;
    color: var(--color-black-pure);
    transition:
      outline-color 0.25s,
      text-decoration-color 0.25s;
  }

  .bgm__info-artist:is(:hover, :focus-visible) {
    text-decoration-color: var(--color-black-pure);
  }

  .bgm__info-artist:focus-visible {
    outline-color: var(--color-secondary-main);
  }
</style>
