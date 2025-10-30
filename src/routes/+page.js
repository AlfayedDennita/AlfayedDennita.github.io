import { getProjects } from '$lib/data/projects.js';
import { getArts } from '$lib/data/arts.js';

export async function load({ fetch }) {
  const projects = await getProjects(fetch);
  const arts = await getArts(fetch, true);

  return { projects, arts };
}
