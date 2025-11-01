import { getProject } from '$lib/data/projects.js';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
  const project = await getProject(fetch, params.slug);

  if (!project) {
    error(404, 'Project Not Found');
  }

  return { project };
}
