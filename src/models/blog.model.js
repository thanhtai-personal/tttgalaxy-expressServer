"use strict"
const moment = require('moment');

const uuidv1 = require('uuid/v1');

const blog = (sequelize, DataTypes) => {
  const Blog = sequelize.define('blog', {
    id: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true
    },
    authorId: {
      type: DataTypes.UUID,
      unique: true
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
    title: {
      type: DataTypes.STRING
    },
    isDelete: {
      type: DataTypes.BOOLEAN
    },
    htmlContent: {
      type: DataTypes.STRING
    },
  }, {
    freezeTableName: true
  });

  Blog.findById = async (id) => {
    let blog
    try {
      blog = await Blog.findOne({
        where: { id: id, isDelete: false },
      });
    } catch (error) {
      console.error('Blog.findOne error', error)
    }
    return blog;
  };

  Blog.findByAuthor = async (userId) => {
    let blogs = []
    try {
      blogs = await Blog.findAll({
        where: { authorId: userId, isDelete: false  },
      });
    } catch (error) {
      console.error('Blog.findAll error', error)
    }
    return blogs;
  };


  Blog.createOrUpdate = async (model) => {
    try {
      let blog
      try {
        blog = await Blog.findOne({ where: { id: model.id, isDelete: false } })
      } catch (error) {
        console.log('error', error)
      }
      if (blog) { // update
        try {
          await Blog.update({...model, updatedAt: moment.now()});
        } catch (error) {
          console.log('error', error)
        }
      }
      else { // insert
        let blog = { ...model, id: uuidv1(), isDelete: false, createdAt: moment.now(), updatedAt: moment.now() }
        try {
          let rs = await Blog.create(blog);
          // console.log('rs', rs)
          return blog
        } catch (error) {
          console.log('error create blog', error);
          return error
        }
        
      }
    } catch (error) {
      return error
    }
  }

  return Blog;
};

module.exports = {
  default: blog
};