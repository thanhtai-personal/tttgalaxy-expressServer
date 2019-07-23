"use strict"

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

  return UserSkill;
};

module.exports = {
  default: user_skill
};