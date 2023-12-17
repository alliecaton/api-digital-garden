import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DEV_DB_USER,
  process.env.DEV_DB_PW,
  {
    host: process.env.HOST,
    dialect: 'postgres',
  }
)

export default sequelize
