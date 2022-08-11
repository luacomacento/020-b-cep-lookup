const cepService = require('../services/cep.service');

const cepController = {
  getAddress: async (req, res) => {
    const { cep } = req.params;
    // Aqui foi necessário formatar o CEP também para pesquisá-lo sem o hífen, pois ele não está com hífen no banco de dados.
    const address = await cepService.getAddress(cep);
    if (!address) {
      const externalAddress = await cepService.getExternalAddress(cep);
      return res.status(200).json(externalAddress);
    }
    res.status(200).json(address);
  },

  getAll: async (req, res) => {
    const data = await cepService.getAll();
    res.status(200).json(data);
  },

  create: async(req, res) => {
    const { cep, logradouro, bairro, localidade, uf } = req.body;
    const address = {cep, logradouro, bairro, localidade, uf};
    await cepService.create(address);

    res.status(201).json(address);
  }
};

module.exports = cepController;