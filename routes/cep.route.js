const { Router } = require('express');
const { validateCep } = require('../middlewares/cep.validators');
const cepController = require('../controllers/cep.controller');
const route = Router();

route.get('/:cep', validateCep, cepController.getAddress);
route.post('/', cepController.create);

module.exports = route;