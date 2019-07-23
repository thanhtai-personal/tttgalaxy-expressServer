"use strict"

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

  return UserExperience;
};

module.exports = {
  default: user_experience
};