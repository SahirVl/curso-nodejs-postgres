const Joi = require('joi');

const id = Joi.number()
const codigo = Joi.string()
const customerId = Joi.number()
const createAt = Joi.date();


const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

const getOrderSchema = Joi.object({
  id: id.required(),
});



module.exports = {createOrderSchema, getOrderSchema}
