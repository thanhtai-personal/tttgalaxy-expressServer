"use strict"


const skill = (sequelize, DataTypes) => {
  const Skill = sequelize.define('skills', {
    id: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    descriptions: {
      type: DataTypes.STRING
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
  
  Skill.findByIds = async (ids) => {
    try {
      return await Skill.findAll({
        where: { id: {in: ids} }
      })
    } catch (error) {
      return []
    }
  }

  return Skill;
};

module.exports = {
  default: skill
};