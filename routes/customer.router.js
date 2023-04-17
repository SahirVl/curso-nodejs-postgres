const express = require('express');

const CustomerService = require('./../services/customer.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getCustSchema, createCustSchema, updateCustSchema } = require('./../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

router.get('/', async (req, res, next) => {
  try {
    const customer = await service.find();
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
});

router.get('/search',
  validatorHandler(getCustSchema, 'query'),
  async (req, res, next) => {
    try {
      const { id } = req.query;
      const customer = await service.findOne(id);
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createCustSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCust = await service.create(body);
      res.status(201).json(newCust);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/updt',
  validatorHandler(getCustSchema, 'query'),
  validatorHandler(updateCustSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.query;
      const body = req.body;
      const updtCust = await service.update(id,body);
      res.status(201).json({message: 'Updated',updtCust});
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/del',
validatorHandler(getCustSchema, 'query'),
async (req, res, next) => {
  try {
    const { id } = req.query;
    const customer = await service.findOne(id)
    if (id) {
      await service.delete(id);
      res.status(201).json({message: 'deleted', customer});
    }

  } catch (error) {
    next(error);
  }
}
);

module.exports = router;

