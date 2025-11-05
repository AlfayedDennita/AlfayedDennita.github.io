<script>
  import Button from '$lib/components/ui/Button.svelte';

  let { jumbotronOffsetHeight = $bindable() } = $props();

  let windowInnerWidth = $state();
  let welcomeBoxOffsetHeight = $state();

  const cloudsSpeed = $derived(`${windowInnerWidth / 5}s`);
  const birdTopSpeed = $derived(`${windowInnerWidth / 40}s`);
  const birdBottomSpeed = $derived(`${windowInnerWidth / 50}s`);
</script>

<svelte:window bind:innerWidth={windowInnerWidth} />

<section
  class="jumbotron"
  style:min-height={`${welcomeBoxOffsetHeight}px`}
  style:animation-duration={birdTopSpeed}
  style:--jumbotron-offset-height={`${jumbotronOffsetHeight}px`}
  bind:offsetHeight={jumbotronOffsetHeight}
>
  <div
    class="jumbotron__welcome-box"
    bind:offsetHeight={welcomeBoxOffsetHeight}
  >
    <div class="jumbotron__badge">
      <img
        src="/images/fayden-logo.png"
        class="jumbotron__logo"
        alt="Fayden Logo"
      />
    </div>
    <div class="jumbotron__greeting">
      <div class="jumbotron__greeting-text">
        <p class="jumbotron__greeting-welcome">Welcome to</p>
        <p class="jumbotron__greeting-fayden-world">
          <span class="jumbotron__greeting-fayden">Fayden</span>
          <span class="jumbotron__greeting-world">World</span>
        </p>
        <p class="jumbotron__greeting-message">
          A place where a
          <i class="jumbotron__greeting-message-icon hn hn-sun-solid"></i>
          wanderer belongs.
        </p>
      </div>
      <Button
        href="#about"
        theme="secondary"
        class="jumbotron__greeting-cta"
        title="Start Exploring"
      >
        Start Exploring
        <i class="jumbotron__greeting-cta-icon hn hn-arrow-down-solid"></i>
      </Button>
    </div>
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
      url('$lib/assets/jumbotron/backgrounds/2.png') no-repeat,
      url('$lib/assets/jumbotron/backgrounds/1.png') repeat-x;
    background-position-y: 144px, 0, 0;
    background-size:
      var(--bird-top-size) var(--bird-top-size),
      auto 100%,
      auto 100%;
    animation: bird-top infinite linear;
  }

  @keyframes bird-top {
    from {
      background-position-x: calc(var(--bird-top-size) * -1), center, center;
    }

    to {
      background-position-x: calc(100% + var(--bird-top-size)), center, center;
    }
  }

  .jumbotron__cloud-top {
    position: absolute;
    inset: 0;
    background:
      url('$lib/assets/jumbotron/backgrounds/4.png') repeat-x,
      url('$lib/assets/jumbotron/backgrounds/3.png') repeat-x;
    background-size: auto 100%;
    animation: cloud-top infinite linear;
  }

  @keyframes cloud-top {
    from {
      background-position-x: 0, 0;
    }

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
    background-position-y: calc(100% - 64px);
    background-size: var(--bird-bottom-size) var(--bird-bottom-size);
    animation: bird-bottom infinite linear;
  }

  @keyframes bird-bottom {
    from {
      background-position-x: calc(100% + var(--bird-bottom-size));
    }

    to {
      background-position-x: calc(var(--bird-bottom-size) * -1);
    }
  }

  .jumbotron__cloud-bottom {
    position: absolute;
    inset: 0;
    background: url('$lib/assets/jumbotron/backgrounds/5.png') repeat-x;
    background-size: auto 100%;
    animation: cloud-bottom infinite linear;
  }

  @keyframes cloud-bottom {
    from {
      background-position-x: 0;
    }

    to {
      background-position-x: calc(
        576px * calc(var(--jumbotron-offset-height) / 324px) * -1
      );
    }
  }

  .jumbotron__welcome-box {
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
    padding: 128px 16px;
  }

  @media (min-width: 992px) {
    .jumbotron__welcome-box {
      flex-direction: row;
      gap: 64px;
      padding-block: 64px;
    }
  }

  .jumbotron__badge {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: url('$lib/assets/jumbotron/objects/logo-badge.png') no-repeat;
    background-size: contain;
  }

  .jumbotron__logo {
    height: 160px;
    animation: logo 1s infinite alternate;
  }

  @keyframes logo {
    to {
      transform: scale(1.025);
    }
  }

  .jumbotron__greeting {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  @media (min-width: 992px) {
    .jumbotron__greeting {
      align-items: flex-start;
    }
  }

  .jumbotron__greeting-text {
    --text-stroke-width: 2px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
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

  @media (min-width: 992px) {
    .jumbotron__greeting-text {
      align-items: flex-start;
      text-align: left;
    }
  }

  .jumbotron__greeting-welcome {
    font-family: var(--font-family-pixel);
    font-size: var(--font-size-heading-3);
    line-height: 1;
  }

  .jumbotron__greeting-fayden-world {
    --text-stroke-width: 4px;

    font-family: var(--font-family-pixel);
    font-size: var(--font-size-heading-1);
    line-height: 1;
    text-transform: uppercase;
  }

  .jumbotron__greeting-fayden {
    color: var(--color-primary-main);
  }

  .jumbotron__greeting-world {
    color: var(--color-secondary-main);
  }

  .jumbotron__greeting-message {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .jumbotron__greeting-message-icon {
    color: var(--color-secondary-main);
  }

  .jumbotron__greeting-cta-icon {
    transform: translateY(-2px);
    animation: cta-icon 1s infinite alternate ease-in;
  }

  @keyframes cta-icon {
    to {
      transform: translateY(2px);
    }
  }
</style>
