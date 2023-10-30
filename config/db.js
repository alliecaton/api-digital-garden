require('dotenv').config()

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
  'blog',
  process.env.DEV_DB_USER,
  process.env.DEV_DB_PW,
  {
    host: 'localhost',
    dialect: 'postgres',
  }
)

module.exports = sequelize
