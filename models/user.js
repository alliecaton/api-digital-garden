'use strict'
import { Model } from 'sequelize'

export default function (sequelize, DataTypes) {
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
