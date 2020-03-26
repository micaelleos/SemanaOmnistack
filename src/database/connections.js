const knex = require('knex');
const options = require('../../knexfile');

const connection = knex(options.development);

module.exports = connection;