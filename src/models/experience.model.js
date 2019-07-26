"use strict"
const  _  = require('lodash')

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
    descriptions: {
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
  });

  Experience.createOrUpdate = async (data) => {
    try {
      let obj = await Experience.findOne({ where: { id: data.id } })
      if (obj) { // update
        return await obj.update(data);
      }
      else { // insert
        return await Experience.create({ id: uuidv1(), ...data });
      }
    } catch (error) {
      return error
    }
  }

  Experience.createOrUpdateFromList = async (dataList) => {
    if (_.isArray(dataList) && !_.isEmpty(dataList)) Promise.all(dataList.map(data => Experience.createOrUpdate(data)))
  }


  return Experience;
};

module.exports = {
  default: experience
};