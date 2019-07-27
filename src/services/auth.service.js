const { models, sequelize } = require('./../models');
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const authService = () => {
  let AuthService = {
    secret: "tttgalaxy-secret-key"
  }
  AuthService.login = async (data) => {
    let user = await models.User.findByEmail(data.email);
    if (user) {
      if (user.password === data.password) {
        let token = jwt.sign({
          email: user.email,
          id: user.id
        }, AuthService.secret, { expiresIn: 60 * 60 * 24 });
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

  AuthService.register = async (data) => {
    let user = await models.User.findByEmail(data.email)
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

  return AuthService
}

module.exports = authService()