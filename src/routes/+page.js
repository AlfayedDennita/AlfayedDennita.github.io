export async function load({ fetch }) {
  const resProjects = await fetch('/data/projects.json');
  const projects = await resProjects.json();

  return { projects };
}
