"use strict"

const education = (sequelize, DataTypes) => {
  const Education = sequelize.define('educations', {
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
    title: {
      type: DataTypes.STRING
    },
    from: {
      type: DataTypes.DATE
    },
    to: {
      type: DataTypes.DATE
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
    isPresent: {
      type: DataTypes.BOOLEAN
    }
  });

  Education.findByIds = async (ids) => {
    try {
      return await Education.findAll({
        where: { id: {in: ids} }
      })
    } catch (error) {
      return []
    }
  }

  return Education;
};

module.exports = {
  default: education
};