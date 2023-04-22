const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const image = Joi.string();

const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.required()
});

const updateCategorySchema = Joi.object({
  name,
  image
});

const getCategorySchema = Joi.object({
  id,
  name
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema }
