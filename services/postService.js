const db = require('../config/db')
const models = require('../models')

const postService = {}

postService.getPosts = async () => {
  return models.Post.findAndCountAll({
    order: [['updatedAt', 'DESC']],
  })
}

module.exports = postService
