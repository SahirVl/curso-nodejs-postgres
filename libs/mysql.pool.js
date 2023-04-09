const { createPool } = require('mysql2');
const { config } = require('./../config/config')
const {promisify} =require('util')

const pool = createPool({
  host     : encodeURIComponent(config.dbHost),
  port     : encodeURIComponent(config.dbPort),
  user     : encodeURIComponent(config.dbUser),
  password : encodeURIComponent(config.dbPassword),
  database : encodeURIComponent(config.dbName)
})

pool.query('SHOW tables', function(err, results) {
  if (err) {
    console.log(err);
    throw err;
  }

  console.log(results);
});

// para que acepte promesas como async/await
pool.query = promisify(pool.query)


module.exports = pool
