"use strict"
const  _  = require('lodash')
const uuidv1 = require('uuid/v1')

const group = (sequelize, DataTypes) => {
  const Group = sequelize.define('group', {
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

  Group.findByIds = async (ids) => {
    try {
      return await Group.findAll({
        where: { id: ids, isDelete: false },
        raw: true
      })
    } catch (error) {
      console.log('error', error)
      return []
    }
  }

  Group.createOrUpdate = async (data) => {
    try {
      let obj = await Group.findOne({ where: { id: data.id, isDelete: false } })
      if (obj) { // update
        return await obj.update(data);
      }
      else { // insert
        return await Group.create({ id: uuidv1(), ...data });
      }
    } catch (error) {
      return error
    }
  }

  Group.createOrUpdateFromList = async (dataList) => {
    try {
      if (_.isArray(dataList) && !_.isEmpty(dataList)) Promise.all(dataList.map(data => Group.createOrUpdate(data)))
    } catch (error) {
      console.log('error', error)
    }
  }


  return Group;
};

module.exports = {
  default: group
};