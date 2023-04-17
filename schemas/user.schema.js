const Joi = require('joi');

const id = Joi.number().integer();
const password = Joi.string().min(6).max(15);
const email = Joi.string().email();
// const name = Joi.string().min(3).max(15)
const role = Joi.string();
const createAt = Joi.date();

const createUserSchema = Joi.object({
  password: password.required(),
  email: email.required(),
  role: role.required(),
  createAt: createAt,
});

const updateUserSchema = Joi.object({
  password: password,
  email: email,
  role: role,
});

const getUserSchema = Joi.object({
  id: id,
  email: email,
  role: role,
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
