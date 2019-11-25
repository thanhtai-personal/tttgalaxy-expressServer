const { models } = require('../models');
const _ = require('lodash')

const blogService = () => {
  let blogService = {
    secret: "tttgalaxy-secret-key"
  }
  blogService.getBlogs = async (authorId) => {
    return await models.Blog.findByAuthor(authorId)
  }

  blogService.getBlog = async (id) => {
    return await models.Blog.findById(id)
  }

  blogService.createOrUpdateBlog = async (data) => {
    return await models.Blog.createOrUpdate(data)
  }

  return blogService
}

module.exports = blogService()