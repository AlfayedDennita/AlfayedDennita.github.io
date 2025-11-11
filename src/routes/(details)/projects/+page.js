import db from '$lib/db';

export async function load({ fetch }) {
  return { projects: db.projects.getAll(fetch) };
}
