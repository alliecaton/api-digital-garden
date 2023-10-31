require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PW,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    underscored: false,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PW,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    underscored: false,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
}
