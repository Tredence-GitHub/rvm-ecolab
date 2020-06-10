'use strict'

const Sequelize = require('sequelize');
const op = Sequelize.Op;

const {dbConfig} = require('./config');


console.log("this is dbConfig -->>", dbConfig)
// console.log("this is azure connection string -->>", process.env.CUSTOMCONNSTR_AZURE_STORAGE)

// make connection object here
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions,
    define: {
        underscored: true,
        timestamps: false,
        hierarchy: true
    },
    pool: {
        max: 10,
        min: 5,
        acquire: 30000,
        idle: 60000
    }
});

console.log("sequelize connection object is created");

// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.op = op;
db.config = dbConfig;

//Models/tables
// db.recommendationPage = require('../models/RecommendationPage.js')(sequelize, Sequelize);

module.exports = db
