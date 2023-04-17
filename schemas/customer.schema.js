const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(1).max(15);
const lastName = Joi.string().min(1).max(15);
const phone = Joi.string();
const createAt = Joi.date();
const userId = Joi.number().integer();

const createCustSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  createAt: createAt,
  userId: userId.required(),
});

const updateCustSchema = Joi.object({
  name,
  lastName,
  phone,
  userId,
});

const getCustSchema = Joi.object({
  id: id.required(),
  phone,
});

module.exports = { createCustSchema, updateCustSchema, getCustSchema };
