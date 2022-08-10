const { default: axios } = require('axios');
const CustomError = require('../errors/CustomError');
const CepModel = require('../models/Cep');

const cepService = {
  getAddress: async (cep) => {
    const result = await CepModel.getByPk(cep);
    if (!result) {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (data.erro === 'true') throw new CustomError(404, 'notFound', 'CEP não encontrado');
      const {complemento, ibge, gia, ddd, siafi, ...addressSimplified} = data;
      return addressSimplified;
    }
    return result;
  },

  create: async (address) => {
    const data = await CepModel.getByPk(address.cep);
    if (data) throw new CustomError(409, 'alreadyExists', 'CEP já existente');
    await CepModel.create(address);
    return;
  }
};

module.exports = cepService;