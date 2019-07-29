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
      let decodePassword = jwt.verify(user.password, AuthService.secret)
      console.log('decode pass', decodePassword)
      if (data.password === decodePassword) {
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
      data.password = jwt.sign(data.password, AuthService.secret)
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

  AuthService.getUserData = async (tokenData) => {
    try {
      let user = await models.User.findOne({
        attributes: ['email', 'id'],
        where: { email: tokenData.email, isDelete: false },
        raw: true
      });
      return user
    } catch (error) {
      console.log('error', error)
      return error
    }
  }

  return AuthService
}

module.exports = authService()