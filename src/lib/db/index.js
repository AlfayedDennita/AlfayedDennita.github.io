import { getProjects, getProject } from './projects';
import { getArts } from './arts';

const db = {};

db.projects = { getAll: getProjects, getOne: getProject };
db.arts = { getAll: getArts };

export default db;
