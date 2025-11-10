<script>
  import { offsetTop } from '$lib/actions/offsetTop';
  import Button from '$lib/components/ui/Button.svelte';
  import SectionHeader from '$lib/components/SectionHeader.svelte';
  import ProjectCards from '$lib/components/ProjectCards.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import ErrorLoad from '$lib/components/ErrorLoad.svelte';

  const {
    class: className,
    projects,
    jumbotronOffsetHeight,
    navbarOffsetHeight = 0,
  } = $props();

  let windowInnerWidth = $state();

  let elementOffsetTop = $state({
    value: undefined,
    update: () => undefined,
  });

  const birdSpeed = $derived(`${windowInnerWidth / 40}s`);
  const cloudSpeed = $derived(`${windowInnerWidth / 5}s`);

  export function getOffsetTop() {
    return elementOffsetTop;
  }
</script>

<svelte:window bind:innerWidth={windowInnerWidth} />

<section
  class={['faydev', className]}
  style:animation-duration={birdSpeed}
  style:--jumbotron-offset-height={`${jumbotronOffsetHeight}px`}
  style:--navbar-offset-height={`${navbarOffsetHeight}px`}
  style:--cloud-animation-duration={cloudSpeed}
  id="projects"
  aria-labelledby="projects-title"
  use:offsetTop={{
    update: (newValue) => (elementOffsetTop.value = newValue),
    getUpdateFn: (updateFn) => (elementOffsetTop.update = updateFn),
  }}
>
  <div class="faydev__inner">
    <SectionHeader
      sectionId="projects"
      shadow
      icon="code-solid"
      subtitle="Fayden's Software Development Workbench"
    >
      {#snippet titleLeft()}
        fay
      {/snippet}
      {#snippet titleRight()}
        Dev
      {/snippet}
    </SectionHeader>

    {#await projects}
      <ProjectCards>
        {#each { length: 6 }}
          <ProjectCard skeleton />
        {/each}
      </ProjectCards>
    {:then projects}
      {#if projects}
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
      {:else}
        <ErrorLoad message="No projects to view." />
      {/if}
    {:catch}
      <ErrorLoad message="Failed to load projects." />
    {/await}

    <Button
      class="faydev__cta"
      href="/projects"
      theme="secondary"
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
    scroll-margin-top: calc(var(--navbar-offset-height) - 1px);
    background:
      url('$lib/assets/faydev/objects/bird.gif') no-repeat,
      linear-gradient(to bottom, #e3faff, transparent);
    background-position-x: calc(100% + var(--bird-size)), 0;
    background-position-y: 40px, 0;
    background-size: var(--bird-size), auto;
    padding-inline: var(--screen-margin-dynamic);
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
        576px * (var(--jumbotron-offset-height) / 324px) * -1
      );
    }
  }

  .faydev__inner {
    margin: 0 auto;
    max-width: var(--breakpoint-xl);
    display: flex;
    flex-direction: column;
    gap: 64px;
    padding-block: 96px;
  }

  .faydev :global(.faydev__cta) {
    align-self: center;
  }
</style>
