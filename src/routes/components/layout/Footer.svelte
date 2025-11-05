<script>
  let offsetHeight = $state();

  const firstBuildYear = 2025;
  const currentYear = new Date().getFullYear();
  const copyrightYear =
    currentYear === firstBuildYear
      ? currentYear
      : `${firstBuildYear}\u2013${currentYear}`;

  let windowInnerWidth = $state();

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
    background:
      url('$lib/assets/footer/objects/sheep.gif') no-repeat,
      url('$lib/assets/footer/objects/lamb.gif') no-repeat,
      url('$lib/assets/footer/objects/walking-boy.gif') no-repeat,
      url('$lib/assets/footer/objects/walking-girl.gif') no-repeat,
      url('$lib/assets/footer/backgrounds/field.png') repeat-x;
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
    max-width: 1200px;
    margin-inline: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 128px 16px 40px;
  }

  .footer__copyright {
    font-family: var(--font-family-pixel);
    color: rgba(var(--color-white-pure-rgb), 0.75);
    text-align: center;
  }
</style>
