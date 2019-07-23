const secret = "tttgalaxy-secret-key"

const { models, sequelize } = require('./../models');
const jwt = require('jsonwebtoken')

const userService = () => {
  let UserService = {}
  UserService.login = async (data) => {
    let user = await models.User.findByLogin(data.email);
    if (user) {
      if (user.password === data.password) {
        let token = jwt.sign({
          email: user.email,
        }, secret, { expiresIn: 60 * 60 * 24 });
        return {
          message: 'Login success!',
          token: token
        }
      } else {
        return {
          message: 'wrong username or password!'
        }
      }
    } else {
      return {
        message: 'wrong username or password!'
      }
    }
  }

  UserService.addOrUpdate = async (data) => {
    let user = await models.User.findByLogin(data.email)
    if (!user) {
      let user = await models.User.createOrUpdateUser(data)
      return {
        message: 'created user',
        data: user
      }
    } else {
      return {
        message: 'user is existed'
      }
    }
  }

  return UserService
}

module.exports = userService()