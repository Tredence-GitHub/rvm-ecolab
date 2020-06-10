const toBoolean = require('yn');

const dbConfig = {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
        options: {
            encrypt: toBoolean(process.env.DB_ENCRYPT),
            database: process.env.DB_NAME,
            requestTimeout: 30000
        }
    }
}


module.exports = {
    dbConfig : dbConfig
}
