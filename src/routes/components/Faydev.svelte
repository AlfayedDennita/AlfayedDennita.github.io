<script>
  import { offsetTop } from '$lib/actions/offsetTop';
  import Button from '$lib/components/Button.svelte';
  import ProjectCards from '$lib/components/ProjectCards.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';

  const { projects, jumbotronOffsetHeight } = $props();

  let elementOffsetTop = $state({
    value: undefined,
    update: () => undefined,
  });

  export function getOffsetTop() {
    return elementOffsetTop;
  }

  let windowInnerWidth = $state();

  const birdSpeed = $derived(`${windowInnerWidth / 40}s`);
  const cloudSpeed = $derived(`${windowInnerWidth / 5}s`);
</script>

<svelte:window bind:innerWidth={windowInnerWidth} />

<section
  use:offsetTop={{
    value: (newValue) => (elementOffsetTop.value = newValue),
    update: (newUpdate) => (elementOffsetTop.update = newUpdate),
  }}
  class="faydev"
  id="projects"
  style:animation-duration={birdSpeed}
  style:--jumbotron-offset-height={`${jumbotronOffsetHeight}px`}
  style:--cloud-animation-duration={cloudSpeed}
>
  <div class="faydev__container">
    <div class="faydev__header-wrapper">
      {#each { length: 2 }, i}
        <svelte:element
          this={i === 0 ? 'header' : 'div'}
          aria-hidden={i === 1}
          class={['faydev__header', i === 0 && 'faydev__header--is-overlay']}
        >
          <div class="faydev__title">
            <i class="faydev__title-icon hn hn-code-solid"></i>
            <svelte:element
              this={i === 0 ? 'h2' : 'p'}
              class="faydev__title-text"
            >
              <span class="faydev__title-text-blue">fay</span><span
                class="faydev__title-text-yellow">Dev</span
              >
            </svelte:element>
          </div>
          <p class="faydev__subtitle">
            Fayden's Software Development Workbench
          </p>
        </svelte:element>
      {/each}
    </div>

    <ProjectCards>
      {#each projects as project (project.id)}
        <ProjectCard
          slug={project.slug}
          title={project.title}
          image={project.images[0]}
          typeIcon={project.type.icon}
          typeName={project.type.name}
          description={project.description}
        />
      {/each}
    </ProjectCards>

    <Button
      tag="a"
      href="/projects"
      theme="secondary"
      style="align-self: center"
      title="Explore More"
    >
      Explore More
      <i class="hn hn-arrow-right-solid"></i>
    </Button>
  </div>
</section>

<style>
  .faydev {
    --bird-size: 60px;

    position: relative;
    background:
      url('$lib/assets/faydev/objects/bird.gif') no-repeat,
      linear-gradient(to bottom, #e3faff, transparent);
    background-position-x: calc(100% + var(--bird-size)), 0;
    background-position-y: 40px, 0;
    background-size:
      var(--bird-size) var(--bird-size),
      auto auto;
    animation: bird infinite linear;
  }

  @keyframes bird {
    to {
      background-position-x: calc((var(--bird-size) + 1024px) * -1), 0;
    }
  }

  .faydev::after {
    content: '';
    position: absolute;
    inset: 0;
    background: url('$lib/assets/faydev/backgrounds/cloud.png') repeat-x;
    background-size: auto var(--jumbotron-offset-height);
    pointer-events: none;
    animation: cloud var(--cloud-animation-duration) infinite linear;
  }

  @keyframes cloud {
    to {
      background-position-x: calc(
        576px * calc(var(--jumbotron-offset-height) / 324px) * -1
      );
    }
  }

  .faydev__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 64px;
    padding: 112px 20px;
  }

  .faydev__header-wrapper {
    position: relative;
  }

  .faydev__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
    user-select: none;
  }

  .faydev__header--is-overlay {
    z-index: 1;
    position: absolute;
    top: 0;
    width: 100%;
    user-select: auto;
  }

  .faydev__title {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .faydev__title-icon {
    font-size: var(--font-size-heading-3);
  }

  .faydev__header--is-overlay .faydev__title-icon {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M12 0h18v6h6v6h6v18h-6v6h-6v6H12v-6H6v-6H0V12h6V6h6V0zm12 6h-6v6h-6v6H6v6h6v6h6v6h6v-6h6v-6h6v-6h-6v-6h-6V6zm-6 12h6v6h-6v-6zm24 24h6v6h-6v-6z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
    background-size: 4px;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  .faydev__title-text {
    font-family: var(--font-family-pixel);
    font-size: var(--font-size-heading-3);
    font-weight: bold;
  }

  .faydev__title-text-blue {
    color: var(--color-primary-main);
  }

  .faydev__header--is-overlay .faydev__title-text-blue {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='%23268fd9' fill-opacity='1'%3E%3Cpath d='M12 0h18v6h6v6h6v18h-6v6h-6v6H12v-6H6v-6H0V12h6V6h6V0zm12 6h-6v6h-6v6H6v6h6v6h6v6h6v-6h6v-6h6v-6h-6v-6h-6V6zm-6 12h6v6h-6v-6zm24 24h6v6h-6v-6z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
    background-size: 4px;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  .faydev__title-text-yellow {
    color: var(--color-secondary-main);
  }

  .faydev__header--is-overlay .faydev__title-text-yellow {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='%23e5c31a' fill-opacity='1'%3E%3Cpath d='M12 0h18v6h6v6h6v18h-6v6h-6v6H12v-6H6v-6H0V12h6V6h6V0zm12 6h-6v6h-6v6H6v6h6v6h6v6h6v-6h6v-6h6v-6h-6v-6h-6V6zm-6 12h6v6h-6v-6zm24 24h6v6h-6v-6z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
    background-size: 4px;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  .faydev__subtitle {
    color: var(--color-black-alt-1);
  }

  .faydev__header--is-overlay .faydev__subtitle {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M12 0h18v6h6v6h6v18h-6v6h-6v6H12v-6H6v-6H0V12h6V6h6V0zm12 6h-6v6h-6v6H6v6h6v6h6v6h6v-6h6v-6h6v-6h-6v-6h-6V6zm-6 12h6v6h-6v-6zm24 24h6v6h-6v-6z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
    background-size: 4px;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
</style>
