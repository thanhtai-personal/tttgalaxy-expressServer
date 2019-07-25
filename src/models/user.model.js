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
    updatedAt: {
      type: DataTypes.DATE
    },
    firstName: {
      type: DataTypes.STRING(30)
    },
    lastName: {
      type: DataTypes.STRING(30)
    },
    comeFrom: {
      type: DataTypes.STRING
    },
    birthDay: {
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
  });

  User.findByEmail = async email => {
    let user
    try {
      user = await User.findOne({
        where: { email: email },
      });
    } catch (error) {
      console.error('User.findOne email error', error)
    }
    return user;
  };


  User.createOrUpdateUser = async model => {
    return User
      .findOne({ where: { email: model.email } })
      .then((obj) => {
        if (obj) { // update
          return obj.update({ email: model.email, password: model.password });
        }
        else { // insert
          return User.create({ id: uuidv1(), email: model.email, password: model.password });
        }
      })
      .catch((error) => {
        return error
      })
  };

  return User;
};

module.exports = {
  default: user
};