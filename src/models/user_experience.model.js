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
  
  UserExperience.findIdsByUserId = async (userId) => {
    try {
      let ids = await UserExperience.find({
        where: {
          userId: userId
        }
      })
      return ids
    } catch (error) {
      return []
    }
  }

  return UserExperience;
};

module.exports = {
  default: user_experience
};