const express = require('express');
const ProductsService = require('../services/product.service')
const validatorHandler = require('../middlewares/validator.handler')
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService()

router.get('/', async(req, res, next) => {
  try {
    const products =  await service.find()
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/search',
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
  validatorHandler(getProductSchema, 'query'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.query;
      const product = await service.update(body,id);
      res.json({message: 'Updated', product});
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/del',
  validatorHandler(getProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const { id } = req.query;
      const product = await service.findOne(id)
      if (id) {
        await service.delete(id);
        res.status(201).json({message: 'deleted', product});
      }

    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
