import { getProjects } from '$lib/data/projects';

export async function load({ fetch }) {
  const projects = await getProjects(fetch);

  return { projects };
}
