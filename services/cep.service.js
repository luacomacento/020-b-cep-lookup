const CustomError = require('../errors/CustomError');
const CepModel = require('../models/Cep');

const cepService = {
  getAddress: async (cep) => {
    const data = await CepModel.getByPk(cep);
    // Aqui foi retirado o length pois o data não é mais um array (ver comentário no CepModel.getByPk)
    if (!data) throw new CustomError(404, 'notFound', 'CEP não encontrado');
    return data;
  },

  create: async (address) => {
    await CepModel.create(address);
    return;
  }
};

module.exports = cepService;