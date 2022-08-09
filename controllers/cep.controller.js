const cepService = require('../services/cep.service');

const cepController = {
  getAddress: async (req, res) => {
    const { cep } = req.params;
    // Aqui foi necessário formatar o CEP também para pesquisá-lo sem o hífen, pois ele não está com hífen no banco de dados.
    const formatedCep = cep.split('-').join('');
    const address = await cepService.getAddress(formatedCep);

    res.status(200).json(address);
  },

  create: async(req, res) => {
    const { cep, logradouro, bairro, localidade, uf } = req.body;
    const formatedCep = cep.split('-').join('');
    const address = {cep: formatedCep, logradouro, bairro, localidade, uf};
    await cepService.create(address);

    res.status(201).json(address);
  }
};

module.exports = cepController;