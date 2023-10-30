require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PW,
    database: 'blog',
    host: 'localhost',
    underscored: false,
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
}
