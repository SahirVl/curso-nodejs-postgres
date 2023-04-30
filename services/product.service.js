const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');


class ProductsService {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  /*async find(query) {
    const options = {
      include: [
        {
          all: true,
          attributes: {
            exclude: ['image', 'createdAt', 'id'],
          },
        },
      ],

    }
    const {limit,offset} = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const products = await models.Product.findAll(options)
    if (!products || products == false) {
      return { message: 'no se hallaron datos' };
    }
    return products;
  }*/

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    };
    const { offset, limit } = query
    if (limit && offset) {
      options.offset = parseInt(offset) // esta opcion los traia en String, necesito es Int, por eso el parse
      options.limit = parseInt(limit) // en la conversion de String a Integer tenia el error
    }
    const {price} = query
    if (price) {
      options.where.price = price
    }
    const {priceMin, priceMax} = query
    if (priceMin && priceMax) {
      options.where.price = {
        [Op.gte]: priceMin,
        [Op.lte]: priceMax
      }
    }

    const products = await models.Product.findAll(options);
    if (!products || products == false) {
      throw boom.notFound('No se hallaron resultados')
    }
    return products;
  }



  async findOne(id) {
    const product = await models.Product.findByPk(id,{
      include: ['category'],
    });
    if (!product|| product == false) {
      throw boom.notFound();
    }
    return product;
  }
  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
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
