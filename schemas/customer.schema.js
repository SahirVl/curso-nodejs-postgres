const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(1).max(15);
const lastName = Joi.string().min(1).max(15);
const phone = Joi.string();
const userId = Joi.number().integer();
const email = Joi.string().email()
const password = Joi.string().min(6).max(15)
const role = Joi.string()

const createCustSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  userId
  /*user: Joi.object({
    email: email.required(),
    password: password.required(),
    role
  })*/

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
