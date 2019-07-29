"use strict"
const  _  = require('lodash')
const uuidv1 = require('uuid/v1')

const experience = (sequelize, DataTypes) => {
  const Experience = sequelize.define('experiences', {
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

  Experience.createOrUpdate = async (data) => {
    try {
      let obj = await Experience.findOne({ where: { id: data.id, isDelete: false }, raw: true })
      if (obj) { // update
        return await obj.update(data);
      }
      else { // insert
        return await Experience.create({ id: uuidv1(), ...data });
      }
    } catch (error) {
      console.log('error', error)
      return error
    }
  }

  Experience.createOrUpdateFromList = async (dataList) => {
    try {
      if (_.isArray(dataList) && !_.isEmpty(dataList)) Promise.all(dataList.map(data => Experience.createOrUpdate(data)))
    } catch (error) {
      console.log('error', error)
    }
  }

  Experience.findByIds = async (ids) => {
    try {
      let dataRs = await Experience.findAll({
        where: { id: ids, isDelete: false },
        raw: true
      })
      return dataRs
    } catch (error) {
      console.log('error', error)
      return []
    }
  }


  return Experience;
};

module.exports = {
  default: experience
};