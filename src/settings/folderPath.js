import { join } from 'path';

const APIS = join(`${__dirname}/../apis`);
const INTERFACES = join(`${__dirname}/../interfaces`);
const MODELS = join(`${__dirname}/../models`);
const SERVICES = join(`${__dirname}/../services`);
const LOG = join(`${__dirname}/../log`);
const DB = join(`${__dirname}/../database`);
const SEQUELIZE = join(`${__dirname}/../models`);
const UTILS = join(`${__dirname}/../utils`);

export default {
  APIS,
  INTERFACES,
  MODELS,
  SERVICES,
  LOG,
  DB,
  SEQUELIZE,
  UTILS,
};
