<script>
  import { offsetTop } from '$lib/actions/offsetTop';

  const { class: className, navbarOffsetHeight = 0 } = $props();

  let elementOffsetTop = $state({
    value: undefined,
    update: () => undefined,
  });

  export function getOffsetTop() {
    return elementOffsetTop;
  }
</script>

<section
  class={['about', className]}
  style:--navbar-offset-height={`${navbarOffsetHeight}px`}
  id="about"
  aria-labelledby="about-title"
  use:offsetTop={{
    update: (newValue) => (elementOffsetTop.value = newValue),
    getUpdateFn: (updateFn) => (elementOffsetTop.update = updateFn),
  }}
>
  <div class="about__inner">
    <h2 class="title about__title" id="about-title">
      Meet the <i class="hn hn-sun-solid title__icon" aria-label="Sun"></i> Wanderer
    </h2>
    <div class="message about__message">
      <p>
        Hello, visitor! I'm
        <span class="message__blue">Fay</span><span class="message__yellow"
          >den</span
        >
        (<span class="message__blue">Alfayed</span>
        <span class="message__yellow">Dennita</span>). I love exploring the
        digital world, especially software development and art. I mostly work
        with code, but sometimes I play with canvas to sharpen my creative mind.
        You can browse through some amazing things that I've found and created
        on this page. Enjoy! Thanks for visiting.
      </p>
      <p class="message__writer">- <i>Fayden</i></p>
    </div>
    <div class="avatar about__avatar" aria-hidden="true">
      <div class="avatar__object" aria-hidden="true"></div>
    </div>
  </div>
</section>

<style>
  .about {
    scroll-margin-top: calc(var(--navbar-offset-height) - 1px);
  }

  @media (min-width: 1200px) {
    .about {
      padding-inline: var(--screen-margin-dynamic);
    }
  }

  .about__inner {
    margin-inline: auto;
    max-width: var(--breakpoint-xl);
    display: grid;
    grid-template-areas:
      'title'
      'message'
      'avatar';
    gap: 16px;
  }

  @media (min-width: 768px) {
    .about__inner {
      grid-template-areas:
        'title avatar'
        'message avatar';
      grid-template-columns: repeat(2, 1fr);
      align-items: stretch;
      column-gap: 32px;
      padding-left: var(--screen-margin-dynamic);
    }
  }

  @media (min-width: 992px) {
    .about__inner {
      column-gap: 96px;
    }
  }

  @media (min-width: 1200px) {
    .about__inner {
      column-gap: 112px;
      padding-left: 0;
    }
  }

  .about__inner > *:first-child {
    margin: 40px var(--screen-margin) 0;
  }

  .about__inner > *:nth-last-child(2) {
    margin: 0 var(--screen-margin) 40px;
  }

  @media (min-width: 576px) {
    .about__inner > *:first-child {
      margin-inline: var(--screen-margin-sm);
    }

    .about__inner > *:nth-last-child(2) {
      margin-inline: var(--screen-margin-sm);
    }
  }

  @media (min-width: 768px) {
    .about__inner > *:first-child {
      margin: 48px 0 0;
    }

    .about__inner > *:nth-last-child(2) {
      margin: 0 0 64px;
    }
  }

  .about__title {
    grid-area: title;
  }

  .title {
    font-family: var(--font-family-pixel);
    font-size: var(--font-size-heading-4);
  }

  @media (min-width: 992px) {
    .title {
      font-size: var(--font-size-heading-3);
    }
  }

  .title__icon {
    line-height: 1.4;
    vertical-align: middle;
    color: var(--color-secondary-main);
  }

  .about__message {
    grid-area: message;
  }

  .message {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .message__blue {
    font-weight: bold;
    color: var(--color-primary-main);
  }

  .message__yellow {
    font-weight: bold;
    color: var(--color-secondary-main);
  }

  .message__writer {
    color: var(--color-black-alt-2);
  }

  .about__avatar {
    grid-area: avatar;
  }

  .avatar {
    width: 100%;
    display: flex;
    align-items: flex-end;
    background: url('$lib/assets/about/backgrounds/avatar-pattern.svg');
  }

  .avatar__object {
    --avatar-height: 224px;

    flex-grow: 1;
    height: calc(var(--avatar-height) + 64px);
    background:
      url('$lib/assets/about/objects/slime.gif') no-repeat,
      url('$lib/assets/about/objects/avatar.webp') no-repeat;
    background-position-x: center;
    background-position-y: -20px, 100%;
    background-size: 192px, var(--avatar-height);
  }

  @media (min-width: 768px) {
    .avatar__object {
      --avatar-height: 256px;
    }
  }
</style>
