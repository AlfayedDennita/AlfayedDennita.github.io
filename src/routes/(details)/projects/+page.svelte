<script>
  import { onMount, tick, untrack } from 'svelte';
  import { page } from '$app/state';
  import { replaceState } from '$app/navigation';
  import { setPageData } from '$lib/states/pageData.svelte';
  import ProjectCards from '$lib/components/ProjectCards.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  import ErrorLoad from '$lib/components/ErrorLoad.svelte';

  const { data } = $props();

  setPageData({
    title: 'All Projects',
    description:
      'All listed projects that Alfayed Dennita made or contributed. Mostly, the projects are about software development. All projects are well explained on their respective page.',
    additionalKeywords: ['projects', 'software development', 'applications'],
  });

  let windowScrollY = $state();

  let projects = $state([]);
  let currentPage = $state(null);
  const totalProjects = $derived(projects.length);
  const projectsPerPage = 6;
  const totalPages = $derived(Math.ceil(totalProjects / projectsPerPage));

  $effect(async () => {
    projects = await data.projects;

    untrack(() => {
      const pageParam = parseInt(page.url.searchParams.get('page'));

      if (pageParam <= totalPages) {
        currentPage = pageParam;
      } else {
        currentPage = 1;
      }
    });
  });

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
    if (currentPage !== null) {
      const newUrl = untrack(() => page.url);
      newUrl.searchParams.set('page', currentPage);
      replaceState(newUrl);

      windowScrollY = 0;
    }
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
              typeIcon={project.type.icon}
              typeName={project.type.name}
              isoCreatedAt={project.createdAt}
              description={project.description}
              image={project.images[0]}
            />
          {/each}
        </ProjectCards>
      {:else}
        <ErrorLoad message="No projects to view." />
      {/if}
    {:catch}
      <ErrorLoad message="Failed to load projects." />
    {/await}

    <Pagination bind:currentPage {totalPages} />
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
