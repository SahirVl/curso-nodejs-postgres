const express = require('express');

const UserService = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/user.schema');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/search',
  validatorHandler(getUserSchema, 'query'),
  async (req, res, next) => {
    try {
      const { id, correo } = req.query;
      const user = await service.findOne(id,correo);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/updt',
  validatorHandler(getUserSchema, 'query'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.query;
      const body = req.body;
      const updtUser = await service.update(id,body);
      res.status(201).json({message: 'Updated',updtUser});
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/del',
validatorHandler(getUserSchema, 'query'),
async (req, res, next) => {
  try {
    const { id } = req.query;
    const user = await service.findOne(id)
    if (id) {
      await service.delete(id);
      res.status(201).json({message: 'deleted', user});
    }

  } catch (error) {
    next(error);
  }
}
);

module.exports = router;

