const CustomError = require("../errors/CustomError");

const validators = {
  validateCep: async (req, _res, next) => {
    const { cep } = req.params;
    const cepRegex = /^\d{5}-?\d{3}$/;
    if (!cepRegex.test(cep)) {
      throw new CustomError(400, 'invalidData', 'CEP inválido');
    }

    next();
  },
};

module.exports = validators;