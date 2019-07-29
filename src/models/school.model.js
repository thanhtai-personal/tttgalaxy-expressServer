"use strict"
const  _  = require('lodash')
const uuidv1 = require('uuid/v1')

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
    description: {
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

  School.findByIds = async (ids) => {
    try {
      return await School.findAll({
        where: { id: ids, isDelete: false }
      })
    } catch (error) {
      return []
    }
  }

  School.createOrUpdate = async (data) => {
    try {
      let obj = await School.findOne({ where: { id: data.id, isDelete: false } })
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
    try {
      if (_.isArray(dataList) && !_.isEmpty(dataList)) Promise.all(dataList.map(data => School.createOrUpdate(data)))
    } catch (error) {
      console.log('error', error)
    }
  }


  return School;
};

module.exports = {
  default: school
};