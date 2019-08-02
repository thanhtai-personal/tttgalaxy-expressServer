"use strict"

const uuidv1 = require('uuid/v1');

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      unique: true
    },
    createdAt: {
      type: DataTypes.DATE
    },
    profileImageUrl: {
      type: DataTypes.STRING(30)
    },
    updatedAt: {
      type: DataTypes.DATE
    },
    name: {
      type: DataTypes.STRING(30)
    },
    comeFrom: {
      type: DataTypes.STRING
    },
    birthDate: {
      type: DataTypes.DATEONLY
    },
    age: {
      type: DataTypes.INTEGER
    },
    phone: {
      type: DataTypes.STRING(15)
    },
    isDelete: {
      type: DataTypes.BOOLEAN
    }
  }, {
    freezeTableName: true
  });

  User.findByEmail = async email => {
    let user
    try {
      user = await User.findOne({
        where: { email: email, isDelete: false },
      });
    } catch (error) {
      console.error('User.findOne email error', error)
    }
    return user;
  };


  User.createOrUpdateUser = async model => {
    try {
      let user = await User.findOne({ where: { email: model.email, isDelete: false } })
      if (user) { // update
        try {
          await user.update(model);
        } catch (error) {
          console.log('error', error)
        }
      }
      else { // insert
        await User.create({ id: uuidv1(), email: model.email, password: model.password });
        user = await User.findOne({ where: { email: model.email, isDelete: false } })
        return user
      }
    } catch (error) {
      return error
    }
  }

  return User;
};

module.exports = {
  default: user
};