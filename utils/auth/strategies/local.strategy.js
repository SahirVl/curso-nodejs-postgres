const { unauthorized } = require('@hapi/boom');
const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const UserService = require('./../../../services/user.service');
const service = new UserService();

const localStrategy = new Strategy(async (email, password, done) => {
  try {
    const user = await service.findEmail(email);
    if (!user) {
      done(unauthorized('No se encontro el usuario'), false);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      done(unauthorized('Wrong user or password'), false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

module.exports = localStrategy;
