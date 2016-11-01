const Promise = require('bluebird');

const config = {
  user: process.env.USER || 'postgres',
  database: process.env.DATABASE || 'jobqueue',
  password: process.env.DATABASEPW || '',
  host: process.env.DATABASEHOST || 'localhost',
  port: process.env.DATABASEPORT || 5432
};

/**
 * Asynchronous request
 */
const pgp = require('pg-promise')({
  promiseLib: Promise
});
const cn = 'postgres://Justin@localhost:5432/jobqueue';
const db = pgp(cn);

module.exports = db;
