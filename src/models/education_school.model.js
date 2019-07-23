"use strict"

const education_school = (sequelize, DataTypes) => {
  const EducationSchool = sequelize.define('education_school', {
    id: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true
    },
    schoolId: {
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

  return EducationSchool;
};

module.exports = {
  default: education_school
};