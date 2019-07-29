"use strict"
const  _  = require('lodash')
const uuidv1 = require('uuid/v1')

const user_experience = (sequelize, DataTypes) => {
  const UserExperience = sequelize.define('user_experience', {
    id: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      unique: true
    },
    experienceId: {
      type: DataTypes.UUID,
      unique: true
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
    isDelete: {
      type: DataTypes.BOOLEAN
    },
    description: {
      type: DataTypes.STRING
    },
    duringTime: {
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true
  });
  
  UserExperience.findExperienceIdsByUserId = async (userId) => {
    try {
      let ids = await UserExperience.findAll({
        attributes: ['experienceId'],
        where: {
          userId: userId
        },
        raw: true
      })
      return ids.map(idObj => idObj.experienceId)
    } catch (error) {
      console.log('error', error)
      return []
    }
  }

  UserExperience.findByUserId = async (userId) => {
    try {
      console.log("try findByUserId")
      let ids = await UserExperience.findAll({
        where: {
          userId: userId
        }
      })
      return ids
    } catch (error) {
      console.log('error', error)
      return []
    }
  }

  UserExperience.createOrUpdate = async (data) => {
    try {
      let obj = await UserExperience.findOne({ where: { userId: data.userId, experienceId: data.experienceId } })
      if (obj) { // update
        return await obj.update(data);
      }
      else { // insert
        return await UserExperience.create({ id: uuidv1(), ...data });
      }
    } catch (error) {
      return error
    }
  }

  UserExperience.createOrUpdateFromList = async (dataList) => {
    if (_.isArray(dataList) && !_.isEmpty(dataList)) Promise.all(dataList.map(data => UserExperience.createOrUpdate(data)))
  }


  return UserExperience;
};

module.exports = {
  default: user_experience
};