const express = require('express');
const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require('./../schemas/product.schema');
const passport = require('passport');

const router = express.Router();
const service = new ProductsService();

router.get(
  '/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/search',
  validatorHandler(getProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const { id } = req.query;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/create',
  passport.authenticate('jwt',{session: false}),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/update',
  passport.authenticate('jwt',{session: false}),
  validatorHandler(getProductSchema, 'query'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.query;
      const body = req.body;
      const product = await service.update(id,body);
      res.json({ message: 'Updated', product });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/del',
  passport.authenticate('jwt',{session: false}),
  validatorHandler(getProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const { id } = req.query;
      const product = await service.findOne(id);
      if (id) {
        await service.delete(id);
        res.status(201).json({ message: 'deleted', product });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
