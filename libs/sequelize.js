const { Sequelize } = require('sequelize');
const { config } = require('../config/config');

const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  {
    host: config.dbHost,
    port: config.dbPort,
    dialect: 'mysql',
    logging: function (str) {
      console.log(str);
    },
  }
);

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

/*async ()=>{
    const [data] = await sequelize.query('SELECT * FROM genero');
    console.log(data);
  }*/

module.exports = sequelize;
