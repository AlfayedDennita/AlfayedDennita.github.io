import { getProjects } from '$lib/data/projects.js';
import { getArts } from '$lib/data/arts.js';

export async function load({ fetch }) {
  return {
    projects: getProjects(fetch),
    arts: getArts(fetch, 6),
  };
}
