'use strict'

// const fs = require('fs')
// const path = require('path')
// const Sequelize = require('sequelize')
// const process = require('process')
// const basename = path.basename(__filename)
// const env = process.env.NODE_ENV || 'development'
// const config = require(__dirname + '/../config/config.js')[env]
// const db = {}

// let sequelize
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config)
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   )
// }

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     )
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     )
//     db[model.name] = model
//   })

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db)
//   }
// })

// db.sequelize = sequelize
// db.Sequelize = Sequelize

// module.exports = db

import { readdirSync } from 'fs'
// import path  here
import path from 'path'
import { basename, dirname } from 'path'
import { Sequelize, DataTypes } from 'sequelize'
import { fileURLToPath } from 'url'
import sequelize from '../config/db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const db = {}
export default (async () => {
  const files = readdirSync(__dirname).filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename(__filename) &&
      file.slice(-3) === '.js'
  )

  for await (const file of files) {
    // use path here to access your models from models directory then await for it @
    const model = await import(path.resolve('models', `${file}`))
    if (model.default) {
      const namedModel = await model.default(sequelize, DataTypes)
      console.log('DATABASE', db, namedModel)
      db[namedModel.name] = namedModel
    }
  }

  Object.keys(db).forEach((modelName) => {
    if (modelName) {
      if (db[modelName].associate) {
        db[modelName].associate(db)
      }
    }
  })

  db.sequelize = sequelize
  db.Sequelize = Sequelize
  return db
})()
