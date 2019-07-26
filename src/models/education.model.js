"use strict"
const  _  = require('lodash')

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
    descriptions: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    from: {
      type: DataTypes.DATE
    },
    to: {
      type: DataTypes.DATE
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
    isDelete: {
      type: DataTypes.BOOLEAN
    },
    isPresent: {
      type: DataTypes.BOOLEAN
    }
  });

  Education.findByIds = async (ids) => {
    try {
      return await Education.findAll({
        where: { id: {in: ids} }
      })
    } catch (error) {
      return []
    }
  }

  Education.createOrUpdate = async (data) => {
    try {
      let obj = await Education.findOne({ where: { id: data.id } })
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
    if (_.isArray(dataList) && !_.isEmpty(dataList)) Promise.all(dataList.map(data => Education.createOrUpdate(data)))
  }


  return Education;
};

module.exports = {
  default: education
};