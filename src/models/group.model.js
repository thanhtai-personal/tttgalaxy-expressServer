"use strict"

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

  Group.findByIds = async (ids) => {
    try {
      return await Group.findAll({
        where: { id: {in: ids} }
      })
    } catch (error) {
      return []
    }
  }

  return Group;
};

module.exports = {
  default: group
};