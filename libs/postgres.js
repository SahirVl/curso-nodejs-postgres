/* const { Client } = require('pg')

async function connectDB() {
  const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'savg1989',
    port: 5432,
    database: 'my_store'
  })
  await client.connect()
  return client
} */

const { Client } = require('pg');

async function connectDB() {
const connectionString = 'postgres://postgres:savg1989@localhost:5432/mi_tienda';

const client = new Client({
  connectionString: connectionString,
});

await client.connect();
return client
}



module.exports = connectDB
