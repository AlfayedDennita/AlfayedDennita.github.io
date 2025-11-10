<script>
  let offsetHeight = $state();

  const { class: className } = $props();

  let windowInnerWidth = $state();

  const firstBuildYear = 2025;
  const currentYear = new Date().getFullYear();
  const copyrightYear =
    currentYear === firstBuildYear
      ? currentYear
      : `${firstBuildYear}\u2013${currentYear}`;

  const walkingKidsSpeed = $derived(`${windowInnerWidth / 20}s`);

  export function getOffsetHeight() {
    return offsetHeight;
  }
</script>

<svelte:window bind:innerWidth={windowInnerWidth} />

<footer
  class="footer"
  style:animation-duration={walkingKidsSpeed}
  bind:offsetHeight
>
  <div class="footer__container">
    <p class="footer__copyright">
      Copyright &copy; {copyrightYear} Alfayed Dennita
    </p>
  </div>
</footer>

<style>
  .footer {
    padding-inline: var(--screen-margin-dynamic);
    background:
      url('$lib/assets/footer/objects/sheep.gif') no-repeat,
      url('$lib/assets/footer/objects/lamb.gif') no-repeat,
      url('$lib/assets/footer/objects/walking-boy.gif') no-repeat,
      url('$lib/assets/footer/objects/walking-girl.gif') no-repeat,
      url('$lib/assets/footer/backgrounds/field.webp') repeat-x;
    background-size: 32px, 32px, 48px, 48px, auto;
    background-position:
      40% calc(100% - 52px),
      60% calc(100% - 52px),
      -160px calc(100% - 88px),
      -128px calc(100% - 88px),
      0 100%;
    animation: walking-kids infinite linear;
  }

  @keyframes walking-kids {
    to {
      background-position:
        40% calc(100% - 52px),
        60% calc(100% - 52px),
        calc(100% + 128px) calc(100% - 88px),
        calc(100% + 160px) calc(100% - 88px),
        0 100%;
    }
  }

  .footer__container {
    margin-inline: auto;
    max-width: var(--breakpoint-xl);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 128px 0 40px;
  }

  .footer__copyright {
    font-family: var(--font-family-pixel);
    text-align: center;
    color: rgba(var(--color-white-pure-rgb), 0.75);
  }
</style>
