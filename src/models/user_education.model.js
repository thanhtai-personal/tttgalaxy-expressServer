"use strict"
const  _  = require('lodash')
const uuidv1 = require('uuid/v1')

const user_education = (sequelize, DataTypes) => {
  const UserEducation = sequelize.define('user_education', {
    id: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      unique: true
    },
    educationId: {
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
  }, {
    freezeTableName: true
  });

  UserEducation.findEducationIdsByUserId = async (userId) => {
    try {
      let ids = await UserEducation.findAll({
        attributes: ['educationId'],
        where: {
          userId: userId
        }
      })
      return ids.map(idObj => idObj.educationId)
    } catch (error) {
      return []
    }
  }

  
  UserEducation.findByUserId = async (userId) => {
    try {
      return await UserEducation.findAll({
        where: {
          userId: userId
        }
      })
    } catch (error) {
      return []
    }
  }

  UserEducation.createOrUpdate = async (data) => {
    try {
      let obj = await UserEducation.findOne({ where: { userId: data.userId, educationId: data.educationId } })
      if (obj) { // update
        return await obj.update(data);
      }
      else { // insert
        return await UserEducation.create({ id: uuidv1(), ...data });
      }
    } catch (error) {
      return error
    }
  }

  UserEducation.createOrUpdateFromList = async (dataList) => {
    if (_.isArray(dataList) && !_.isEmpty(dataList)) Promise.all(dataList.map(data => UserEducation.createOrUpdate(data)))
  }


  return UserEducation;
};


module.exports = {
  default: user_education
};