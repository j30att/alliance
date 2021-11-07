const process = require('process');

const database = process.env.MYSQL_DATABASE || "alliance_db";
const username = process.env.MYSQL_USER || "alliance_db_user";
const password = process.env.MYSQL_PASSWORD || "alliance_db_password";
const host = process.env.MYSQL_HOST || "mysql-alliance-db";

module.exports = {
    "type": "mysql",
    host,
    "port": 3306,
    username,
    password,
    database,
    "synchronize": true,
    "dropSchema": false,
    "logging": true,
    "entities": [__dirname + "/src/**/*.entity.ts", __dirname + "/dist/**/*.entity.js"],
    "migrations": ["migrations/**/*.ts"],
    "subscribers": ["subscriber/**/*.ts", "dist/subscriber/**/.js"],
    "cli": {
        "entitiesDir": "src",
        "migrationsDir": "migrations",
        "subscribersDir": "subscriber"
    }
}
