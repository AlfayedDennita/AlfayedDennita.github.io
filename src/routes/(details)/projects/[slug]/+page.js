import db from '$lib/db';

export async function load({ fetch, params }) {
  return { project: db.projects.getOne(fetch, params.slug) };
}
