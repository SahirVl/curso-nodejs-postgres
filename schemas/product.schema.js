const Joi = require('joi');

const id = Joi.number()
const edad = Joi.number().max(150)
const historia = Joi.string().max(150)
const imagen = Joi.string()
const nombre = Joi.string()
const peso = Joi.number()
const id_pelicula_fk = Joi.number()

const createProductSchema = Joi.object({
  edad: edad.required(),
  historia: historia,
  imagen: imagen,
  nombre: nombre,
  peso: peso.required(),
  id_pelicula_fk: id_pelicula_fk.required()
});

const updateProductSchema = Joi.object({
  edad: edad,
  historia: historia,
  imagen: imagen,
  peso: peso,
  id_pelicula_fk: id_pelicula_fk
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
