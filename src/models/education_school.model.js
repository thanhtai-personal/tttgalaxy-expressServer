"use strict"
const  _  = require('lodash')

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

  
  EducationSchool.findSchoolIdsByEducationIds = async (educationIds) => {
    try {
      return await GroupSkill.findAll({
        select: 'schoolId',
        where: { educationId: {in: educationIds} }
      })
    } catch (error) {
      return []
    }
  }

  EducationSchool.createOrUpdate = async (data) => {
    try {
      let obj = await EducationSchool.findOne({ where: { id: data.id } })
      if (obj) { // update
        return await obj.update(data);
      }
      else { // insert
        return await EducationSchool.create({ id: uuidv1(), ...data });
      }
    } catch (error) {
      return error
    }
  }

  EducationSchool.createOrUpdateFromList = async (dataList) => {
    if (_.isArray(dataList) && !_.isEmpty(dataList)) Promise.all(dataList.map(data => EducationSchool.createOrUpdate(data)))
  }


  return EducationSchool;
};

module.exports = {
  default: education_school
};