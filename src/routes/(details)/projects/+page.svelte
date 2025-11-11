<script>
  import { onMount } from 'svelte';
  import ProjectCards from '$lib/components/ProjectCards.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  import ErrorLoad from '$lib/components/ErrorLoad.svelte';

  const { data } = $props();

  let windowScrollY = $state();

  let projects = $state([]);
  let currentPage = $state(1);
  const totalProjects = $derived(projects.length);
  const projectsPerPage = 6;

  const visibleProjects = $derived.by(() => {
    if (!projects) {
      return [];
    }

    return projects.slice(
      projectsPerPage * (currentPage - 1),
      projectsPerPage * currentPage
    );
  });

  $effect(() => {
    currentPage;
    windowScrollY = 0;
  });

  onMount(async () => {
    projects = await data.projects;
  });
</script>

<svelte:window bind:scrollY={windowScrollY} />

<section class="projects" aria-labelledby="projects-title">
  <div class="projects__inner">
    <h2 class="projects__title" id="projects-title">All Projects</h2>

    {#await data.projects}
      <ProjectCards>
        {#each { length: projectsPerPage }}
          <ProjectCard skeleton />
        {/each}
      </ProjectCards>
    {:then}
      {#if visibleProjects}
        <ProjectCards>
          {#each visibleProjects as project (project.slug)}
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

    <Pagination
      bind:currentPage
      totalPages={Math.ceil(totalProjects / projectsPerPage)}
    />
  </div>
</section>

<style>
  .projects {
    padding-inline: var(--screen-margin-dynamic);
  }

  .projects__inner {
    margin-inline: auto;
    max-width: var(--breakpoint-xl);
    display: flex;
    flex-direction: column;
    gap: 64px;
    padding-block: 32px;
  }

  .projects__title {
    font-family: var(--font-family-pixel);
    font-size: var(--font-size-heading-2);
    text-align: center;
  }
</style>
