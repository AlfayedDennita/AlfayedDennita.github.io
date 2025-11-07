<script>
  import Button from '$lib/components/ui/Button.svelte';

  const { headerOffsetHeight = 0 } = $props();

  let offsetHeight = $state();
  let windowInnerWidth = $state();
  let welcomeBoxOffsetHeight = $state();

  const cloudsSpeed = $derived(`${windowInnerWidth / 5}s`);
  const birdTopSpeed = $derived(`${windowInnerWidth / 40}s`);
  const birdBottomSpeed = $derived(`${windowInnerWidth / 50}s`);

  export function getOffsetHeight() {
    return offsetHeight;
  }
</script>

<svelte:window bind:innerWidth={windowInnerWidth} />

<section
  class="jumbotron"
  style:min-height={`${welcomeBoxOffsetHeight}px`}
  style:animation-duration={birdTopSpeed}
  style:--header-offset-height={`${headerOffsetHeight}px`}
  style:--jumbotron-offset-height={`${offsetHeight}px`}
  aria-labelledby="jumbotron-title"
  bind:offsetHeight
>
  <div
    class="jumbotron__welcome-box"
    bind:offsetHeight={welcomeBoxOffsetHeight}
  >
    <div class="jumbotron__logo">
      <img
        class="jumbotron__logo-image"
        src="/images/fayden-logo.svg"
        alt="Fayden Logo"
      />
    </div>
    <div class="jumbotron__greeting">
      <h2 class="jumbotron__title" id="jumbotron-title">
        <span class="jumbotron__title-welcome">Welcome to</span>
        <span class="jumbotron__title-fayden-world">
          <span class="jumbotron__title-fayden">Fayden</span>
          <span class="jumbotron__title-world">World</span>
        </span>
      </h2>
      <p class="jumbotron__subtitle">
        A place where a
        <i class="hn hn-sun-solid jumbotron__subtitle-icon"></i>
        wanderer belongs.
      </p>
    </div>
    <Button
      class="jumbotron__cta"
      href="/#about"
      theme="secondary"
      title="Start Exploring"
    >
      Start Exploring
      <i class="hn hn-arrow-down-solid jumbotron__cta-icon"></i>
    </Button>
  </div>

  <div
    class="jumbotron__cloud-top"
    aria-hidden="true"
    style:animation-duration={cloudsSpeed}
  ></div>
  <div
    class="jumbotron__bird-bottom"
    aria-hidden="true"
    style:animation-duration={birdBottomSpeed}
  ></div>
  <div
    class="jumbotron__cloud-bottom"
    aria-hidden="true"
    style:animation-duration={cloudsSpeed}
  ></div>
</section>

