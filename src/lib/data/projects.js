export async function getProjects(fetch) {
  try {
    const res = await fetch('/data/projects.json');
    const projects = await res.json();

    return projects;
  } catch (error) {
    return error;
  }
}
