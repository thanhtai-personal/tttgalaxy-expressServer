"use strict"

const company_experience = (sequelize, DataTypes) => {
  const CompanyExperience = sequelize.define('company_experience', {
    id: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true
    },
    companyId: {
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

  return CompanyExperience;
};

module.exports = {
  default: company_experience
};