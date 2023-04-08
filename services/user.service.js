// const boom = require('@hapi/boom');

class UserService {
  constructor() {}

  async create(data) {
    return data;
  }

  async find() {
    const client = await connectDB();
    const rta = await client.query('SELECT * FROM tasks');
    return rta.rows;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
