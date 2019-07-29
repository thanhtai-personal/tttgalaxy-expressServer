"use strict"

const  _  = require('lodash')
const uuidv1 = require('uuid/v1')

const group_skill = (sequelize, DataTypes) => {
  const GroupSkill = sequelize.define('group_skill', {
    id: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true
    },
    skillId: {
      type: DataTypes.UUID,
      unique: true
    },
    groupId: {
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

  GroupSkill.findBySkillIds = async (skillIds) => {
    try {
      if (_.isNil(skillIds) || _.isEmpty(skillIds)) return []
      let dataRs = await GroupSkill.findAll({
        where: {
          skillId: skillIds, isDelete: false
        },
        raw: true,
      })
      return dataRs
    } catch (error) {
      console.log('error findBySkillIds', error)
      return []
    }
  }
  
  GroupSkill.createOrUpdate = async (data) => {
    try {
      let obj = await GroupSkill.findOne({ where: { groupId: data.groupId, skillId: data.skillId, isDelete: false } })
      if (obj) { // update
        return await obj.update(data);
      }
      else { // insert
        return await GroupSkill.create({ id: uuidv1(), ...data });
      }
    } catch (error) {
      return error
    }
  }

  GroupSkill.createOrUpdateFromList = async (dataList) => {
    if (_.isArray(dataList) && !_.isEmpty(dataList)) Promise.all(dataList.map(data => GroupSkill.createOrUpdate(data)))
  }


  return GroupSkill;
};

module.exports = {
  default: group_skill
};