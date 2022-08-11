const NotFoundError = require('../errors/NotFoundError');
const InvalidError = require('../errors/InvalidError');
const Joi = require('joi');

const validators = {
  validateCep: async (req, res, next) => {
    const { cep } = req.params;
    const cepRegex = /^\d{5}-?\d{3}$/;
    if (!cepRegex.test(cep)) {
      throw new NotFoundError('Cep inválido');
      // throw new CustomError(400, 'invalidData', 'CEP inválido');
    }

    next();
  },

  validateBody: async (req, res, next) => {
    const schema = Joi.object({
      cep: Joi.string().pattern(/^\d{5}-?\d{3}$/).required(),
      logradouro: Joi.string().required(),
      bairro: Joi.string().required(),
      localidade: Joi.string().required(),
      uf: Joi.string().length(2).case('upper').required(),
    });

    const {error, value} = schema.validate(req.body);
  
    if (error) {
      throw new InvalidError(error.details[0].message);
      // throw new CustomError(400, 'invalidData', error.details[0].message)
    }

    next();
  }
};

module.exports = validators;