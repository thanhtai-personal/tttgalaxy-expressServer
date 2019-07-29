"use strict"
const  _  = require('lodash')
const uuidv1 = require('uuid/v1')


const skill = (sequelize, DataTypes) => {
  const Skill = sequelize.define('skills', {
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
  
  Skill.findByIds = async (ids) => {
    try {
      let dataRs = await Skill.findAll({
        where: { id: ids, isDelete: false },
        raw: true
      })
      return dataRs
    } catch (error) {
      console.log('error', error)
      return []
    }
  }

  Skill.createOrUpdate = async (data) => {
    try {
      let obj = await Skill.findOne({ where: { id: data.id, isDelete: false } })
      if (obj) { // update
        return await obj.update(data);
      } else { // insert
        return await Skill.create({ id: uuidv1(), ...data });
      }
    } catch (error) {
      console.log('error', error)
      return error
    }
  }

  Skill.createOrUpdateFromList = async (dataList) => {
    try {
      if (_.isArray(dataList) && !_.isEmpty(dataList)) Promise.all(dataList.map(data => Skill.createOrUpdate(data)))
    } catch (error) {
      console.log('error', error)
    }
    
  }

  return Skill;
};

module.exports = {
  default: skill
};