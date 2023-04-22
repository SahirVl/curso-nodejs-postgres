const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
  }

async create(data) {
  const newProduct = await models.Product.create(data)
  return newProduct;
}


}
module.exports = ProductsService;




// AQUI ABAJO UN EJEMPLO DE QUERY SQL
/*const boom = require('@hapi/boom');
const pool = require('../libs/mysql.pool');

class ProductsService {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async create(product) {
    // aqui creamos la consulta sql y luego le pasamos a result la consulta
    // y el parametro (...spread)product y la foreingkey
    const sql = 'INSERT INTO personaje SET ?';
    const result = await this.pool.query(sql, {
      ...product,
      id_pelicula_fk: product.id_pelicula_fk,
    });
    // aqui se retorna el resultado con operador ternario en caso de ser true o false
    return result && result.affectedRows
      ? {
          message: 'created',
          product: { ...product, id: result.insertId },
        }
      : null;
  }

  async find() {
    const rta = await this.pool.query('SELECT * FROM personaje');
    return rta;
  }

  async findOne(id) {
    const sql = 'SELECT * FROM personaje WHERE id = ?';
    const product = await this.pool.query(sql, [id]);
    if (product == false) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async update(changes, id) {
    const query = 'UPDATE personaje SET ? WHERE id = ?';
    const result = await this.pool.query(query, [changes, id]);

    if (!result.affectedRows) {
      throw boom.notFound('product not found');
    }
    return changes;
  }

  async delete(id) {
    const sql = 'DELETE FROM personaje WHERE id = ?';
    const result = await this.pool.query(sql, [id]);

    if (!result) {
      throw boom.notFound(`id product # ${id} not found`);
    }
    return id;
  }
}

module.exports = ProductsService; */
