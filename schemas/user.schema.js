const Joi = require('joi');

const id = Joi.number().integer();
const contraseña = Joi.string().min(6);
const correo = Joi.string().email();
const nombre_usuario = Joi.string().min(3).max(15)

const createUserSchema = Joi.object({
  contraseña: contraseña.required(),
  correo: correo.required(),
  nombre_usuario: nombre_usuario.required()
});

const updateUserSchema = Joi.object({
  contraseña: contraseña,
  correo: correo,
  nombre_usuario: nombre_usuario
});

const getUserSchema = Joi.object({

  id: id,
  correo: correo
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
