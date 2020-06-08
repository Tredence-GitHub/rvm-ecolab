'use strict'

const Sequelize = require('sequelize');
const op = Sequelize.Op;
const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')[env];

// make connection object here
const sequelize = new Sequelize(config.database, config.username, config.password, config);

 
  
// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.op = op;
db.config = config;

//Models/tables
db.recommendationPage = require('../models/RecommendationPage.js')(sequelize, Sequelize);
db.savedFilters = require('../models/savedFilters.js')(sequelize, Sequelize);
db.viewTable = require('../models/viewTable.js')(sequelize, Sequelize)
db.categoryTable = require('../models/categoryTable.js')(sequelize, Sequelize)
db.projectTable = require('../models/projectTable.js')(sequelize, Sequelize)



db.categoryTable.hasMany( db.viewTable,
    {
        foreignKey:'categoryId',
        sourceKey:'categoryId',
        as:"viewTable",
        onDelete:"CASCADE"
    }
)

/*db.projectTable.hasMany( db.viewTable,
    {
        foreignKey:'projectId',
        sourceKey:'projectId',
        as:"viewTable"
    }
)
*/

db.projectTable.hasMany( db.categoryTable,

    {

       foreignKey:'projectId',
       sourceKey:'projectId',
       as:"categoryTable",
       onDelete:"CASCADE"

    }
)

/*db.viewTable.belongsTo( db.categoryTable,
  {
    foreignKey:'categoryId',
    targetKey:'categoryId',
    as:'categoryTable'
  }
)*/
//Relations
// db.markets.hasMany(db.subMarkets,{
//   as: "subMarketList",
//   foreignKey: {name:"marketId",allowNull:false},
//   sourceKey:"id",
//   onDelete: "CASCADE",
// });

module.exports = db
