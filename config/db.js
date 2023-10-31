require('dotenv').config()

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DEV_DB_USER,
  process.env.DEV_DB_PW,
  {
    host: process.env.HOST,
    dialect: 'postgres',
  }
)

module.exports = sequelize
