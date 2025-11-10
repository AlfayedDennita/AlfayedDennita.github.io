export async function getProjects(fetch) {
  const res = await fetch('/data/projects.json');
  const projects = await res.json();

  return projects;
}

export async function getProject(fetch, slug) {
  try {
    const res = await fetch('/data/projects.json');
    const projects = await res.json();

    const projectIdx = projects.findIndex((project) => project.slug === slug);

    const project = projectIdx >= 0 ? projects[projectIdx] : null;

    if (!project) {
      return project;
    }

    const prevProject =
      project && projectIdx > 0 ? projects[projectIdx - 1] : null;
    const nextProject =
      project && projectIdx < projects.length - 1
        ? projects[projectIdx + 1]
        : null;

    const prevProjectSummary = prevProject
      ? {
          slug: prevProject.slug,
          title: prevProject.title,
        }
      : null;
    const nextProjectSummary = nextProject
      ? {
          slug: nextProject.slug,
          title: nextProject.title,
        }
      : null;

    return {
      ...project,
      prevProject: prevProjectSummary,
      nextProject: nextProjectSummary,
    };
  } catch (error) {
    return error;
  }
}
