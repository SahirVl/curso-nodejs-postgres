const Joi = require('joi');

const id = Joi.number()
const ref = Joi.string()
const name = Joi.string().max(20)
const image = Joi.string()
const description = Joi.string().max(40)
const price = Joi.number()
const categoryId = Joi.number()
const limit = Joi.number().integer()
const offset = Joi.number().integer()
const priceMin = Joi.number().integer()
const priceMax = Joi.number().integer()

const createProductSchema = Joi.object({
  name: name.required(),
  image: image.required(),
  description: description.required(),
  price: price.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  ref,
  name,
  image,
  description,
  price,
  categoryId
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  priceMin,
  priceMax: priceMax.when('priceMin',{
    is: Joi.number().integer(),
    then: Joi.required()
  })
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }
