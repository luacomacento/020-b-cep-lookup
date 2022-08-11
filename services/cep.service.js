const { default: axios } = require('axios');
const AlreadyExistsError = require('../errors/AlreadyExistsError');
const NotCreatedError = require('../errors/NotCreatedError');
const NotFoundError = require('../errors/NotFoundError');
const CepModel = require('../models/Cep');

const cepService = {
  getAddress: async (cep) => {
    const formatedCep = cep.split('-').join('');
    const result = await CepModel.getByPk(formatedCep);
    return result;
  },

  getExternalAddress: async (cep) => {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (data.erro === 'true') throw new NotFoundError('CEP não encontrado');
    const {complemento, ibge, gia, ddd, siafi, ...addressSimplified} = data;
    return addressSimplified;
  },

  getAll: async () => {
    const data = await CepModel.getAll();
    return data;
  },
 
  create: async (address) => {
    const formatedCep = address.cep.split('-').join('');
    const formatAddress = {...address, cep: formatedCep};

    const data = await CepModel.getByPk(formatedCep);
    if (data) throw new AlreadyExistsError('CEP já existente');
    const success = await CepModel.create(formatAddress);
    if (!success) throw new NotCreatedError('Não foi possível criar o CEP');
    return;
  }
};

module.exports = cepService;