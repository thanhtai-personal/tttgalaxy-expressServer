"use strict"
const  _  = require('lodash')

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

  School.findByIds = async (ids) => {
    try {
      return await School.findAll({
        where: { id: {in: ids} }
      })
    } catch (error) {
      return []
    }
  }

  School.createOrUpdate = async (data) => {
    try {
      let obj = await School.findOne({ where: { id: data.id } })
      if (obj) { // update
        return await obj.update(data);
      }
      else { // insert
        return await School.create({ id: uuidv1(), ...data });
      }
    } catch (error) {
      return error
    }
  }

  School.createOrUpdateFromList = async (dataList) => {
    if (_.isArray(dataList) && !_.isEmpty(dataList)) Promise.all(dataList.map(data => School.createOrUpdate(data)))
  }


  return School;
};

module.exports = {
  default: school
};