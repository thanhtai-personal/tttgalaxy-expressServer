"use strict"
const  _  = require('lodash')

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
    }
  });
  
  UserExperience.findExperienceIdsByUserId = async (userId) => {
    try {
      let ids = await UserExperience.find({
        select: 'experienceId',
        where: {
          userId: userId
        }
      })
      return ids
    } catch (error) {
      return []
    }
  }

  UserExperience.findByUserId = async (userId) => {
    try {
      return await UserExperience.find({
        where: {
          userId: userId
        }
      })
    } catch (error) {
      return []
    }
  }

  UserExperience.createOrUpdate = async (data) => {
    try {
      let obj = await UserExperience.findOne({ where: { id: data.id } })
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