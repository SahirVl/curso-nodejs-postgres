const { config } = require('../config/config')

{
  "development": {
    "username": config.dbUser,
    "password": config.dbPassword,
    "database": "disney",
    "host": config.dbHost,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
