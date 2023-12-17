'use strict'
import { Model } from 'sequelize'

export default function (sequelize, DataTypes) {
  class PostTag extends Model {
    static associate(models) {
      PostTag.belongsTo(models.Post, { foreignKey: 'postId' })
      PostTag.belongsTo(models.Tag, { foreignKey: 'tagId' })
    }
  }
  PostTag.init(
    {
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: 'PostTag',
      tableName: 'PostTag',
    }
  )

  return PostTag
}
