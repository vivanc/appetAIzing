const knex = require("knex");
const knexFile = require("./knexfile");

//removed process.env.NODE_ENV || 
const environment = "development";

module.exports = knex(knexFile[environment]);
