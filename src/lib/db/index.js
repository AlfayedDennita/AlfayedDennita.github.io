import { getProjects, getProject } from './projects';
import { getArts } from './arts';
import { sendContact } from './contact';

const db = {};

db.projects = { getAll: getProjects, getOne: getProject };
db.arts = { getAll: getArts };
db.contact = { insertOne: sendContact };

export default db;
