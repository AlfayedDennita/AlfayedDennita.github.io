<section class="about" id="about">
  <div class="about__message">
    <h2 class="about__title">
      Meet the <i class="about__title-icon hn hn-sun-solid"></i> Wanderer
    </h2>
    <div class="about__message-text">
      <p>
        Hello, visitor! I'm
        <span class="about__message-fayden">
          <span class="about__message-blue">Fay</span><span
            class="about__message-yellow">den</span
          >
        </span>
        (<span class="about__message-blue">Alfayed</span>
        <span class="about__message-yellow">Dennita</span>). I love exploring
        the digital world, especially software development and art. I mostly
        work with code, but sometimes I play with canvas to sharpen my creative
        mind. You can browse through some amazing things that I've found and
        created on this page. Enjoy! Thanks for visiting.
      </p>
      <p class="about__message-writer">- <i>Fayden</i></p>
    </div>
  </div>

  <div class="about__avatar-container" aria-hidden="true">
    <div class="about__avatar" aria-hidden="true"></div>
  </div>
</section>

<style>
  .about {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  @media (min-width: 768px) {
    .about {
      flex-direction: row;
      align-items: stretch;
      gap: 32px;
      padding-left: 24px;
    }
  }

  @media (min-width: 992px) {
    .about {
      gap: 96px;
      padding-left: 32px;
    }
  }

  @media (min-width: 1200px) {
    .about {
      gap: 112px;
      padding-left: 48px;
    }
  }

  @media (min-width: 1400px) {
    .about {
      gap: 128px;
    }
  }

  .about__message {
    flex-grow: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 40px 24px 0;
  }

  @media (min-width: 768px) {
    .about__message {
      padding-block: 48px;
    }
  }

  .about__title {
    display: flex;
    gap: 12px;
    align-items: center;
    font-family: var(--font-family-pixel);
    font-size: var(--font-size-heading-4);
  }

  @media (min-width: 992px) {
    .about__title {
      font-size: var(--font-size-heading-3);
    }
  }

  .about__title-icon {
    color: var(--color-secondary-main);
  }

  .about__message-text {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .about__message-blue {
    font-weight: bold;
    color: var(--color-primary-main);
  }

  .about__message-yellow {
    font-weight: bold;
    color: var(--color-secondary-main);
  }

  .about__message-writer {
    color: var(--color-black-alt-2);
  }

  .about__avatar-container {
    flex-grow: 1;
    width: 100%;
    display: flex;
    align-items: flex-end;
    background: url('$lib/assets/about/backgrounds/avatar-pattern.svg');
  }

  .about__avatar {
    --avatar-height: 224px;

    flex-grow: 1;
    height: calc(var(--avatar-height) + 64px);
    background:
      url('$lib/assets/about/objects/slime.gif') no-repeat,
      url('$lib/assets/about/objects/avatar.png') no-repeat;
    background-position-x: center;
    background-position-y: -20px, 100%;
    background-size: 192px, var(--avatar-height);
  }
</style>
