<script>
  import { trackOffsetTop } from '$lib/attachments/trackOffsetTop';
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
    ...props
  } = $props();

  let windowInnerWidth = $state();

  let offsetTop = $state({
    value: undefined,
    update: () => undefined,
  });

  let resolvedProjects = $state([]);

  const birdSpeed = $derived(`${windowInnerWidth / 40}s`);
  const cloudSpeed = $derived(`${windowInnerWidth / 5}s`);

  $effect(async () => {
    resolvedProjects = await projects;
  });

  export function getOffsetTop() {
    return offsetTop.value;
  }

  export function getUpdateOffsetTop() {
    return offsetTop.update;
  }
</script>

<svelte:window bind:innerWidth={windowInnerWidth} />

<section
  class={['faydev', className]}
  style:--jumbotron-offset-height={`${jumbotronOffsetHeight}px`}
  style:--navbar-offset-height={`${navbarOffsetHeight}px`}
  style:--cloud-animation-duration={cloudSpeed}
  style:--to-background-position-x={`${((576 * jumbotronOffsetHeight) / 324) * -1}px`}
  style:animation-duration={birdSpeed}
  id="projects"
  aria-labelledby="projects-title"
  {@attach trackOffsetTop(
    (newOffsetTop) => (offsetTop.value = newOffsetTop),
    (update) => (offsetTop.update = update)
  )}
  {...props}
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
      <ProjectCards class="faydev__cards">
        {#each { length: 6 }}
          <ProjectCard skeleton />
        {/each}
      </ProjectCards>
    {:then}
      {#if resolvedProjects}
        <ProjectCards class="faydev__cards">
          {#each resolvedProjects as project (project.slug)}
            <ProjectCard
              slug={project.slug}
              title={project.title}
              typeIcon={project.type.icon}
              typeName={project.type.name}
              isoCreatedAt={project.createdAt}
              description={project.description}
              image={project.images[0]}
            />
          {/each}
        </ProjectCards>
      {:else}
        <ErrorLoad class="faydev__cards" message="No projects to view." />
      {/if}
    {:catch}
      <ErrorLoad class="faydev__cards" message="Failed to load projects." />
    {/await}

    <Button
      class="faydev__cta"
      href="/projects/"
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
    background: url('$lib/assets/faydev/backgrounds/cloud.webp') repeat-x;
    background-size: auto var(--jumbotron-offset-height);
    pointer-events: none;
    animation: cloud var(--cloud-animation-duration) infinite linear;
  }

  @keyframes cloud {
    to {
      background-position-x: var(--to-background-position-x);
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

  .faydev :global(.faydev__cards) {
    z-index: 1;
  }

  .faydev :global(.faydev__cta) {
    align-self: center;
  }
</style>
