const { createPool } = require('mysql2');
const {promisify} =require('util')

const pool = createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'savg1989',
  database: 'disney',
});

pool.query('SELECT * FROM genero', function(err, results) {
  if (err) {
    console.log(err);
    throw err;
  }

  console.log(results);
});

// para que acepte promesas como async/await
pool.query = promisify(pool.query)


module.exports = pool
