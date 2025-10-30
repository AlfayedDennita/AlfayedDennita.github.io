<script>
  import Button from '$lib/components/Button.svelte';
  import ProjectCards from '$lib/components/ProjectCards.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';

  const { data } = $props();

  let currentPage = $state(1);
  const projectsPerPage = 6;
  const totalNeighbours = 2;

  const visibleProjects = $derived.by(() => {
    if (Error.isError(data.projects)) {
      return data.projects;
    } else {
      return data.projects.slice(
        projectsPerPage * (currentPage - 1),
        projectsPerPage * currentPage
      );
    }
  });

  const pages = $derived.by(() => {
    const totalProjects = data.projects.length;
    const maxPage = Math.ceil(totalProjects / projectsPerPage);

    let buttons = [];

    if (currentPage - totalNeighbours > 1) {
      buttons.push(1);
    }

    if (currentPage - totalNeighbours > 2) {
      buttons.push('...');
    }

    for (let page = currentPage - totalNeighbours; page < maxPage; page++) {
      if (
        page >= 1 &&
        currentPage - totalNeighbours <= page &&
        page <= currentPage + totalNeighbours
      ) {
        buttons.push(page);
      } else {
        continue;
      }
    }

    if (currentPage + totalNeighbours + 1 < maxPage) {
      buttons.push('...');
    }

    buttons.push(maxPage);

    return buttons;
  });
</script>

<section class="projects">
  <div class="projects__container">
    <h2 class="projects__title">All Projects</h2>
    <ProjectCards>
      {#if !Error.isError(visibleProjects)}
        {#each visibleProjects as project (project.id)}
          <ProjectCard
            slug={project.slug}
            title={project.title}
            image={project.images[0]}
            typeIcon={project.type.icon}
            typeName={project.type.name}
            description={project.description}
          />
        {/each}
      {/if}
    </ProjectCards>
    <ul class="projects__pagination">
      {#each pages as page}
        <li>
          {#if Number.isInteger(page)}
            <Button
              onclick={() => (currentPage = page)}
              theme={currentPage === page ? 'secondary' : 'primary'}
              title={`Go to Page ${page}`}
              isSquare
            >
              {page}
            </Button>
          {:else}
            <span>{page}</span>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .projects__title {
    font-family: var(--font-family-pixel);
    font-size: var(--font-size-heading-2);
    text-align: center;
  }

  .projects__container {
    max-width: 1200px;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    gap: 64px;
    padding: 32px 20px;
  }

  .projects__pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    list-style: none;
  }
</style>
