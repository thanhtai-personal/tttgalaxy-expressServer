"use strict"

const uuidv1 = require('uuid/v1');

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
    }
  });

  User.findByLogin = async login => {
    console.log('sequelize===', sequelize)
    let user
    try {
      user = await User.findOne({
        where: { id: login },
      });
    } catch (error) {
      console.error('User.findOne id error', error)
    }
    
    if (!user) {
      try {
        user = await User.findOne({
          where: { email: login },
        });
      } catch (error) {
        console.error('User.findOne email error', error)
      }
    }

    return user;
  };


  User.createUser = async model => {
    return User
        .findOne({ where: { email: model.email } })
        .then((obj) => {
            if(obj) { // update
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