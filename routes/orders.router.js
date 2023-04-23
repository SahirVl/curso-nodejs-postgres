const express = require('express');

const OrderService = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createOrderSchema, getOrderSchema } = require('./../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/search',
  validatorHandler(getOrderSchema, 'query'),
  async (req, res, next) => {
    try {
      const { id } = req.query;
      const order = await service.findOne(id);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