<style>
  .jumbotron {
    --bird-top-size: 40px;

    position: relative;
    width: 100%;
    height: 100dvh;
    max-height: 1080px;
    display: flex;
    justify-content: center;
    align-items: center;
    background:
      url('$lib/assets/jumbotron/objects/bird-top.gif') no-repeat,
      url('$lib/assets/jumbotron/backgrounds/2.webp') no-repeat,
      url('$lib/assets/jumbotron/backgrounds/1.webp') repeat-x;
    background-position-x: calc(var(--bird-top-size) * -1), center, center;
    background-position-y: 144px, 0, 0;
    background-size:
      var(--bird-top-size) var(--bird-top-size),
      auto 100%,
      auto 100%;
    animation: bird-top infinite linear;
  }

  @keyframes bird-top {
    to {
      background-position-x: calc(100% + var(--bird-top-size)), center, center;
    }
  }

  .jumbotron__cloud-top {
    position: absolute;
    inset: 0;
    background:
      url('$lib/assets/jumbotron/backgrounds/4.webp') repeat-x,
      url('$lib/assets/jumbotron/backgrounds/3.webp') repeat-x;
    background-position-x: 0, 0;
    background-size: auto 100%;
    animation: cloud-top infinite linear;
  }

  @keyframes cloud-top {
    to {
      background-position-x:
        calc(576px * calc(var(--jumbotron-offset-height) / 324px)),
        calc(576px * calc(var(--jumbotron-offset-height) / 324px) * -1);
    }
  }

  .jumbotron__bird-bottom {
    --bird-bottom-size: 40px;

    position: absolute;
    inset: 0;
    background: url('$lib/assets/jumbotron/objects/bird-bottom.gif') no-repeat;
    background-position-x: calc(100% + var(--bird-bottom-size));
    background-position-y: calc(100% - 64px);
    background-size: var(--bird-bottom-size) var(--bird-bottom-size);
    animation: bird-bottom infinite linear;
  }

  @keyframes bird-bottom {
    to {
      background-position-x: calc(var(--bird-bottom-size) * -1);
    }
  }

  .jumbotron__cloud-bottom {
    position: absolute;
    inset: 0;
    background: url('$lib/assets/jumbotron/backgrounds/5.webp') repeat-x;
    background-position-x: 0;
    background-size: auto 100%;
    animation: cloud-bottom infinite linear;
  }

  @keyframes cloud-bottom {
    to {
      background-position-x: calc(
        576px * calc(var(--jumbotron-offset-height) / 324px) * -1
      );
    }
  }

  .jumbotron__welcome-box {
    z-index: 1;
    display: grid;
    grid-template-areas:
      'logo'
      'greeting'
      'cta';
    gap: 8px;
    place-items: center;
    padding: calc(var(--header-offset-height) + 64px) 16px 128px;
    text-align: center;
  }

  @media (min-width: 768px) {
    .jumbotron__welcome-box {
      grid-template-areas:
        'logo greeting'
        'logo cta';
      row-gap: 24px;
      column-gap: 48px;
      place-items: start;
      padding-block: 64px;
    }
  }

  @media (min-width: 1400px) {
    .jumbotron__welcome-box {
      column-gap: 56px;
    }
  }

  .jumbotron__logo {
    grid-area: logo;
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: url('$lib/assets/jumbotron/objects/logo-badge.svg') no-repeat;
    background-size: contain;
  }

  @media (min-width: 768px) {
    .jumbotron__logo {
      align-self: center;
      margin: 0;
    }
  }

  .jumbotron__logo-image {
    height: 160px;
    animation: logo-image 1s infinite alternate;
  }

  @keyframes logo-image {
    to {
      transform: scale(1.025);
    }
  }

  .jumbotron__greeting {
    --text-stroke-width: 2px;

    grid-area: greeting;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
    text-shadow:
      calc(var(--text-stroke-width) * -1) calc(var(--text-stroke-width) * -1) 0
        var(--color-white-pure),
      var(--text-stroke-width) calc(var(--text-stroke-width) * -1) 0
        var(--color-white-pure),
      calc(var(--text-stroke-width) * -1) var(--text-stroke-width) 0
        var(--color-white-pure),
      var(--text-stroke-width) var(--text-stroke-width) 0
        var(--color-white-pure);
  }

  @media (min-width: 768px) {
    .jumbotron__greeting {
      margin: 0;
      align-items: flex-start;
      text-align: left;
    }
  }

  .jumbotron__title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    font-family: var(--font-family-pixel);
  }

  @media (min-width: 768px) {
    .jumbotron__title {
      align-items: flex-start;
      gap: 4px;
    }
  }

  .jumbotron__title-welcome {
    font-size: var(--font-size-heading-3);
    line-height: 1;
  }

  .jumbotron__title-fayden-world {
    --text-stroke-width: 4px;

    font-size: var(--font-size-heading-1);
    line-height: 1;
    text-transform: uppercase;
  }

  .jumbotron__title-fayden {
    color: var(--color-primary-main);
  }

  .jumbotron__title-world {
    color: var(--color-secondary-main);
  }

  .jumbotron__subtitle-icon {
    line-height: 1.5;
    vertical-align: middle;
    color: var(--color-secondary-main);
  }

  .jumbotron :global(.jumbotron__cta) {
    grid-area: cta;
  }

  .jumbotron__cta-icon {
    transform: translateY(-2px);
    animation: cta-icon 1s infinite alternate ease-in;
  }

  @keyframes cta-icon {
    to {
      transform: translateY(2px);
    }
  }
</style>
