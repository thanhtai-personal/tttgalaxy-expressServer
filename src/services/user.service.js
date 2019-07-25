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

      const getSkill = async (userId) => {
        let skillIds = await models.UserSkill.findIdsByUserId(userId)
        let skill = await models.Skill.findByIds(skillIds)
        return skill
      }

      const getExperience = async (userId) => {
        let experienceIds = await models.UserExperience.findIdsByUserId(userId)
        let experience = await models.Skill.findByIds(experienceIds)
        return experience
      }
      
      const getEducation = async (userId) => {
        let educationIds = await models.UserEducation.findIdsByUserId(userId)
        let education = await models.Skill.findByIds(educationIds)
        return education
      }
            
      let dataRs = await Promise.all([getSkill(user.id), getExperience(user.id), getEducation(user.id)])

      return {
        basicInfo: user,
        skill: dataRs[0],
        experiences: dataRs[1],
        education: dataRs[2]
      }

    } catch (error) {
      return {
        message: 'catch error!!',
        data: error
      }
    }
  }

  UserService.updatePortfolioData = async (data) => {
    const updateUserBasicInfo = (data) => { await models.User.createOrUpdateUser(data) },
    updateSkillData = (dataList) => { await models.Skill.createOrUpdateFromList(dataList) },
    updateEducationData = (dataList) => { await models.Education.createOrUpdateFromList(dataList) },
    updateExperienceData = (dataList) => { await models.Experience.createOrUpdateFromList(dataList) },
    updateGroupData = (dataList) => { await models.Group.createOrUpdateFromList(dataList) },
    updateSchoolData = (dataList) => { await models.School.createOrUpdateFromList(dataList) },

    updateUserSkillData = (dataList) => { await models.UserSkill.createOrUpdateFromList(dataList) },
    updateUserEducationData = (dataList) => { await models.UserEducation.createOrUpdateFromList(dataList) },
    updateUserExperienceData = (dataList) => { await models.UserExperience.createOrUpdateFromList(dataList) },
    updateGroupSkillData = (dataList) => { await models.GroupSkill.createOrUpdateFromList(dataList) },
    updateEducationSchoolData = (dataList) => { await models.EducationSchool.createOrUpdateFromList(dataList) }

    try {
      let listUpdateObjectFuntion = [
        updateUserBasicInfo(data.basicInfo),
        updateSkillData(data.skill),
        updateEducationData(data.education),
        updateExperienceData(data.experience),
        updateGroupData(data.group),
        updateSchoolData(data.school)
      ]

      let listUpdateRelationFuntion = [
        updateUserSkillData(data.userSkill),
        updateUserEducationData(data.userEducation),
        updateUserExperienceData(data.userExperience),
        updateGroupSkillData(data.groupSkill),
        updateEducationSchoolData(data.educationSchool)
      ]

      await Promise.all(listUpdateObjectFuntion)
      await Promise.all(listUpdateRelationFuntion)

      return {
        message: "updated data",
        data: mappingData
      }
    } catch (error) {
      return {
        message: "update error",
        data: error
      }
    }
  }

  return UserService
}

module.exports = userService()