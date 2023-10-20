const env = require("dotenv").config({ path: `.env.development` });
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PG_USERNAME,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
});

module.exports = { pool };
