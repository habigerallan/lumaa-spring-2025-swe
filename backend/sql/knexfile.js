const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

module.exports = {
  development: {
    client: 'pg',
    connection: {
      connectionString: String(process.env.DATABASE_URL),
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    }
  }
};
