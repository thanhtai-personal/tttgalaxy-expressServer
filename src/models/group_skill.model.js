"use strict"

const  _  = require('lodash')

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
  });

  GroupSkill.findGroupIdsBySkillIds = async (skillIds) => {
    try {
      let ids = await GroupSkill.findAll({
        //select: 'groupId',
        where: { skillId: { in: skillIds } }
      })
      return ids
    } catch (error) {
      return []
    }
  }
  
  GroupSkill.createOrUpdate = async (data) => {
    try {
      let obj = await GroupSkill.findOne({ where: { id: data.id } })
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