const { Router } = require('express');
const { validateCep, validateBody } = require('../middlewares/cep.validators');
const cepController = require('../controllers/cep.controller');
const route = Router();

route.get('/:cep', validateCep, cepController.getAddress);
route.get('/', cepController.getAll);
route.post('/', validateBody, cepController.create);

module.exports = route;