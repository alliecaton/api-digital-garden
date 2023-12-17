// 'use strict'
// import { Model, Sequelize, DataTypes } from 'sequelize'

// const Post = (sequelize, DataTypes) => {
//   class Post extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Post.init(
//     {
//       title: DataTypes.STRING,
//       content: DataTypes.TEXT,
//       slug: DataTypes.STRING,
//       createdAt: {
//         type: DataTypes.DATE,
//         allowNull: false,
//       },
//       updatedAt: {
//         type: DataTypes.DATE,
//         allowNull: false,
//       },
//     },
//     {
//       sequelize,
//       freezeTableName: true,
//       modelName: 'Post',
//       tableName: 'Posts',
//     }
//   )

//   // return Post
// }

// export default Post

import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const Post = sequelize.define(
  'Post',
  {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    slug: DataTypes.STRING,
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
    freezeTableName: true,
    modelName: 'Post',
    tableName: 'Posts',
  }
)

export default Post
