const { models, sequelize } = require('./../models');
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const userService = () => {
  let UserService = {
    secret: "tttgalaxy-secret-key"
  }
  UserService.login = async (data) => {
    let user = await models.User.findByLogin(data.email);
    if (user) {
      if (user.password === data.password) {
        let token = jwt.sign({
          email: user.email,
        }, UserService.secret, { expiresIn: 60 * 60 * 24 });
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

  UserService.getUserData = async (data) => {
    try {
      let user = await models.User.findByLogin(data.email)
      let skillIds = await models.UserSkill.findIdsByUserId(user.id)
      let skill = await models.Skill.findByIds(skillIds)
      let experienceIds = await models.UserExperience.findIdsByUserId(user.id)
      let experience = await models.Skill.findByIds(experienceIds)
      let educationIds = await models.UserEducation.findIdsByUserId(user.id)
      let education = await models.Skill.findByIds(educationIds)

      return {
        basicInfo: user,
        skill: skill,
        experiences: experience,
        education: education
      }

    } catch (error) {
      return {
        message: 'catch error!!',
        data: error
      }
    }
  }

  return UserService
}

module.exports = userService()