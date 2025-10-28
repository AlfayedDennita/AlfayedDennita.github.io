<script>
  import Button from '$lib/components/Button.svelte';

  let isBGMPaused = $state(true);
</script>

<header class="header">
  <a href="/" class="title" title="Fayden World">
    <h1 class="title__text">
      <span class="title__left">Fayden</span>
      <span class="title__right">World</span>
    </h1>
  </a>

  <div class="bgm">
    <audio src="/audios/hello-planet.mp3" bind:paused={isBGMPaused} loop
    ></audio>
    <div class="bgm__info">
      <p class="bgm__info-title">
        <i class="bgm__info-icon hn hn-music-solid"></i>
        BGM is {isBGMPaused ? 'Paused' : 'Playing'}
      </p>
      <p class="bgm__info-song">
        <b>*Hello, Planet.</b> by
        <a
          href="https://sasakure.uk.com/"
          class="bgm__info-artist"
          target="_blank"
          rel="external"
          title="sasakure.UK"
        >
          sasakure.UK
        </a>
      </p>
    </div>
    <Button
      type="button"
      theme="secondary"
      title={isBGMPaused ? 'Play BGM' : 'Pause BGM'}
      isSquare
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
    z-index: 9999;
    position: absolute;
    top: 0;
    inset-inline: 0;
    width: 100%;
    height: 96px;
    max-width: 1400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin: 0 auto;
    padding-inline: 16px;
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
      padding 0.25s,
      background 0.25s,
      outline 0.25s;
  }

  .title:is(:hover, :focus-visible) {
    gap: 12px;
    padding-left: 12px;
    background-color: rgba(var(--color-secondary-main-rgb), 0.15);
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

  .title__left {
    display: flex;
    align-items: center;
  }

  .title__right {
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

  .bgm__info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    line-height: 1.2;
    text-align: right;
  }

  .bgm__info-title {
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: var(--font-family-pixel);
    font-size: var(--font-size-semi-small);
    text-transform: uppercase;
  }

  @media (min-width: 576px) {
    .bgm__info-title {
      font-size: var(--font-size-paragraph);
    }
  }

  .bgm__info-icon {
    font-size: var(--font-size-very-small);
  }

  @media (min-width: 576px) {
    .bgm__info-icon {
      font-size: var(--font-size-small);
    }
  }

  .bgm__info-song {
    font-size: var(--font-size-small);
  }

  .bgm__info-artist {
    border-radius: 2px;
    outline: 2px solid transparent;
    color: var(--color-black-pure);
    text-decoration-color: transparent;
    transition:
      outline 0.25s,
      text-decoration 0.25s;
  }

  .bgm__info-artist:is(:hover, :focus-visible) {
    text-decoration-color: var(--color-black-pure);
  }

  .bgm__info-artist:focus-visible {
    outline-color: var(--color-secondary-main);
  }
</style>
