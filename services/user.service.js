const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const pool = require('../libs/mysql.pool');
const { Op } = require('sequelize');

class UserService {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  /*async create(data) {
    const sql = 'INSERT INTO usuario SET ?';
    const result = await this.pool.query(sql, [data]);
    // aqui se retorna el resultado con operador ternario en caso de ser true o false
    return result && result.affectedRows
      ? {
          message: 'created',
          newUser: { ...data, id: result.insertId },
        }
      : null;
  }*/
  async find() {
    const rta = await models.User.findAll({
      include: ['customer'],
    });
    if (!rta) {
      return { message: 'no se hallaron datos' };
    }
    return rta;
  }
  /*async find() {
    const rta = await this.pool.query('SELECT * FROM usuario');
    if (!rta) {
    return {message: 'no se hallaron datos'}
    }
    return rta;
  }*/
  async findOne(id, email) {
    const user = await models.User.findAll({
      where: {
        [Op.or]: [{ id: { [Op.like]: id } } , { email: { [Op.like]: email } }],
      },
    });
    if (!user || user == false) {
      throw boom.notFound();
    }
    return user;
  }
  /*async findOne(id, correo) {
    const sql = 'SELECT * FROM usuario WHERE id = ? OR correo = ?';
    const user = await this.pool.query(sql, [id, correo]);
    if (user == false) {
      throw boom.notFound('No se hallaron resultados');
    }
    return user;
  }*/

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }
  /*async update(changes, id) {
    const query = 'UPDATE usuario SET ? WHERE id = ?';
    const result = await this.pool.query(query, [changes, id]);
    if (!result.affectedRows) {
      throw boom.notFound(`id: ${id} not found`);
    }
    return changes;
  }*/
  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
  /*async delete(id) {
    const sql = 'DELETE FROM usuario WHERE id = ?';
    const result = await this.pool.query(sql, [id]);

    if (!result.affectedRows) {
      throw boom.notFound(`id product # ${id} not found`);
    }
    return id;
  }*/
}

module.exports = UserService;
