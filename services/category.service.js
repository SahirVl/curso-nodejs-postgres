const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
// const { Op } = require('sequelize');

class CategoryService {
  constructor() {}

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const rta = await models.Category.findAll();
    if (!rta || rta == false) {
      return { message: 'no se hallaron datos' };
    }
    return rta;
  }

  async findOne(categ) {
    const category = await models.Category.findAll({
      where: {
        name: categ,
      },
      include: ['products'],
    });
    if (!category || category == false) {
      throw boom.notFound();
    }
    return category;
  }

  async update(id, changes) {
    const user = await models.Category.findByPk(id)
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = CategoryService;
