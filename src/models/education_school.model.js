"use strict"
const  _  = require('lodash')
const uuidv1 = require('uuid/v1')

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
  }, {
    freezeTableName: true
  });

  
  EducationSchool.findByEducationIds = async (educationIds) => {
    try {
      if (_.isNil(educationIds) || _.isEmpty(educationIds)) return []
      let dataRs = await EducationSchool.findAll({
        where: {
          educationId: educationIds,
          isDelete: false
        },
        raw: true,
      })
      return dataRs
    } catch (error) {
      console.log('error findByEducationIds', error)
      return []
    }
  }

  EducationSchool.createOrUpdate = async (data) => {
    try {
      let obj = await EducationSchool.findOne({ 
        where: { 
          educationId: data.educationId,
          schoolId: data.schoolId,
          isDelete: false 
        } })
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