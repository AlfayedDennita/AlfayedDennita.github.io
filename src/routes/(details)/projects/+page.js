import db from '$lib/db';

export async function load({ fetch }) {
  const projects = await db.projects.getAll(fetch);

  return { projects };
}
