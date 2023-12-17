'use strict'
import { Model } from 'sequelize'

export default function (sequelize, DataTypes) {
  class Tag extends Model {
    static associate(models) {
      this.belongsToMany(models.Bookmark, {
        through: 'BookmarkTags',
        foreignKey: 'tagId',
        otherKey: 'bookmarkId',
      })
    }
  }
  Tag.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      emoji: DataTypes.STRING,
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
      modelName: 'Tag',
      tableName: 'Tags',
    }
  )

  return Tag
}
