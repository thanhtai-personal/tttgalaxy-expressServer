const { models, sequelize } = require('../models');
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const portfolioService = () => {
  let PortfolioService = {
    secret: "tttgalaxy-secret-key"
  }
  PortfolioService.login = async (data) => {
    let user = await models.User.findByEmail(data.email);
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

  PortfolioService.getPortfolioData = async (data) => {
    //need to use join db
    try {
      let user = await models.User.findByEmail(data.email)
      user.password = null
      const getSkill = async (userId) => {
        let skillIds = await models.UserSkill.findSkillIdsByUserId(userId)
        let userSkill = await models.UserSkill.findByUserId(userId)
        let skill = await models.Skill.findByIds(skillIds)
        let groupIds = await models.GroupSkill.findGroupIdsBySkillIds(skillIds)
        let group = await models.Group.findByIds(groupIds)
        return { skill, group, userSkill }
      }

      const getExperience = async (userId) => {
        let experienceIds = await models.UserExperience.findExperienceIdsByUserId(userId)
        let userExperience = await models.UserExperience.findByUserId(userId)
        let experience = await models.Skill.findByIds(experienceIds)
        return { experience, userExperience }
      }

      const getEducation = async (userId) => {
        let educationIds = await models.UserEducation.findEducationIdsByUserId(userId)
        let userEducation = await models.UserEducation.findByUserId(userId)
        let education = await models.Skill.findByIds(educationIds)
        let schoolIds = await models.EducationSchool.findSchoolIdsByEducationIds(educationIds)
        let school = await models.School.findByIds(schoolIds)
        return { education, school, userEducation }
      }

      let dataRs = await Promise.all([getSkill(user.id), getExperience(user.id), getEducation(user.id)])

      return {
        basicInfo: user,
        skill: dataRs[0].skill,
        group: dataRs[0].group,
        userSkill: dataRs[0].userSkill,
        experiences: dataRs[1].experience,
        userExperience: dataRs[1].userExperience,
        education: dataRs[2].education,
        school: dataRs[2].school,
        userEducation: dataRs[2].userEducation
      }

    } catch (error) {
      return {
        message: 'catch error!!',
        data: error
      }
    }
  }

  PortfolioService.updatePortfolioData = async (data) => {
    const updateUserBasicInfo = async (data) => {  await models.User.createOrUpdateUser(data) },
      updateSkillData = async (dataList) => { await models.Skill.createOrUpdateFromList(dataList) },
      updateEducationData = async (dataList) => { await models.Education.createOrUpdateFromList(dataList) },
      updateExperienceData = async (dataList) => { await models.Experience.createOrUpdateFromList(dataList) },
      updateGroupData = async (dataList) => { await models.Group.createOrUpdateFromList(dataList) },
      updateSchoolData = async (dataList) => { await models.School.createOrUpdateFromList(dataList) },

      updateUserSkillData = async (dataList) => { await models.UserSkill.createOrUpdateFromList(dataList) },
      updateUserEducationData = async (dataList) => { await models.UserEducation.createOrUpdateFromList(dataList) },
      updateUserExperienceData = async (dataList) => { await models.UserExperience.createOrUpdateFromList(dataList) },
      updateGroupSkillData = async (dataList) => { await models.GroupSkill.createOrUpdateFromList(dataList) },
      updateEducationSchoolData = async (dataList) => { await models.EducationSchool.createOrUpdateFromList(dataList) }

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
        data: {}
      }
    } catch (error) {
      return {
        message: "update error",
        data: error
      }
    }
  }

  return PortfolioService
}

module.exports = portfolioService()