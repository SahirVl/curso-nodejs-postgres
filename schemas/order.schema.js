const Joi = require('joi');

const id = Joi.number()
//const codigo = Joi.string()
const customerId = Joi.number()
const orderId = Joi.number().integer()
const productId = Joi.number().integer()
//const createAt = Joi.date();
const amount = Joi.number().integer().min(1)


const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

const addItemSchema = Joi.object({
orderId: orderId.required(),
productId: productId.required(),
amount: amount.required()
})

const getOrderSchema = Joi.object({
  id: id.required(),
});



module.exports = {createOrderSchema, getOrderSchema, addItemSchema}
