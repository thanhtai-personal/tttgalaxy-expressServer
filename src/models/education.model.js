"use strict"
const  _  = require('lodash')
const uuidv1 = require('uuid/v1')

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
    title: {
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
  }, {
    freezeTableName: true
  });

  Education.findByIds = async (ids) => {
    try {
      return await Education.findAll({
        where: { 
          id: ids,
          isDelete: false
        },
        raw: true
      })
    } catch (error) {
      console.log('error', error)
      return []
    }
  }

  Education.createOrUpdate = async (data) => {
    try {
      let obj = await Education.findOne({ where: { id: data.id, isDelete: false } })
      if (obj) { // update
        return await obj.update(data);
      }
      else { // insert
        return await Education.create({ id: uuidv1(), ...data });
      }
    } catch (error) {
      return error
    }
  }

  Education.createOrUpdateFromList = async (dataList) => {
    try {
      if (_.isArray(dataList) && !_.isEmpty(dataList)) Promise.all(dataList.map(data => Education.createOrUpdate(data)))
    } catch (error) {
      console.log('error', error)
    }
  }


  return Education;
};

module.exports = {
  default: education
};