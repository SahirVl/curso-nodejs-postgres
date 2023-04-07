const { Pool } = require('pg')

  const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'savg1989',
    port: 5432,
    database: 'mi_tienda'
  });



module.exports = pool
