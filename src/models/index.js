"use strict"

const Sequelize = require('sequelize');

let dbConfig = {
  DATABASE:'tttgalaxy',
  DATABASE_USER:'postgres',
  DATABASE_PASSWORD:'abcd1234',
}

let sequelize = null

if (process.env.NODE_ENV === "production") {
  dbConfig = {
    DATABASE: process.env.DATABASE_URL || 'postgres://xwlmrkzbcrnoxp:bd2ca6cf649338bb6c9f2cc482c1d5902785825bc1733682c61107515ce6e072@ec2-50-19-231-222.compute-1.amazonaws.com:5432/d970hatls108fr',
  }
  sequelize = new Sequelize(process.env.DATABASE_URL || dbConfig.DATABASE, {
    dialect:  'postgres',
    protocol: 'postgres',
    port: 5432,
    host: 'ec2-50-19-231-222.compute-1.amazonaws.com',
    logging:  true, //false
  })
} else {
  sequelize = new Sequelize(
    process.env.DATABASE || dbConfig.DATABASE,
    process.env.DATABASE_USER || dbConfig.DATABASE_USER,
    process.env.DATABASE_PASSWORD || dbConfig.DATABASE_PASSWORD,
    {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
          ssl: process.env.NODE_ENV === "production"
      }
    },
  );
}

const models = {
  User: sequelize.import('./user.model'),
  Skill: sequelize.import('./skill.model'),
  School: sequelize.import('./school.model'),
  Group: sequelize.import('./group.model'),
  Experience: sequelize.import('./experience.model'),
  Education: sequelize.import('./education.model'),
  EducationSchool: sequelize.import('./education_school.model'),
  GroupSkill: sequelize.import('./group_skill.model'),
  UserEducation: sequelize.import('./user_education.model'),
  UserExperience: sequelize.import('./user_experience.model'),
  UserSkill: sequelize.import('./user_skill.model'),
  Blog: sequelize.import('./blog.model')
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