"use strict"

const school = (sequelize, DataTypes) => {
  const School = sequelize.define('schools', {
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

  return School;
};

module.exports = {
  default: school
};