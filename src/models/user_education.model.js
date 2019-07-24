"use strict"

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
  });

  UserEducation.findIdsByUserId = async (userId) => {
    try {
      let ids = await UserEducation.find({
        where: {
          userId: userId
        }
      })
      return ids
    } catch (error) {
      return []
    }
  }

  return UserEducation;
};


module.exports = {
  default: user_education
};