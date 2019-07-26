"use strict"
const  _  = require('lodash')

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
  });

  UserSkill.findSkillIdsByUserId = async (userId) => {
    try {
      let ids = await UserSkill.find({
        select: 'skillId',
        where: {
          userId: userId
        }
      })
      return ids
    } catch (error) {
      return []
    }
  }

  UserSkill.findByUserId = async (userId) => {
    try {
      let rs =  await UserSkill.find({
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
      let obj = await UserSkill.findOne({ where: { id: data.id } })
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
    if (_.isArray(dataList) && !_.isEmpty(dataList)) Promise.all(dataList.map(data => UserSkill.createOrUpdate(data)))
  }


  return UserSkill;
};

module.exports = {
  default: user_skill
};