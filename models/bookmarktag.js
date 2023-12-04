'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class BookmarkTag extends Model {
    static associate(models) {
      BookmarkTag.belongsTo(models.Bookmark, { foreignKey: 'bookmarkId' })
      BookmarkTag.belongsTo(models.Tag, { foreignKey: 'tagId' })
    }
  }
  BookmarkTag.init(
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
      modelName: 'BookmarkTag',
      tableName: 'BookmarkTag',
    }
  )

  return BookmarkTag
}
