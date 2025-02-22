const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      connectionString: String(process.env.DATABASE_URL),
    },
    migrations: {
      directory: './sql/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './sql/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
    },
    migrations: {
      directory: './sql/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './sql/seeds'
    }
  }
};
