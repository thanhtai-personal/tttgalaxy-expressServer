"use strict"
const  _  = require('lodash')
const uuidv1 = require('uuid/v1')

const user_skill = (sequelize, DataTypes) => {
  const UserSkill = sequelize.define('user_skill', {
    id: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      unique: true
    },
    skillId: {
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
    progress: {
      type: DataTypes.INTEGER
    }
  }, {
    freezeTableName: true
  });

  UserSkill.findSkillIdsByUserId = async (userId) => {
    try {
      let ids = await UserSkill.findAll({
        attributes: ['skillId'],
        where: {
          userId: userId
        },
        raw: true,
      })
      let listSkillIds = ids.map(idObj => idObj.skillId)
      return listSkillIds
    } catch (error) {
      console.log('error findSkillIdsByUserId', error)
      return []
    }
  }

  UserSkill.findByUserId = async (userId) => {
    try {
      let rs =  await UserSkill.findAll({
        where: {
          userId: userId
        }
      })
      return rs
    } catch (error) {
      return []
    }
  }

  UserSkill.createOrUpdate = async (data) => {
    try {
      let obj = await UserSkill.findOne({ where: { userId: data.userId, skillId: data.skillId } })
      if (obj) { // update
        return await obj.update(data);
      }
      else { // insert
        return await UserSkill.create({ id: uuidv1(), ...data });
      }
    } catch (error) {
      return error
    }
  }

  UserSkill.createOrUpdateFromList = async (dataList) => {
    try {
      if (_.isArray(dataList) && !_.isEmpty(dataList)) Promise.all(dataList.map(data => UserSkill.createOrUpdate(data)))
    } catch (error) {
      console.log('error', error)
    }
    
  }


  return UserSkill;
};

module.exports = {
  default: user_skill
};