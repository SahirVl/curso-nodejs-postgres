const boom = require('@hapi/boom');
const pool = require('../libs/mysql.pool');

class ProductsService {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async create(product) {
    const newProduct = {
      edad: product.edad,
      historia: product.historia,
      imagen: product.imagen,
      nombre: product.nombre,
      peso: product.peso,
      id_pelicula_fk: product.id_pelicula_fk,
    };
    console.log(newProduct)
    const sql = 'INSERT INTO personaje SET ?'
    const rta = await this.pool.query(sql, newProduct)
    return  {message: 'created', newProduct , rta}
  }

  async find() {
    const rta = await this.pool.query('SELECT * FROM personaje');
    return rta;
  }

  async findOne(id) {
    const sql = 'SELECT * FROM personaje WHERE id = ?'
    const product = await this.pool.query(sql,[id]);
    if (product == false) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
