"use strict"

const Sequelize = require('sequelize');

let dbConfig = {
  DATABASE:'tttgalaxy',
  DATABASE_USER:'postgres',
  DATABASE_PASSWORD:'abcd1234',
}

if (process.env.NODE_ENV === "production") {
  dbConfig = {
    DATABASE:'tttgalaxy',
    DATABASE_USER:'postgres',
    DATABASE_PASSWORD:'abcd1234',
  }
}

const sequelize = new Sequelize(
  process.env.DATABASE || dbConfig.DATABASE,
  process.env.DATABASE_USER || dbConfig.DATABASE_USER,
  process.env.DATABASE_PASSWORD || dbConfig.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
  User: sequelize.import('./user.model')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports = {
  models,
  sequelize
};