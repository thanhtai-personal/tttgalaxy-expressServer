"use strict"

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

  return GroupSkill;
};

module.exports = {
  default: group_skill
};