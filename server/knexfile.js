require("dotenv").config({ path: `.env.development` });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: "pg",
    connection: {
      // connectionString: config.DATABASE_URL,
      host: process.env.HOST,
      port: process.env.PORT,
      user: process.env.PG_USERNAME,
      database: process.env.DATABASE,
      // password: config["PASSWORD"],
      // ssl: config["DB_SSL"] ? { rejectUnauthorized: false } : false,
    }
  },




};
