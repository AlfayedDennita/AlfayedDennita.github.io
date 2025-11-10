import { error } from '@sveltejs/kit';
import db from '$lib/db';

export async function load({ fetch, params }) {
  const project = await db.projects.getOne(fetch, params.slug);

  if (!project) {
    error(404, 'Project Not Found');
  }

  return { project };
}
