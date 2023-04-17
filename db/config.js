const { config } = require('../config/config')



module.exports = {
  "development": {
    "username": encodeURIComponent(config.dbUser),
    "password": encodeURIComponent(config.dbPassword),
    "database": encodeURIComponent(config.dbName),
    "host": encodeURIComponent(config.dbHost),
    "dialect": "mysql"
  },
  "test": {
    "username": encodeURIComponent(config.dbUser),
    "password": encodeURIComponent(config.dbPassword),
    "database": encodeURIComponent(config.dbName),
    "host": encodeURIComponent(config.dbHost),
    "dialect": "mysql"
  },
  "production": {
    "username": encodeURIComponent(config.dbUser),
    "password": encodeURIComponent(config.dbPassword),
    "database": encodeURIComponent(config.dbName),
    "host": encodeURIComponent(config.dbHost),
    "dialect": "mysql"
  }
}
