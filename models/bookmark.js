'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    static associate(models) {
      this.belongsToMany(models.Tag, {
        as: 'tags',
        through: 'BookmarkTags',
        foreignKey: 'bookmarkId',
        otherKey: 'tagId',
      })
    }
  }
  Bookmark.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      url: DataTypes.STRING,
      description: DataTypes.TEXT,
      quote: DataTypes.TEXT,
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
      modelName: 'Bookmark',
      tableName: 'Bookmarks',
    }
  )

  return Bookmark
}
