const { createPool } = require('mysql2');
const { config } = require('./../config/config')
const {promisify} =require('util')

const pool = createPool({
  host     : process.env.DB_HOST,
  port     : process.env.DB_PORT,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
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
