"use strict"
const  _  = require('lodash')


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
  
  Skill.findByIds = async (ids) => {
    try {
      return await Skill.findAll({
        where: { id: {in: ids} }
      })
    } catch (error) {
      return []
    }
  }

  Skill.createOrUpdate = async (data) => {
    try {
      let obj = await Skill.findOne({ where: { id: data.id } })
      if (obj) { // update
        return await obj.update(data);
      }
      else { // insert
        return await Skill.create({ id: uuidv1(), ...data });
      }
    } catch (error) {
      return error
    }
  }

  Skill.createOrUpdateFromList = async (dataList) => {
    if (_.isArray(dataList) && !_.isEmpty(dataList)) Promise.all(dataList.map(data => Skill.createOrUpdate(data)))
  }

  return Skill;
};

module.exports = {
  default: skill
};